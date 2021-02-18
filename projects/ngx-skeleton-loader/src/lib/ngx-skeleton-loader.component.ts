import { Component, OnInit, Input, isDevMode, OnDestroy, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { start, end } from 'perf-marks/marks';

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxSkeletonLoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  // tslint:disable-next-line: variable-name
  static ngAcceptInputType_count: number | string;
  // tslint:disable-next-line: variable-name
  static ngAcceptInputType_animation: boolean | string;

  @Input()
  count = 1;

  @Input()
  loadingText = 'Loading...';

  @Input()
  appearance: 'circle' | '' = '';

  @Input()
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' | false = 'progress';

  // This is required since ngStyle is using `any` as well
  // More details in https://angular.io/api/common/NgStyle
  // tslint:disable-next-line: no-any
  @Input() theme: { [k: string]: any } = {};

  // tslint:disable-next-line: no-any
  items: Array<any> = [];

  ngOnInit() {
    start('NgxSkeletonLoader:Rendered');
    start('NgxSkeletonLoader:Loaded');

    this.items.length = +this.count;
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
  }

  ngAfterViewInit() {
    end('NgxSkeletonLoader:Rendered');
  }

  ngOnDestroy() {
    end('NgxSkeletonLoader:Loaded');
  }
}
