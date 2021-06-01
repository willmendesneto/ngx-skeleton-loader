import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';
import { defaultConfig, NgxSkeletonLoaderConfig } from './ngx-skeleton-loader-config.types';

@NgModule({
  declarations: [NgxSkeletonLoaderComponent],
  imports: [CommonModule],
  exports: [NgxSkeletonLoaderComponent],
})
export class NgxSkeletonLoaderModule {
  static forRoot(config: NgxSkeletonLoaderConfig = defaultConfig): ModuleWithProviders<NgxSkeletonLoaderModule> {
    return {
      ngModule: NgxSkeletonLoaderModule,
      providers: [{ provide: NgxSkeletonLoaderConfig, useValue: config }],
    };
  }
}
