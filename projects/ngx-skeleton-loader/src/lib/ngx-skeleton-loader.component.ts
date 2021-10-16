import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  AfterViewInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Optional,
  Inject,
} from '@angular/core';
import { start, end } from 'perf-marks/marks';
import {
  NgxSkeletonLoaderConfig,
  NgxSkeletonLoaderConfigTheme,
  NGX_SKELETON_LOADER_CONFIG,
} from './ngx-skeleton-loader-config.types';

// Caretaker note: we have still left the `typeof` condition in order to avoid
// creating a breaking change for projects that still use the View Engine.
// The `ngDevMode` is always available when Ivy is enabled.
// This will be evaluated during compilation into `const NG_DEV_MODE = false`,
// thus Terser will be able to tree-shake `console.error` calls and `perf-marks/marks` package.
const NG_DEV_MODE = typeof ngDevMode === 'undefined' || !!ngDevMode;

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSkeletonLoaderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // tslint:disable-next-line: variable-name
  static ngAcceptInputType_count: number | string;
  // tslint:disable-next-line: variable-name
  static ngAcceptInputType_animation: boolean | string;

  @Input()
  count: NgxSkeletonLoaderConfig['count'];

  @Input()
  loadingText: NgxSkeletonLoaderConfig['loadingText'];

  @Input()
  appearance: NgxSkeletonLoaderConfig['appearance'];

  @Input()
  animation: NgxSkeletonLoaderConfig['animation'];

  @Input()
  ariaLabel: NgxSkeletonLoaderConfig['ariaLabel'];

  @Input()
  theme: NgxSkeletonLoaderConfigTheme;

  // tslint:disable-next-line: no-any
  items: Array<any>;

  constructor(@Inject(NGX_SKELETON_LOADER_CONFIG) @Optional() config?: NgxSkeletonLoaderConfig) {
    const {
      appearance = 'line',
      animation = 'progress',
      theme = null,
      loadingText = 'Loading...',
      count = 1,
      ariaLabel = 'loading',
    } = config || {};

    this.appearance = appearance;
    this.animation = animation;
    this.theme = theme;
    this.loadingText = loadingText;
    this.count = count;
    this.items = [];
    this.ariaLabel = ariaLabel;
  }

  ngOnInit() {
    if (NG_DEV_MODE) {
      start('NgxSkeletonLoader:Rendered');
      start('NgxSkeletonLoader:Loaded');
    }

    this.validateInputValues();
  }

  private validateInputValues() {
    // Checking if it's receiving a numeric value (string having ONLY numbers or if it's a number)
    if (!/^\d+$/.test(`${this.count}`)) {
      // Shows error message only in Development
      if (NG_DEV_MODE) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'count' a numeric value. Forcing default to "1".`,
        );
      }
      this.count = 1;
    }
    this.items.length = this.count;

    const allowedAnimations = ['progress', 'progress-dark', 'pulse', 'false'];
    if (allowedAnimations.indexOf(String(this.animation)) === -1) {
      // Shows error message only in Development
      if (NG_DEV_MODE) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: ${allowedAnimations.join(
            ', ',
          )}. Forcing default to "progress".`,
        );
      }
      this.animation = 'progress';
    }

    if (['circle', 'line', ''].indexOf(String(this.appearance)) === -1) {
      // Shows error message only in Development
      if (NG_DEV_MODE) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'appearance' as: circle or line or empty string. Forcing default to "''".`,
        );
      }
      this.appearance = '';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Avoiding multiple calls for the same input in case there's no changes in the fields
    // Checking if the fields that require validation are available and if they were changed
    // In case were not changed, we stop the function. Otherwise, `validateInputValues` will be called.
    if (
      ['count', 'animation', 'appearance'].find(
        key =>
          changes[key] && (changes[key].isFirstChange() || changes[key].previousValue === changes[key].currentValue),
      )
    ) {
      return;
    }

    this.validateInputValues();
  }

  ngAfterViewInit() {
    if (NG_DEV_MODE) {
      end('NgxSkeletonLoader:Rendered');
    }
  }

  ngOnDestroy() {
    if (NG_DEV_MODE) {
      end('NgxSkeletonLoader:Loaded');
    }
  }
}
