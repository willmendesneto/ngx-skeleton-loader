import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  ViewContainerRef
} from '@angular/core';
import { NGX_SKELETON_LOADER_CONFIG, NgxSkeletonLoaderConfig, } from "../ngx-skeleton-loader-config.types";
import { NgxSkeletonLoaderComponent } from "../ngx-skeleton-loader.component";

@Directive({
  selector: '[ngxSkeletonShow], [ngxSkeletonStyle], [ngxSkeletonCount], [ngxSkeletonType], [ngxSkeletonUseParent]',
})
export class SkeletonLoaderDirective implements OnChanges {

  @Input() ngxSkeletonStyle: NgxSkeletonLoaderConfig['theme'] = { display: 'block' };
  @Input() ngxSkeletonCount: NgxSkeletonLoaderConfig['count'] = 1;
  @Input() ngxSkeletonType: NgxSkeletonLoaderConfig['appearance'] = 'line';
  @Input() ngxSkeletonShow: boolean = false;
  @Input() ngxSkeletonUseParent: boolean = false; // experimental
  defaultHeight = '25px';
  defaultWidth = '100%';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private vr: ViewContainerRef,
    private el: ElementRef,
    @Inject(NGX_SKELETON_LOADER_CONFIG) private config?: NgxSkeletonLoaderConfig
  ) {
  }

  ngOnChanges(): void {
    const nativeElement = this.el.nativeElement;
    let replaceElement = this.el.nativeElement;

    if (this.ngxSkeletonUseParent) {
      // This is an experimental feature -  remove this when it causes unexpected behavior
      replaceElement = this.el.nativeElement.parentElement;
    }

    const { height, width } = this.computeDimensions(replaceElement);

    if (this.ngxSkeletonShow) {

      let comp = this.vr.createComponent(NgxSkeletonLoaderComponent);

      nativeElement.style.display = 'none';

      comp.instance.theme = {
        // Maintain the same order for preserving Style precedence
        ...this.config?.theme,
        ...this.ngxSkeletonStyle,
        height,
        width,
      };
      comp.instance.count = this.ngxSkeletonCount;
      comp.instance.appearance = this.ngxSkeletonType;
    } else {
      this.vr.clear();
      nativeElement.style.display = '';
    }
  }

  private computeDimensions(replaceElement: any): {
    height: string;
    width: string;
  } {
    let height = this.ngxSkeletonStyle?.height
      ? this.ngxSkeletonStyle.height
      : replaceElement.offsetHeight - (replaceElement.offsetHeight * (10 / 100)) + 'px'; // reduce 10% height to prevent content jumping

    let width = this.ngxSkeletonStyle?.width
      ? this.ngxSkeletonStyle.width
      : replaceElement.offsetWidth + 'px';

    if (height === 0 || height === '0px') {
      height = this.defaultHeight;
    }
    if (width === 0 || width === '0px') {
      width = this.defaultWidth;
    }
    if (this.ngxSkeletonType === 'circle') {
      let minValue = Math.min(parseFloat(height), parseFloat(width));
      if (this.ngxSkeletonStyle?.height || this.ngxSkeletonStyle?.width) {
        const inputHW = Math.max(
          isNaN(parseFloat(this.ngxSkeletonStyle?.height)) ? 0 : parseFloat(this.ngxSkeletonStyle?.height),
          isNaN(parseFloat(this.ngxSkeletonStyle?.width)) ? 0 : parseFloat(this.ngxSkeletonStyle?.width));
        minValue = inputHW === 0 ? minValue : inputHW;
      }
      minValue = minValue - (minValue * (5 / 100)); // reduce 5% height to prevent content jumping
      // We removed the units in the beginning of the circle condition so adding it back.
      height = minValue + 'px';
      width = minValue + 'px';
    }
    return { height, width };
  }

}
