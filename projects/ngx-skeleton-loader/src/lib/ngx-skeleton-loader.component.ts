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
} from '@angular/core';
import { start, end } from 'perf-marks/marks';
import { NgxSkeletonLoaderConfigService } from './ngx-skeleton-loader-config.service';
import {
  Animation,
  Appearance,
  defaultAnimation,
  defaultAppearance,
  defaultCount,
  defaultLoadingText,
  defaultTheme,
  Theme,
} from './ngx-skeleton-loader-config.types';

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
  count: number = this.configService.config.count ?? defaultCount;

  @Input()
  loadingText: string = this.configService.config.loadingText ?? defaultLoadingText;

  @Input()
  appearance: Appearance = this.configService.config.appearance ?? defaultAppearance;

  @Input()
  animation: Animation = this.configService.config.animation ?? defaultAnimation;

  @Input() theme: Theme = this.configService.config.theme ?? defaultTheme;

  // tslint:disable-next-line: no-any
  items: Array<any> = [];

  constructor(private configService: NgxSkeletonLoaderConfigService) {}

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

    if (['circle', 'line', ''].indexOf(String(this.appearance)) === -1) {
      // Shows error message only in Development
      if (isDevMode()) {
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
    end('NgxSkeletonLoader:Rendered');
  }

  ngOnDestroy() {
    end('NgxSkeletonLoader:Loaded');
  }
}
