import { InjectionToken } from '@angular/core';

export type NgxSkeletonLoaderConfigTheme = {
  /** It enforces a combination of `fromRoot` styles with component `styles` attribute */
  extendsFromRoot?: boolean;
  /**
   * Same entries accepted by `[style]` binding: CSS properties (dash-case or camelCase),
   * CSS custom properties (e.g. `--ngx-skeleton-loader-base-color`) and CSS properties with
   * unit suffix (e.g. `'height.px': 50`). Values are strings or numbers, and `null`/`undefined`
   * remove the style. More details in https://angular.dev/guide/templates/binding#css-style-properties
   */
  [k: string]: string | number | boolean | null | undefined;
} | null;

type CSSMeasureUnit = 'px' | 'em' | 'rem' | '%' | 'vh' | 'vw';

/**
 * Registry of custom animations, extended by consumers via TypeScript declaration merging.
 * Every key registered here becomes a valid `animation` value, rendered as `animation-<key>`
 * CSS class in the skeleton. E.g.:
 *
 * ```ts
 * import 'ngx-skeleton-loader';
 *
 * declare module 'ngx-skeleton-loader' {
 *   interface NgxSkeletonLoaderCustomAnimations {
 *     'my-wave': true;
 *   }
 * }
 * ```
 *
 * The animation styles must be added in a global stylesheet (e.g. `styles.css`) or via `::ng-deep`,
 * targeting `.skeleton-loader.animation-my-wave`, since component styles are encapsulated.
 */
export interface NgxSkeletonLoaderCustomAnimations {}

export interface NgxSkeletonLoaderConfig {
  appearance: 'circle' | 'line' | 'custom-content' | 'square' | '';
  animation:
    | 'progress'
    | 'progress-dark'
    | 'pulse'
    | 'pulse-dark'
    | 'false'
    | false
    | Extract<keyof NgxSkeletonLoaderCustomAnimations, string>;
  theme: NgxSkeletonLoaderConfigTheme;
  loadingText: string;
  count: number;
  ariaLabel: string;
  size: number | `${number}` | `${number}${CSSMeasureUnit}` | null;
  measureUnit: CSSMeasureUnit;
  /**
   * `auto` follows the user's color scheme preference (OS and/or browser), switching default
   * colors to dark mode automatically. `light` or `dark` force the given color scheme.
   */
  colorScheme: 'auto' | 'light' | 'dark';
}

export const NGX_SKELETON_LOADER_CONFIG = new InjectionToken<NgxSkeletonLoaderConfig>('ngx-skeleton-loader.config');
