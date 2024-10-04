import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxSkeletonLoaderConfig } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngx-skeleton-loader-demo';

  animation: NgxSkeletonLoaderConfig['animation'] = 'pulse';
  contentLoaded = false;
  count = 2;
  widthHeightSizeInPixels = 50;

  intervalId: number | null = null;

  platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.setTimeout(() => {
        this.contentLoaded = true;
      }, 2000);

      this.intervalId = window.setInterval(() => {
        this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
        this.count = this.count === 2 ? 5 : 2;
        this.widthHeightSizeInPixels = this.widthHeightSizeInPixels === 50 ? 100 : 50;
      }, 5000);
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
