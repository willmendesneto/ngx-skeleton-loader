import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  ViewContainerRef
} from '@angular/core';
import {
  NGX_SKELETON_LOADER_CONFIG,
  NgxSkeletonLoaderConfig,
} from "../ngx-skeleton-loader-config.types";
import { NgxSkeletonLoaderComponent } from "../ngx-skeleton-loader.component";

@Directive({
  selector: '[skeletonShow], [skeletonStyle], [skeletonCount], [skeletonType], [skeletonUseParent]',
})
export class SkeletonLoaderDirective implements OnChanges {

  @Input() skeletonStyle: NgxSkeletonLoaderConfig['theme'] = { display: 'block'};
  @Input() skeletonCount: NgxSkeletonLoaderConfig['count'] = 1;
  @Input() skeletonType: NgxSkeletonLoaderConfig['appearance'] = 'line';
  @Input() skeletonShow: boolean = false;
  @Input() skeletonUseParent: boolean = false; // experimental
  defaultHeight = '25px';
  defaultWidth = '100%';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private vr: ViewContainerRef,
    private el: ElementRef,
    @Inject(NGX_SKELETON_LOADER_CONFIG)
    @Optional()
    private config?: NgxSkeletonLoaderConfig
  ) {
  }

  ngOnChanges(): void {
    const nativeElement = this.el.nativeElement;
    let replaceElement = this.el.nativeElement;

    if (this.skeletonUseParent) {
      // This is an experimental feature -  remove this when it causes unexpected behavior
      replaceElement = this.el.nativeElement.parentElement;
    }

    const { height, width } = this.computeDimensions(replaceElement);

    if (this.skeletonShow) {

      let comp = this.vr.createComponent(NgxSkeletonLoaderComponent);
      
      nativeElement.style.display = 'none';

      comp.instance.theme = {
        // Maintain the same order for preserving Style precedence
        ...this.config?.theme,
        ...this.skeletonStyle,
        height,
        width,
      };
      comp.instance.count = this.skeletonCount;
      comp.instance.appearance = this.skeletonType;
    } else {
      this.vr.clear();
      nativeElement.style.display = '';
    }
  }

  private computeDimensions(replaceElement: any): {
    height: string;
    width: string;
  } {
    let height = this.skeletonStyle?.height
      ? this.skeletonStyle.height
      : replaceElement.offsetHeight - ( replaceElement.offsetHeight * (10 / 100)) + 'px'; // reduce 10% height to prevent content jumping

    let width = this.skeletonStyle?.width
      ? this.skeletonStyle.width
      : replaceElement.offsetWidth + 'px';

    if (height === 0 || height === '0px') {
      height = this.defaultHeight;
    }
    if (width === 0 || width === '0px') {
      width = this.defaultWidth;
    }
    if (this.skeletonType === 'circle') {
      let minValue = Math.min(parseFloat(height), parseFloat(width));
      if (this.skeletonStyle?.height || this.skeletonStyle?.width) {
        const inputHW = Math.max(
          isNaN(parseFloat(this.skeletonStyle?.height)) ? 0 : parseFloat(this.skeletonStyle?.height),
          isNaN(parseFloat(this.skeletonStyle?.width)) ? 0 : parseFloat(this.skeletonStyle?.width));
        minValue = inputHW === 0 ? minValue : inputHW;
      }
      minValue = minValue - ( minValue * (5 / 100)); // reduce 5% height to prevent content jumping
      // We removed the units in the beginning of the circle condition so adding it back.
      height = minValue + 'px';
      width = minValue + 'px';
    }
    return { height, width };
  }

}
