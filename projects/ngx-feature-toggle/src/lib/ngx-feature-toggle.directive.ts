import {
  Directive,
  EmbeddedViewRef,
  inject,
  input,
  isDevMode,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { isOn } from 'feature-toggle-service';

@Directive({
  selector: '[ngxFeatureToggle]',
  standalone: true,
})
export class FeatureToggleDirective implements OnChanges {
  ngxFeatureToggle = input.required<string | string[]>();

  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);
  private embeddedViewRef: EmbeddedViewRef<unknown> | null = null;

  ngOnChanges(): void {
    this.updateView();
  }

  private updateView(): void {
    const featureToggle = this.ngxFeatureToggle();
    const shouldShow = this.isOnCheck(featureToggle);

    if (shouldShow && !this.embeddedViewRef) {
      this.embeddedViewRef = this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!shouldShow && this.embeddedViewRef) {
      this.viewContainer.clear();
      this.embeddedViewRef = null;
    }
  }

  private isOnCheck(featureToggle: string | string[]): boolean {
    if (typeof featureToggle !== 'string' && !Array.isArray(featureToggle)) {
      if (isDevMode()) {
        // eslint-disable-next-line no-console
        console.error('`NgxFeatureToggle`: `ngxFeatureToggle` should receive an array or a string as a value.');
      }
      return false;
    }

    const toggles = Array.isArray(featureToggle) ? featureToggle : [featureToggle];

    return toggles.every(toggle => {
      if (typeof toggle !== 'string') {
        return false;
      }

      return toggle[0] === '!' ? !isOn(toggle.replace('!', '')) : isOn(toggle);
    });
  }
}
