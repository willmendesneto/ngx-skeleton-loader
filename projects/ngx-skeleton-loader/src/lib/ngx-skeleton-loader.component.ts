import { Component, OnInit, Input, isDevMode, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { start, end } from 'perf-marks/marks';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
})
export class NgxSkeletonLoaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  count = 1;

  @Input()
  appearance: 'circle' | '' = '';

  @Input()
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' = 'progress';

  @Input() theme: { [k: string]: string } = {};

  items: Array<any> = [];

  constructor(@Inject(PLATFORM_ID) private readonly platformId: any) {}

  ngOnInit() {
    if (this.isBrowser()) {
      start('NgxSkeletonLoader:Rendered');
      start('NgxSkeletonLoader:Loaded');
    }

    this.items.length = this.count;
    const allowedAnimations = ['progress', 'progress-dark', 'pulse', 'false'];
    if (allowedAnimations.indexOf(this.animation) === -1) {
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
    if (this.isBrowser()) {
      end('NgxSkeletonLoader:Rendered');
    }
  }

  ngOnDestroy() {
    if (this.isBrowser()) {
      end('NgxSkeletonLoader:Loaded');
    }
  }

  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
