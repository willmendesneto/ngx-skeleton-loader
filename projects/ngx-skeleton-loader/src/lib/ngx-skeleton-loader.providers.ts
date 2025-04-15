import { makeEnvironmentProviders } from '@angular/core';
import { NgxSkeletonLoaderConfig, NGX_SKELETON_LOADER_CONFIG } from './ngx-skeleton-loader-config.types';

export function provideNgxSkeletonLoader(config?: Partial<NgxSkeletonLoaderConfig>) {
  return makeEnvironmentProviders([
    { provide: NGX_SKELETON_LOADER_CONFIG, useValue: config },
  ]);
}
