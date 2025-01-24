import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';
import { NgxSkeletonLoaderConfig, NGX_SKELETON_LOADER_CONFIG } from './ngx-skeleton-loader-config.types';

@NgModule({
  imports: [CommonModule, NgxSkeletonLoaderComponent],
  exports: [NgxSkeletonLoaderComponent],
})
export class NgxSkeletonLoaderModule {
  static forRoot(config?: Partial<NgxSkeletonLoaderConfig>): ModuleWithProviders<NgxSkeletonLoaderModule> {
    return {
      ngModule: NgxSkeletonLoaderModule,
      providers: [{ provide: NGX_SKELETON_LOADER_CONFIG, useValue: config }],
    };
  }
}
