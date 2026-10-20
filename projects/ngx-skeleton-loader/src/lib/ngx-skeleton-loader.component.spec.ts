import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGX_SKELETON_LOADER_CONFIG, NgxSkeletonLoaderConfigTheme } from './ngx-skeleton-loader-config.types';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';

@Component({
  selector: 'ngx-container',
  imports: [NgxSkeletonLoaderComponent],
  template: `
    <div>
      <div class="test-wrapper skeletons-defaults">
        <ngx-skeleton-loader></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeleton-with-specific-loading-text">
        <ngx-skeleton-loader loadingText="Loading. Please wait ..."></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-no-animation">
        <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-no-animation-via-binding">
        <ngx-skeleton-loader [animation]="animationWithFalsePassedViaBinding"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-pulse">
        <ngx-skeleton-loader animation="pulse"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-pulse-dark">
        <ngx-skeleton-loader animation="pulse-dark"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-progress">
        <ngx-skeleton-loader animation="progress"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-progress-dark">
        <ngx-skeleton-loader animation="progress-dark"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-custom">
        <ngx-skeleton-loader animation="my-wave"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-custom-with-internal-class-name">
        <ngx-skeleton-loader animation="circle"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-animation-invalid-option">
        <ngx-skeleton-loader [animation]="invalidAnimation"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-count-invalid-option">
        <ngx-skeleton-loader [count]="invalidValueInCount"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-appearance-invalid-option">
        <ngx-skeleton-loader [appearance]="invalidAppearance"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-with-count">
        <ngx-skeleton-loader count="2"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-appearance-circle">
        <ngx-skeleton-loader appearance="circle"> </ngx-skeleton-loader>
      </div>
      <div class="test-wrapper skeletons-appearance-square">
        <ngx-skeleton-loader appearance="square" size="100"> </ngx-skeleton-loader>
      </div>
      <div class="test-wrapper skeletons-appearance-square-with-measureUnit">
        <ngx-skeleton-loader appearance="square" size="10" measureUnit="%"> </ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-appearance-square-with-decimal-size">
        <ngx-skeleton-loader appearance="square" size="1.5" measureUnit="rem"> </ngx-skeleton-loader>
      </div>
      <div class="test-wrapper skeletons-appearance-square-with-unit-in-size">
        <ngx-skeleton-loader appearance="square" size="10rem"> </ngx-skeleton-loader>
      </div>
      <div class="test-wrapper skeletons-appearance-square-with-unit-in-size-and-measureUnit">
        <ngx-skeleton-loader appearance="square" size="50%" measureUnit="px"> </ngx-skeleton-loader>
      </div>
      <div class="test-wrapper skeletons-appearance-square-with-invalid-size">
        <ngx-skeleton-loader appearance="square" [size]="invalidSize"> </ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-appearance-custom-content">
        <ngx-skeleton-loader appearance="custom-content">
          <svg viewBox="0 0 312 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="312" height="102" fill="white" />
            <path
              d="M14 49.5338C5.2 43.5338 1 47.3671 0 50.0338V102.034H312V44.5338C312 35.7338 303.667 37.8671 299.5 40.0338C292.167 44.5338 276.3 54.4338 271.5 58.0338C266.7 61.6338 261.833 62.2005 260 62.0338H248C243.2 62.0338 240 60.7005 239 60.0338C237.833 59.2005 233.5 56.0338 225.5 50.0338C217.5 44.0338 210.167 47.2004 207.5 49.5338C204.833 51.8671 197.6 58.0338 190 64.0338C182.4 70.0338 176.833 65.2005 175 62.0338C168.167 48.3671 153.5 19.3338 149.5 12.5338C144.7 6.13377 138.5 9.8671 136 12.5338C130.667 18.3671 118.8 31.3338 114 36.5338C109.2 41.7338 102.667 42.3671 100 42.0338H76C66.5 42.0338 48 56.5338 42 59.0338C37.2 61.0338 32.3333 59.8671 30.5 59.0338C28.6667 58.3671 22.8 55.5338 14 49.5338Z"
              fill="#EFEFEF"
            />
            <path
              d="M14 49.5338C5.2 43.5338 1 47.3671 0 50.0338V102.034H312V44.5338C312 35.7338 303.667 37.8671 299.5 40.0338C292.167 44.5338 276.3 54.4338 271.5 58.0338C266.7 61.6338 261.833 62.2005 260 62.0338H248C243.2 62.0338 240 60.7005 239 60.0338C237.833 59.2005 233.5 56.0338 225.5 50.0338C217.5 44.0338 210.167 47.2004 207.5 49.5338C204.833 51.8671 197.6 58.0338 190 64.0338C182.4 70.0338 176.833 65.2005 175 62.0338C168.167 48.3671 153.5 19.3338 149.5 12.5338C144.7 6.13377 138.5 9.8671 136 12.5338C130.667 18.3671 118.8 31.3338 114 36.5338C109.2 41.7338 102.667 42.3671 100 42.0338H76C66.5 42.0338 48 56.5338 42 59.0338C37.2 61.0338 32.3333 59.8671 30.5 59.0338C28.6667 58.3671 22.8 55.5338 14 49.5338Z"
              fill="black"
              fill-opacity="0.1"
            />
          </svg>
        </ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-appearance-custom-content-with-count">
        <ngx-skeleton-loader appearance="custom-content" count="3">
          <span class="custom-content-item">Custom content</span>
        </ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-color-scheme-light">
        <ngx-skeleton-loader colorScheme="light"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-color-scheme-dark">
        <ngx-skeleton-loader colorScheme="dark"></ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-with-theming">
        <ngx-skeleton-loader appearance="circle" [theme]="{ width: '70px', height: '70px', 'border-radius': '10px' }">
        </ngx-skeleton-loader>
      </div>

      <div class="test-wrapper skeletons-with-provided-config">
        <ngx-skeleton-loader></ngx-skeleton-loader>
      </div>
    </div>
  `,
})
class ContainerComponent {
  animationWithFalsePassedViaBinding: any = false;
  invalidValueInCount: any = 'two';
  invalidAnimation: any = 'invalid-option';
  invalidAppearance: any = 'invalid-appearance';
  invalidSize: any = '1.5.5px';
}

