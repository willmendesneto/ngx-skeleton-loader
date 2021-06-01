import { InjectionToken } from '@angular/core';

export interface NgxSkeletonLoaderConfig {
  appearance?: 'circle' | 'line' | '';
  animation?: 'progress' | 'progress-dark' | 'pulse' | 'false' | false;
  theme?: {
    // This is required since ngStyle is using `any` as well
    // More details in https://angular.io/api/common/NgStyle
    // tslint:disable-next-line: no-any
    [k: string]: any;
  };
  loadingText?: string;
  count?: number;
}

export const DEFAULT_NGX_SKELETON_LOADER_CONFIG = {
  appearance: 'line',
  animation: 'progress',
  theme: {},
  loadingText: 'Loading...',
  count: 1,
} as NgxSkeletonLoaderConfig;

export const NGX_SKELETON_LOADER_CONFIG = new InjectionToken<NgxSkeletonLoaderConfig>('ngx-skeleton-loader.config');
