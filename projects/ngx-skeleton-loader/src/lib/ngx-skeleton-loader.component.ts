import {
  Component,
  OnInit,
  Input,
  isDevMode,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Optional,
  Inject,
} from '@angular/core';
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
export class NgxSkeletonLoaderComponent implements OnInit, OnChanges {
  static ngAcceptInputType_count: number | string;
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

  items: Array<any>;

  ngxSkeletonLoaderClasses: Record<string, boolean>;

  @Input('custom-animation')
  customAnimation: string | null;

  constructor(@Inject(NGX_SKELETON_LOADER_CONFIG) @Optional() private config?: NgxSkeletonLoaderConfig) {
    const {
      appearance = 'line',
      animation = 'progress',
      customAnimation = null,
      theme = null,
      loadingText = 'Loading...',
      count = 1,
      ariaLabel = 'loading',
    } = config || {};

    this.appearance = appearance;
    this.animation = customAnimation || animation;
    this.customAnimation = customAnimation;
    this.theme = theme;
    this.loadingText = loadingText;
    this.count = count;
    this.items = [];
    this.ariaLabel = ariaLabel;
    this.ngxSkeletonLoaderClasses = {
      'custom-content': appearance === 'custom-content',
      circle: appearance === 'circle',
      progress: animation === 'progress',
      'progress-dark': animation === 'progress-dark',
      pulse: animation === 'pulse',
      ...(customAnimation && {[customAnimation]: customAnimation !== null})
    }


    console.log('>>>>', customAnimation, count, this.ngxSkeletonLoaderClasses)
  }

  ngOnInit() {
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

    if(typeof this.customAnimation === 'string') {
      this.ngxSkeletonLoaderClasses = {
        'custom-content': this.appearance === 'custom-content',
        circle: this.appearance === 'circle',
        progress: this.animation === 'progress' && this.customAnimation === null,
        'progress-dark': this.animation === 'progress-dark' && this.customAnimation === null,
        pulse: this.animation === 'pulse' && this.customAnimation === null,
        ...(this.customAnimation && { [this.customAnimation]: this.customAnimation !== null })
      }
      this.animation = this.customAnimation;
    }

    const allowedAnimations = ['progress', 'progress-dark', 'pulse', 'false', this.customAnimation];
    if (allowedAnimations.indexOf(String(this.animation)) === -1 || (!!this.customAnimation && this.animation !== this.customAnimation)) {
      // Shows error message only in Development
      if (isDevMode()) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: ${allowedAnimations.join(
            ', ',
          )}. Forcing default to "${this.customAnimation || 'progress'}".`,
        );
      }
      this.animation = this.customAnimation || 'progress';
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

    // This code is not using optional chaining since it's only supported on Angular CLI v12
    //  - more details in this comment https://github.com/angular/angular-cli/issues/20471#issuecomment-815599616
    // Which raises issues on the consumer's side. E.G: https://github.com/willmendesneto/ngx-skeleton-loader/issues/150#issuecomment-1638612329
    const { theme } = this.config || {};
    if (!!theme && !!theme.extendsFromRoot && this.theme !== null) {
      // Shows error message only in Development
      this.theme = { ...this.config!.theme, ...this.theme };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Avoiding multiple calls for the same input in case there's no changes in the fields
    // Checking if the fields that require validation are available and if they were changed
    // In case were not changed, we stop the function. Otherwise, `validateInputValues` will be called.
    if (
      ['count', 'animation', 'appearance', 'customAnimation'].find(
        key =>
          changes[key] && (changes[key].isFirstChange() || changes[key].previousValue === changes[key].currentValue),
      )
    ) {
      return;
    }

    this.validateInputValues();
  }
}