declare module './ngx-skeleton-loader-config.types' {
  interface NgxSkeletonLoaderCustomAnimations {
    'my-wave': true;
    circle: true;
  }
}

describe('NgxSkeletonLoaderComponent', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  beforeEach(() => {
    vi.spyOn(console, 'error').mockReturnValue(undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('When the component uses default configuration', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NgxSkeletonLoaderComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
      }).compileComponents();
      fixture = TestBed.createComponent(ContainerComponent);
      fixture.detectChanges();
    });

    it('should add all relevant WAI-ARIA `aria-` attributes in all ngx-skeleton-loader', () => {
      const totalOfSkeletons = fixture.nativeElement.querySelectorAll('.test-wrapper .skeleton-loader').length;

      expect(fixture.nativeElement.querySelectorAll('[aria-busy="true"]').length).toBe(totalOfSkeletons);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuemin="0"]').length).toBe(totalOfSkeletons);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuemax="100"]').length).toBe(totalOfSkeletons);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuetext]').length).toBe(totalOfSkeletons);
      expect(fixture.nativeElement.querySelectorAll('[role="progressbar"]').length).toBe(totalOfSkeletons);
      expect(fixture.nativeElement.querySelectorAll('[tabindex="-1"]').length).toBe(totalOfSkeletons);
      expect(fixture.nativeElement.querySelectorAll('[aria-label="loading"]').length).toBe(totalOfSkeletons);
    });

    it('should use progress as default animation if `animation` is not passed as component attribute', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .skeleton-loader.progress').length).toBe(1);
    });

    describe('When skeleton is created using default settings', () => {
      it('should render a single skeleton', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .skeleton-loader').length).toBe(1);
      });
    });

    describe('When skeleton is created passing loading text to be used as WAI-ARIA `aria-valuetext`', () => {
      it('should render a single skeleton', () => {
        expect(fixture.nativeElement.querySelectorAll('[aria-valuetext="Loading. Please wait ..."]').length).toBe(1);
      });
    });

    describe('When skeleton is created with count', () => {
      it('should render skeleton based on given count attribute', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-with-count .skeleton-loader').length).toBe(2);
      });
    });

    describe('When skeleton is created with circle appearance', () => {
      it('should add styles based on circle class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-appearance-circle .skeleton-loader.circle').length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created with square appearance', () => {
      it('should add styles based on square class on the skeleton component', () => {
        const skeletonWithMeasureUnit = fixture.nativeElement.querySelector(
          '.skeletons-appearance-square .skeleton-loader.square',
        ).attributes as NamedNodeMap;

        const style = (skeletonWithMeasureUnit.getNamedItem('style') as Attr).value;
        expect(style).toContain('width: 100px');
        expect(style).toContain('height: 100px');
      });

      it('should add width and height styles using `size` and `measureUnit` values on the skeleton component', () => {
        const skeletonWithMeasureUnit = fixture.nativeElement.querySelector(
          '.skeletons-appearance-square-with-measureUnit .skeleton-loader.square',
        ).attributes as NamedNodeMap;

        const style = (skeletonWithMeasureUnit.getNamedItem('style') as Attr).value;
        expect(style).toContain('width: 10%');
        expect(style).toContain('height: 10%');
      });
    });

    describe('When skeleton is created with square appearance and decimal or unit values in `size`', () => {
      const getStyle = (selector: string) =>
        fixture.nativeElement.querySelector(`${selector} .skeleton-loader.square`).getAttribute('style') || '';

      it('should keep decimal values on width and height styles', () => {
        const style = getStyle('.skeletons-appearance-square-with-decimal-size');

        expect(style).toContain('width: 1.5rem');
        expect(style).toContain('height: 1.5rem');
      });

      it('should use the CSS measure unit passed in `size` for width and height styles', () => {
        const style = getStyle('.skeletons-appearance-square-with-unit-in-size');

        expect(style).toContain('width: 10rem');
        expect(style).toContain('height: 10rem');
      });

      it('should prioritize the CSS measure unit passed in `size` over `measureUnit`', () => {
        const style = getStyle('.skeletons-appearance-square-with-unit-in-size-and-measureUnit');

        expect(style).toContain('width: 50%');
        expect(style).toContain('height: 50%');
      });

      it('should NOT add width and height styles if `size` is invalid', () => {
        const style = getStyle('.skeletons-appearance-square-with-invalid-size');

        expect(style).not.toContain('width');
        expect(style).not.toContain('height');
      });
    });

    describe('When skeleton is created with custom-content appearance', () => {
      it('should use the content inside', () => {
        expect(
          fixture.nativeElement.querySelector('.skeletons-appearance-custom-content .skeleton-loader.custom-content')
            .innerHTML.length,
        ).toBeGreaterThan(0);
      });
    });

    describe('When skeleton is created with custom-content appearance and count bigger than 1', () => {
      it('should render a single skeleton with the content inside', () => {
        const skeletons = fixture.nativeElement.querySelectorAll(
          '.skeletons-appearance-custom-content-with-count .skeleton-loader.custom-content',
        );

        expect(skeletons.length).toBe(1);
        expect(skeletons[0].querySelector('.custom-content-item').textContent).toBe('Custom content');
      });

      it('should show an error message in development mode', () => {
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledWith(
          `\`NgxSkeletonLoaderComponent\` enforces elements with "custom-content" appearance as DOM nodes. Forcing "count" to "1".`,
        );
      });
    });

    describe('When skeleton is created without animation', () => {
      it('should NOT add progress animation styles based on animation class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-no-animation .skeleton-loader:not(.animation)')
            .length,
        ).toBe(1);
      });

      it('should NOT add progress animation styles based on animation class if animation value is passed via binding', () => {
        expect(
          fixture.nativeElement.querySelectorAll(
            '.skeletons-animation-no-animation-via-binding .skeleton-loader:not(.animation)',
          ).length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created using `pulse` as animation', () => {
      it('should add pulse animation styles based on animation class on the skeleton components', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-animation-pulse .skeleton-loader.pulse').length).toBe(
          1,
        );
      });
    });

    describe('When skeleton is created using `pulse-dark` as animation', () => {
      it('should add pulse-dark animation styles based on animation class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-pulse-dark .skeleton-loader.pulse-dark').length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created using `progress-dark` as animation', () => {
      it('should add progress-dark animation styles based on animation class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-progress-dark .skeleton-loader.progress-dark')
            .length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created using `progress` as animation', () => {
      it('should add progress animation styles based on animation class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-progress .skeleton-loader.progress').length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created using a custom animation', () => {
      it('should add the custom animation class with `animation-` prefix', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-custom .skeleton-loader.animation-my-wave').length,
        ).toBe(1);
      });

      it('should NOT add built-in animation classes', () => {
        const skeleton = fixture.nativeElement.querySelector('.skeletons-animation-custom .skeleton-loader');

        expect(skeleton.className).toBe('skeleton-loader animation-my-wave');
      });

      it('should NOT collide with internal classes if custom animation has the same name', () => {
        const skeleton = fixture.nativeElement.querySelector(
          '.skeletons-animation-custom-with-internal-class-name .skeleton-loader',
        );

        expect(skeleton.classList.contains('animation-circle')).toBe(true);
        expect(skeleton.classList.contains('circle')).toBe(false);
      });
    });

    describe('When skeleton is created using a built-in animation or without animation', () => {
      it('should NOT add any custom animation class', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults [class*="animation-"]').length).toBe(0);
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-pulse-dark [class*="animation-"]').length,
        ).toBe(0);
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-no-animation [class*="animation-"]').length,
        ).toBe(0);
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-no-animation-via-binding [class*="animation-"]')
            .length,
        ).toBe(0);
      });
    });

    describe('When skeleton is created using default color scheme', () => {
      it('should follow the user color scheme preference, without forcing any color scheme', () => {
        const skeleton = fixture.nativeElement.querySelector('.skeletons-defaults .skeleton-loader');

        expect(skeleton.style.colorScheme).toBe('');
      });
    });

    describe('When skeleton is created forcing a color scheme', () => {
      it('should force light color scheme', () => {
        const skeleton = fixture.nativeElement.querySelector('.skeletons-color-scheme-light .skeleton-loader');

        expect(skeleton.style.colorScheme).toBe('light');
      });

      it('should force dark color scheme', () => {
        const skeleton = fixture.nativeElement.querySelector('.skeletons-color-scheme-dark .skeleton-loader');

        expect(skeleton.style.colorScheme).toBe('dark');
      });
    });

    describe('When skeleton is created with theming', () => {
      it('should render skeleton with styles based on theme attribute', () => {
        const skeletonWithTheming = fixture.nativeElement.querySelector(
          '.skeletons-with-theming .skeleton-loader.circle',
        ).attributes as NamedNodeMap;

        const style = (skeletonWithTheming.getNamedItem('style') as Attr).value;
        expect(style).toEqual('border-radius: 10px; height: 70px; width: 70px;');
      });
    });
  });

  describe('When the application runs in production mode', () => {
    let originalNgDevMode: unknown;

    beforeEach(async () => {
      originalNgDevMode = (globalThis as any).ngDevMode;
      (globalThis as any).ngDevMode = false;

      await TestBed.configureTestingModule({
        imports: [NgxSkeletonLoaderComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
      }).compileComponents();
      fixture = TestBed.createComponent(ContainerComponent);
      fixture.detectChanges();
    });

    afterEach(() => {
      (globalThis as any).ngDevMode = originalNgDevMode;
    });

    it('should render a single skeleton with custom-content appearance even if count is bigger than 1', () => {
      expect(
        fixture.nativeElement.querySelectorAll(
          '.skeletons-appearance-custom-content-with-count .skeleton-loader.custom-content',
        ).length,
      ).toBe(1);
    });

    it('should NOT show an error message', () => {
      // eslint-disable-next-line no-console
      expect(console.error).not.toHaveBeenCalledWith(
        `\`NgxSkeletonLoaderComponent\` enforces elements with "custom-content" appearance as DOM nodes. Forcing "count" to "1".`,
      );
    });
  });

  describe('When `theme` is typed', () => {
    it('should accept the same entries accepted by `[style]` binding', () => {
      const theme: NgxSkeletonLoaderConfigTheme = {
        extendsFromRoot: true,
        width: '70px',
        'border-radius': '10px',
        borderRadius: '10px',
        'height.px': 50,
        '--ngx-skeleton-loader-base-color': 'red',
        background: null,
        color: undefined,
      };

      expect(theme).toBeTruthy();
    });

    it('should NOT accept values which are not valid for `[style]` binding', () => {
      const theme: NgxSkeletonLoaderConfigTheme = {
        // @ts-expect-error CSS values must be strings or numbers
        width: { value: 70, unit: 'px' },
        // @ts-expect-error CSS values must be strings or numbers
        height: ['70px'],
      };

      expect(theme).toBeTruthy();
    });
  });

  describe('When the component receives a different default via module configuration', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [NgxSkeletonLoaderComponent],
        providers: [
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: NGX_SKELETON_LOADER_CONFIG, useValue: { appearance: 'circle', count: 3 } },
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(ContainerComponent);
      fixture.detectChanges();
    });

    it('should render skeleton with the provided config', () => {
      expect(
        fixture.nativeElement.querySelectorAll('.skeletons-with-provided-config .skeleton-loader.circle').length,
      ).toBe(3);
    });
  });
});
