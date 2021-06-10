import { Component, PLATFORM_ID } from '@angular/core';
import { async as waitForAsync, TestBed } from '@angular/core/testing';
import { NGX_SKELETON_LOADER_CONFIG } from './ngx-skeleton-loader-config.types';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';

@Component({
  selector: 'ngx-container',
  template: `
    <div>
      <div class="skeletons-defaults">
        <ngx-skeleton-loader></ngx-skeleton-loader>
      </div>

      <div class="skeleton-with-specific-loading-text">
        <ngx-skeleton-loader loadingText="Loading. Please wait ..."></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-no-animation">
        <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-animation-no-animation-via-binding">
        <ngx-skeleton-loader [animation]="animationWithFalsePassedViaBinding"></ngx-skeleton-loader>
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

      <div class="skeletons-count-invalid-option">
        <ngx-skeleton-loader [count]="invalidValueIncount"></ngx-skeleton-loader>
      </div>

      <div class="skeletons-appearance-invalid-option">
        <ngx-skeleton-loader appearance="invalid-appearance"></ngx-skeleton-loader>
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

      <div class="skeletons-with-provided-config">
        <ngx-skeleton-loader></ngx-skeleton-loader>
      </div>
    </div>
  `,
})
class ContainerComponent {
  animationWithFalsePassedViaBinding = false;
  invalidValueIncount = 'two';
}

describe('NgxSkeletonLoaderComponent', () => {
  // tslint:disable-next-line: no-any
  let fixture: any;
  beforeEach(() => {
    spyOn(console, 'error');
  });

  describe('When the component uses default configuration', () => {
    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.configureTestingModule({
          declarations: [ContainerComponent, NgxSkeletonLoaderComponent],
          providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
        }).createComponent(ContainerComponent);
        fixture.detectChanges();
      }),
    );

    it('should console 3 errors if `animation`, `appearance` and `count` receives invalid options and is running in development mode', () => {
      expect(console.error).toHaveBeenCalledTimes(3);
    });

    it('should console errors if `animation` is an invalid option and is running in development mode', () => {
      expect(console.error).toHaveBeenCalledWith(
        // tslint:disable-next-line: max-line-length
        `\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: progress, progress-dark, pulse, false. Forcing default to "progress".`,
      );
    });

    it('should console errors if `count` is an invalid option and is running in development mode', () => {
      expect(console.error).toHaveBeenCalledWith(
        // tslint:disable-next-line: max-line-length
        `\`NgxSkeletonLoaderComponent\` need to receive 'count' a numeric value. Forcing default to "1".`,
      );
    });

    it('should console errors if `appearance` is an invalid option and is running in development mode', () => {
      expect(console.error).toHaveBeenCalledWith(
        // tslint:disable-next-line: max-line-length
        `\`NgxSkeletonLoaderComponent\` need to receive 'appearance' as: circle or line or empty string. Forcing default to "''".`,
      );
    });

    it('should add all relevant WAI-ARIA `aria-` attributes in all ngx-skeleton-loader', () => {
      expect(fixture.nativeElement.querySelectorAll('[aria-busy="true"]').length).toBe(15);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuemin="0"]').length).toBe(15);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuemax="100"]').length).toBe(15);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuetext]').length).toBe(15);
      expect(fixture.nativeElement.querySelectorAll('[role="progressbar"]').length).toBe(15);
      expect(fixture.nativeElement.querySelectorAll('[tabindex="0"]').length).toBe(15);
    });

    it('should use progress as default animation if `animation` is not passed as component attribute', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .loader.progress').length).toBe(1);
    });

    describe('When skeleton is created using default settings', () => {
      it('should render a single skeleton', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .loader').length).toBe(1);
      });
    });

    describe('When skeleton is created passing loading text to be used as WAI-ARIA `aria-valuetext`', () => {
      it('should render a single skeleton', () => {
        expect(fixture.nativeElement.querySelectorAll('[aria-valuetext="Loading. Please wait ..."]').length).toBe(1);
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

      it('should NOT add progress animation styles based on animation class if animation value is passed via binding', () => {
        expect(
          fixture.nativeElement.querySelectorAll(
            '.skeletons-animation-no-animation-via-binding .loader:not(.animation)',
          ).length,
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

        expect((skeletonWithTheming.getNamedItem('style') as Attr).value).toBe(
          'width: 70px; height: 70px; border-radius: 10px;',
        );
      });
    });
  });

  describe('When the component receives a different default via module configuration', () => {
    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.configureTestingModule({
          declarations: [ContainerComponent, NgxSkeletonLoaderComponent],
          providers: [
            { provide: PLATFORM_ID, useValue: 'browser' },
            { provide: NGX_SKELETON_LOADER_CONFIG, useValue: { appearance: 'circle', count: 3 } },
          ],
        }).createComponent(ContainerComponent);
        fixture.detectChanges();
      }),
    );

    it('should render skeleton with the provided config', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-with-provided-config .loader.circle').length).toBe(3);
    });
  });
});
