export type Appearance = 'circle' | 'line' | '';
export const defaultAppearance: Appearance = '';

export type Animation = 'progress' | 'progress-dark' | 'pulse' | 'false' | false;
export const defaultAnimation: Animation = 'progress';

export interface Theme {
  // This is required since ngStyle is using `any` as well
  // More details in https://angular.io/api/common/NgStyle
  // tslint:disable-next-line: no-any
  [k: string]: any;
}
export const defaultTheme: Theme = {};

export const defaultLoadingText = 'Loading...';
export const defaultCount = 1;

export class NgxSkeletonLoaderConfig {
  appearance?: Appearance = defaultAppearance;
  animation?: Animation = defaultAnimation;
  theme?: Theme = defaultTheme;
  loadingText?: string = defaultLoadingText;
  count?: number = defaultCount;
}
export const defaultConfig: NgxSkeletonLoaderConfig = new NgxSkeletonLoaderConfig();
