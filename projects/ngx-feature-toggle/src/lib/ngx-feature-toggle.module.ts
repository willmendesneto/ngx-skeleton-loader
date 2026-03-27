import { NgModule } from '@angular/core';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';

@NgModule({
  imports: [FeatureToggleProviderComponent, FeatureToggleDirective],
  exports: [FeatureToggleProviderComponent, FeatureToggleDirective],
})
export class FeatureToggleModule {}
