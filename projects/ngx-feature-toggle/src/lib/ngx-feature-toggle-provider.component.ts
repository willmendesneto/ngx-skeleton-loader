import { Component, input, effect, ChangeDetectionStrategy } from '@angular/core';
import { set, FeatureToggleServiceConfig } from 'feature-toggle-service';

@Component({
  selector: 'ngx-feature-toggle-provider',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FeatureToggleProviderComponent {
  features = input.required<FeatureToggleServiceConfig>();

  constructor() {
    effect(() => {
      const currentFeatures = this.features();

      if (typeof currentFeatures !== 'object' || currentFeatures === null) {
        throw new Error('Attribute `features` should not be null or empty');
      }

      set(currentFeatures);
    });
  }
}
