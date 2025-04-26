import { InjectionToken } from '@angular/core';

export type NgxSkeletonLoaderConfigTheme = {
  /** It enforces a combination of `fromRoot` styles with component `styles` attribute */
  extendsFromRoot?: boolean;
  // This is required since [style] is using `any` as well
  // More details in https://angular.dev/api/common/NgStyle
  [k: string]: any;
} | null;

export interface NgxSkeletonLoaderConfig {
  appearance: 'circle' | 'line' | 'custom-content' | '';
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' | false;
  theme: NgxSkeletonLoaderConfigTheme;
  loadingText: string;
  count: number;
  ariaLabel: string;
}

export const NGX_SKELETON_LOADER_CONFIG = new InjectionToken<NgxSkeletonLoaderConfig>('ngx-skeleton-loader.config');
