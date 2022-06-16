import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Optional,
  Renderer2, VERSION, ViewContainerRef
} from '@angular/core';
import {
  NGX_SKELETON_LOADER_CONFIG,
  NgxSkeletonLoaderConfig,
  NgxSkeletonLoaderConfigTheme
} from "../ngx-skeleton-loader-config.types";
import { NgxSkeletonLoaderComponent } from "../ngx-skeleton-loader.component";

@Directive({
  selector: '[skeletonShow], [skeletonStyle], [skeletonCount], [skeletonType], [skeletonUseParent]',
})
export class SkeletonLoaderDirective implements OnChanges {

  @Input() skeletonStyle: NgxSkeletonLoaderConfigTheme = {};
  @Input() skeletonCount: number = 1;
  @Input() skeletonType: 'line' | 'circle' = 'line';
  @Input() skeletonShow: boolean = false;
  @Input() skeletonUseParent: boolean = false; // experimental
  defaultHeight = '25px';
  defaultWidth = '100%';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private vr: ViewContainerRef,
    private el: ElementRef,
    private renderer: Renderer2,
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
    ;
    const { height, width } = this.computeDimensions(replaceElement);

    if (this.skeletonShow) {

      let comp = null;

      if (Number.parseInt(VERSION.major) >= 13) {
        comp = this.vr.createComponent(NgxSkeletonLoaderComponent);
      } else {
        // Support for older version of Angular
        let factory = this.componentFactoryResolver.resolveComponentFactory(
          NgxSkeletonLoaderComponent
        );
        comp = this.vr.createComponent(factory);
      }

      nativeElement.style.display = 'none';

      comp.instance.theme = {
        ...this.config?.theme,
        height,
        width,
        ...this.skeletonStyle,
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
      : replaceElement.offsetHeight + 'px';

    let width = this.skeletonStyle?.width
      ? this.skeletonStyle.width
      : replaceElement.offsetWidth + 'px';

    if (height === 0 || height === '0px') {
      height = this.defaultHeight;
    }
    if (width === '0px' || width === 0) {
      width = this.defaultWidth;
    }
    if (this.skeletonType === 'circle') {
      const minValue = Math.min(parseFloat(height), parseFloat(width));
      height = minValue;
      width = minValue;
    }
    return { height, width };
  }

}
