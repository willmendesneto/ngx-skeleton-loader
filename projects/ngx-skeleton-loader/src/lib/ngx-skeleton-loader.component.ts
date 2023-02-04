import {
  Component,
  OnInit,
  Input,
  isDevMode,
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

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSkeletonLoaderComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  static ngAcceptInputType_count: number | string;
  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: Array<any>;

  constructor(@Inject(NGX_SKELETON_LOADER_CONFIG) @Optional() private config?: NgxSkeletonLoaderConfig) {
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
    start('NgxSkeletonLoader:Rendered');
    start('NgxSkeletonLoader:Loaded');

    this.validateInputValues();
  }

  private validateInputValues() {
    // Checking if it's receiving a numeric value (string having ONLY numbers or if it's a number)
    if (!/^\d+$/.test(`${this.count}`)) {
      // Shows error message only in Development
      if (isDevMode()) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'count' a numeric value. Forcing default to "1".`,
        );
      }
      this.count = 1;
    }

    //Force count to 1 when custom-content is used
    if (this.appearance === 'custom-content') {
      // Shows error message only in Development
      if (isDevMode() && this.count !== 1) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` enforces elements with "custom-content" appearance as DOM nodes. Forcing "count" to "1".`,
        );
        this.count = 1;
      }
    }
    this.items.length = this.count;

    const allowedAnimations = ['progress', 'progress-dark', 'pulse', 'false'];
    if (allowedAnimations.indexOf(String(this.animation)) === -1) {
      // Shows error message only in Development
      if (isDevMode()) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: ${allowedAnimations.join(
            ', ',
          )}. Forcing default to "progress".`,
        );
      }
      this.animation = 'progress';
    }

    if (['circle', 'line', 'custom-content', ''].indexOf(String(this.appearance)) === -1) {
      // Shows error message only in Development
      if (isDevMode()) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'appearance' as: circle or line or custom-content or empty string. Forcing default to "''".`,
        );
      }
      this.appearance = '';
    }

    if (Boolean(this.config?.theme?.extendsFromRoot) && this.theme !== null) {
      // Shows error message only in Development
      this.theme = { ...this.config!.theme, ...this.theme };
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
    end('NgxSkeletonLoader:Rendered');
  }

  ngOnDestroy() {
    end('NgxSkeletonLoader:Loaded');
  }
}
