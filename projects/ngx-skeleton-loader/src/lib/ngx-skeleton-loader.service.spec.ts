import { TestBed } from '@angular/core/testing';

import { NgxSkeletonLoaderService } from './ngx-skeleton-loader.service';

describe('NgxSkeletonLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSkeletonLoaderService = TestBed.get(NgxSkeletonLoaderService);
    expect(service).toBeTruthy();
  });
});
