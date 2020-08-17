import { Component, NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';
import { async as waitForAsync, TestBed } from '@angular/core/testing';
import { start, end } from 'perf-marks/marks';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';

@Component({
  selector: 'ngx-container',
  template: `
    <div>
      <div class="skeletons-defaults">
        <ngx-skeleton-loader></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-no-animation">
        <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-pulse">
        <ngx-skeleton-loader animation="pulse"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-progress">
        <ngx-skeleton-loader animation="progress"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-progress-dark">
        <ngx-skeleton-loader animation="progress-dark"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-invalid-option">
        <ngx-skeleton-loader animation="invalid-option"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-with-count">
        <ngx-skeleton-loader count="2"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-appearance-circle">
        <ngx-skeleton-loader appearance="circle"> </ngx-skeleton-loader>
      </div>

      <div class="skeletons-with-theming">
        <ngx-skeleton-loader appearance="circle" [theme]="{ width: '70px', height: '70px', 'border-radius': '10px' }">
        </ngx-skeleton-loader>
      </div>
    </div>
  `,
})
class ContainerComponent {}

describe('NgxSkeletonLoaderComponent', () => {
  let fixture: any;

  beforeEach(
    waitForAsync(() => {
      spyOn(console, 'error');
      fixture = TestBed.configureTestingModule({
        declarations: [ContainerComponent, NgxSkeletonLoaderComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
        schemas: [NO_ERRORS_SCHEMA],
      }).createComponent(ContainerComponent);
      fixture.detectChanges();
    }),
  );

  it('should console errors if `animation` is an invalid option and is running in development mode', () => {
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      // tslint:disable-next-line: max-line-length
      `\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: progress, progress-dark, pulse, false. Forcing default to "progress".`,
    );
  });

  it('should add all relevant WAI-ARIA `aria-` attributes in all ngx-skeleton-loader', () => {
    expect(fixture.nativeElement.querySelectorAll('[aria-busy="true"]').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('[aria-valuemin="0"]').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('[aria-valuemax="100"]').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('[aria-valuetext="Loading..."]').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('[role="progressbar"]').length).toBe(10);
    expect(fixture.nativeElement.querySelectorAll('[tabindex="0"]').length).toBe(10);
  });

  it('should use progress as default animation if `animation` is not passed as component attribute', () => {
    expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .loader.progress').length).toBe(1);
  });

  describe('When skeleton is created using default settings', () => {
    it('should render a single skeleton', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .loader').length).toBe(1);
    });
  });

  describe('When skeleton is created with count', () => {
    it('should render skeleton based on given count attribute', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-with-count .loader').length).toBe(2);
    });
  });

  describe('When skeleton is created with circle appearance', () => {
    it('should add styles based on circle class on the skeleton components', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-appearance-circle .loader.circle').length).toBe(1);
    });
  });

  describe('When skeleton is created without animation', () => {
    it('should NOT add progress animation styles based on animation class on the skeleton components', () => {
      expect(
        fixture.nativeElement.querySelectorAll('.skeletons-animation-no-animation .loader:not(.animation)').length,
      ).toBe(1);
    });
  });

  describe('When skeleton is created using `pulse` as animation', () => {
    it('should add pulse animation styles based on animation class on the skeleton components', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-animation-pulse .loader.pulse').length).toBe(1);
    });
  });

  describe('When skeleton is created using `progress-dark` as animation', () => {
    it('should add progress-dark animation styles based on animation class on the skeleton components', () => {
      expect(
        fixture.nativeElement.querySelectorAll('.skeletons-animation-progress-dark .loader.progress-dark').length,
      ).toBe(1);
    });
  });

  describe('When skeleton is created using `progress` as animation', () => {
    it('should add progress animation styles based on animation class on the skeleton components', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-animation-progress .loader.progress').length).toBe(1);
    });
  });

  describe('When skeleton is created with theming', () => {
    it('should render skeleton with styles based on theme attribute', () => {
      const skeletonWithTheming = fixture.nativeElement.querySelector('.skeletons-with-theming .loader.circle')
        .attributes as NamedNodeMap;

      expect(skeletonWithTheming.getNamedItem('style').value).toBe('width: 70px; height: 70px; border-radius: 10px;');
    });
  });

  describe('When rendering server side', () => {
    let spyStart;
    let spyEnd;
    let ngxSkeletonLoaderComponent;

    beforeEach(() => {
      spyStart = jasmine.createSpy('start', start);
      spyEnd = jasmine.createSpy('start', end);

      ngxSkeletonLoaderComponent = TestBed.createComponent<NgxSkeletonLoaderComponent>(NgxSkeletonLoaderComponent)
        .componentInstance;

      spyOn<NgxSkeletonLoaderComponent, 'isBrowser'>(ngxSkeletonLoaderComponent, 'isBrowser').and.returnValue(false);
    });

    it('should not call perf-marks render and load marks', () => {
      ngxSkeletonLoaderComponent.ngOnInit();
      ngxSkeletonLoaderComponent.ngAfterViewInit();
      ngxSkeletonLoaderComponent.ngOnDestroy();

      expect(spyStart).not.toHaveBeenCalled();
      expect(spyEnd).not.toHaveBeenCalled();
    });
  });
});
