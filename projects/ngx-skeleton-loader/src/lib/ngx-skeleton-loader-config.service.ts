import { Injectable, Optional } from '@angular/core';
import { defaultConfig, NgxSkeletonLoaderConfig } from './ngx-skeleton-loader-config.types';

@Injectable({
  providedIn: 'root',
})
export class NgxSkeletonLoaderConfigService {
  readonly config: NgxSkeletonLoaderConfig = defaultConfig;

  constructor(@Optional() config: NgxSkeletonLoaderConfig) {
    if (config) {
      this.config = config;
    }
  }
}
