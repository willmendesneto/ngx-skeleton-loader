import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';
import {
  DEFAULT_NGX_SKELETON_LOADER_CONFIG,
  NgxSkeletonLoaderConfig,
  NGX_SKELETON_LOADER_CONFIG,
} from './ngx-skeleton-loader-config.types';

@NgModule({
  declarations: [NgxSkeletonLoaderComponent],
  imports: [CommonModule],
  exports: [NgxSkeletonLoaderComponent],
})
export class NgxSkeletonLoaderModule {
  static forRoot(
    config: NgxSkeletonLoaderConfig = DEFAULT_NGX_SKELETON_LOADER_CONFIG,
  ): ModuleWithProviders<NgxSkeletonLoaderModule> {
    return {
      ngModule: NgxSkeletonLoaderModule,
      providers: [{ provide: NGX_SKELETON_LOADER_CONFIG, useValue: config }],
    };
  }
}
