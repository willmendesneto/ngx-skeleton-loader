import { Inject, Injectable, Optional } from '@angular/core';
import {
  DEFAULT_NGX_SKELETON_LOADER_CONFIG,
  NgxSkeletonLoaderConfig,
  NGX_SKELETON_LOADER_CONFIG,
} from './ngx-skeleton-loader-config.types';

@Injectable({
  providedIn: 'root',
})
export class NgxSkeletonLoaderConfigService {
  readonly config: NgxSkeletonLoaderConfig = DEFAULT_NGX_SKELETON_LOADER_CONFIG;

  constructor(@Inject(NGX_SKELETON_LOADER_CONFIG) @Optional() config: NgxSkeletonLoaderConfig) {
    if (config) {
      this.config = config;
    }
  }
}
