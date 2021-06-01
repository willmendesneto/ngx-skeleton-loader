import { TestBed } from '@angular/core/testing';

import { NgxSkeletonLoaderConfigService } from './ngx-skeleton-loader-config.service';

describe('NgxSkeletonLoaderConfigService', () => {
  let service: NgxSkeletonLoaderConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSkeletonLoaderConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
