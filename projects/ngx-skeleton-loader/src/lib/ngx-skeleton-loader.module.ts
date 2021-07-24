import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';
import { NgxSkeletonLoaderConfig, NGX_SKELETON_LOADER_CONFIG } from './ngx-skeleton-loader-config.types';

@NgModule({
  declarations: [NgxSkeletonLoaderComponent],
  imports: [CommonModule],
  exports: [NgxSkeletonLoaderComponent],
})
export class NgxSkeletonLoaderModule {
  constructor(@Optional() @SkipSelf() parentModule?: NgxSkeletonLoaderModule) {
    if (parentModule) {
      throw new Error(
        `\`NgxSkeletonLoaderModule\` is already loaded and it might cause issues. To avoid that, import the module only once in your app.`,
      );
    }
  }

  static forRoot(config?: Partial<NgxSkeletonLoaderConfig>): ModuleWithProviders<NgxSkeletonLoaderModule> {
    return {
      ngModule: NgxSkeletonLoaderModule,
      providers: [{ provide: NGX_SKELETON_LOADER_CONFIG, useValue: config }],
    };
  }
}
