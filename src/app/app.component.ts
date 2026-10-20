import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxSkeletonLoaderComponent, NgxSkeletonLoaderConfig } from '../../projects/ngx-skeleton-loader/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgxSkeletonLoaderComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngx-skeleton-loader-demo';

  // Signals keep the demo working with zoneless change detection
  readonly animation = signal<NgxSkeletonLoaderConfig['animation']>('pulse');
  readonly contentLoaded = signal(false);
  readonly count = signal(2);
  readonly widthHeightSizeInPixels = signal('50px');

  intervalId: number | null = null;

  readonly platformId = inject(PLATFORM_ID);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => {
        this.contentLoaded.set(true);
      }, 2000);

      this.intervalId = window.setInterval(() => {
        this.animation.update(animation => (animation === 'pulse' ? 'progress-dark' : 'pulse'));
        this.count.update(count => (count === 2 ? 5 : 2));
        this.widthHeightSizeInPixels.update(size => (size === '50px' ? '100px' : '50px'));
      }, 5000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// Registering custom animations via TypeScript declaration merging.
// Custom animation styles are in `src/styles.scss`, since component styles are encapsulated
declare module '../../projects/ngx-skeleton-loader/src/public-api' {
  interface NgxSkeletonLoaderCustomAnimations {
    stretch: true;
  }
}
