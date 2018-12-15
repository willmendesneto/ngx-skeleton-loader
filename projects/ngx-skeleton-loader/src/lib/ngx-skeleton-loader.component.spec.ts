import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';

describe('NgxSkeletonLoaderComponent', () => {
  let component: NgxSkeletonLoaderComponent;
  let fixture: ComponentFixture<NgxSkeletonLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSkeletonLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
