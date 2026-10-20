import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';
import { NgxSkeletonLoaderConfig, NGX_SKELETON_LOADER_CONFIG } from './ngx-skeleton-loader-config.types';

/** @deprecated Import the standalone `NgxSkeletonLoaderComponent` and use `provideNgxSkeletonLoader()` */
@NgModule({
  imports: [NgxSkeletonLoaderComponent],
  exports: [NgxSkeletonLoaderComponent],
})
export class NgxSkeletonLoaderModule {
  /** @deprecated Use `provideNgxSkeletonLoader()` */
  static forRoot(config?: Partial<NgxSkeletonLoaderConfig>): ModuleWithProviders<NgxSkeletonLoaderModule> {
    return {
      ngModule: NgxSkeletonLoaderModule,
      providers: [{ provide: NGX_SKELETON_LOADER_CONFIG, useValue: config }],
    };
  }
}
