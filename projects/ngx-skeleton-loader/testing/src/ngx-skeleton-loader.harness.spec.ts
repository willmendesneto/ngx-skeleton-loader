import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentHarness, HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

import { NgxSkeletonLoaderHarness } from './ngx-skeleton-loader.harness';

declare module 'ngx-skeleton-loader' {
  interface NgxSkeletonLoaderCustomAnimations {
    'harness-wave': true;
  }
}

@Component({
  selector: 'ngx-harness-container',
  imports: [NgxSkeletonLoaderComponent],
  template: `
    @if (visible()) {
      <div id="defaults"><ngx-skeleton-loader /></div>
      <div id="count"><ngx-skeleton-loader count="3" /></div>
      <div id="circle"><ngx-skeleton-loader appearance="circle" loadingText="Loading profile" /></div>
      <div id="square"><ngx-skeleton-loader appearance="square" animation="pulse" ariaLabel="loading square" /></div>
      <div id="empty-appearance"><ngx-skeleton-loader [appearance]="emptyAppearance" /></div>
      <div id="custom-content">
        <ngx-skeleton-loader appearance="custom-content" count="4"><span>content</span></ngx-skeleton-loader>
      </div>
      <div id="no-animation-attribute"><ngx-skeleton-loader animation="false" /></div>
      <div id="no-animation-binding"><ngx-skeleton-loader [animation]="falseAnimation" /></div>
      <div id="wave"><ngx-skeleton-loader animation="wave" /></div>
      <div id="progress-dark"><ngx-skeleton-loader animation="progress-dark" /></div>
      <div id="pulse-dark"><ngx-skeleton-loader animation="pulse-dark" /></div>
      <div id="custom-animation"><ngx-skeleton-loader animation="harness-wave" /></div>
    }
  `,
})
class ContainerComponent {
  readonly visible = signal(true);
  emptyAppearance: '' = '';
  falseAnimation: false = false;
}

@Component({
  selector: 'ngx-harness-nested',
  imports: [NgxSkeletonLoaderComponent],
  template: `
    <ngx-skeleton-loader appearance="custom-content" animation="wave">
      <ngx-skeleton-loader appearance="circle" count="2" />
    </ngx-skeleton-loader>
  `,
})
class NestedComponent {}

// Parent harness using the skeleton harness, as documented in the README
class ContainerHarness extends ComponentHarness {
  static hostSelector = 'ngx-harness-container';

  private readonly skeleton = this.locatorForOptional(NgxSkeletonLoaderHarness);

  async isLoading(): Promise<boolean> {
    return (await this.skeleton()) !== null;
  }
}

describe('NgxSkeletonLoaderHarness', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  let loader: HarnessLoader;

  const find = (id: string) =>
    TestbedHarnessEnvironment.loader(fixture)
      .getChildLoader(`#${id}`)
      .then((childLoader) => childLoader.getHarness(NgxSkeletonLoaderHarness));

  beforeEach(() => {
    // `custom-content` with `count` > 1 logs an error in development
    vi.spyOn(console, 'error').mockReturnValue(undefined);
    fixture = TestBed.createComponent(ContainerComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should find every skeleton loader', async () => {
    expect((await loader.getAllHarnesses(NgxSkeletonLoaderHarness)).length).toBe(12);
  });

  describe('getItemCount()', () => {
    it('should return 1 by default', async () => {
      expect(await (await find('defaults')).getItemCount()).toBe(1);
    });

    it('should return the rendered count', async () => {
      expect(await (await find('count')).getItemCount()).toBe(3);
    });

    it('should return 1 for custom-content, since the component forces it', async () => {
      expect(await (await find('custom-content')).getItemCount()).toBe(1);
    });
  });

  describe('getAppearance()', () => {
    it.each([
      ['defaults', 'line'],
      ['circle', 'circle'],
      ['square', 'square'],
      ['empty-appearance', 'line'],
      ['custom-content', 'custom-content'],
    ])('should return the appearance of #%s', async (id, appearance) => {
      expect(await (await find(id)).getAppearance()).toBe(appearance);
    });
  });

  describe('getAnimation()', () => {
    it.each([
      ['defaults', 'progress'],
      ['square', 'pulse'],
      ['wave', 'wave'],
      ['progress-dark', 'progress-dark'],
      ['pulse-dark', 'pulse-dark'],
      ['custom-animation', 'harness-wave'],
      ['no-animation-attribute', false],
      ['no-animation-binding', false],
    ])('should return the animation of #%s', async (id, animation) => {
      expect(await (await find(id)).getAnimation()).toBe(animation);
    });
  });

  describe('getLoadingText()', () => {
    it('should return the default loading text', async () => {
      expect(await (await find('defaults')).getLoadingText()).toBe('Loading...');
    });

    it('should return the custom loading text', async () => {
      expect(await (await find('circle')).getLoadingText()).toBe('Loading profile');
    });
  });

  describe('getAriaLabel()', () => {
    it('should return the default ARIA label', async () => {
      expect(await (await find('defaults')).getAriaLabel()).toBe('loading');
    });

    it('should return the custom ARIA label', async () => {
      expect(await (await find('square')).getAriaLabel()).toBe('loading square');
    });
  });

  describe('with()', () => {
    describe('appearance', () => {
      it('should match', async () => {
        const circles = await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ appearance: 'circle' }));

        expect(circles.length).toBe(1);
        expect(await circles[0].getLoadingText()).toBe('Loading profile');
      });

      it('should match `line` for the default and empty appearances', async () => {
        expect(
          (await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ appearance: 'line' }))).length,
        ).toBe(9);
      });

      it('should not match', async () => {
        expect(
          await loader.hasHarness(NgxSkeletonLoaderHarness.with({ appearance: 'square', loadingText: 'Loading...' })),
        ).toBe(true);
        expect(
          await loader.hasHarness(NgxSkeletonLoaderHarness.with({ appearance: 'circle', loadingText: 'Loading...' })),
        ).toBe(false);
      });
    });

    describe('animation', () => {
      it('should match a built-in animation', async () => {
        const harnesses = await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ animation: 'pulse' }));

        expect(harnesses.length).toBe(1);
        expect(await harnesses[0].getAppearance()).toBe('square');
      });

      it('should match a custom animation', async () => {
        const harness = await loader.getHarness(NgxSkeletonLoaderHarness.with({ animation: 'harness-wave' }));

        expect(await harness.getAnimation()).toBe('harness-wave');
      });

      it('should match `false`', async () => {
        expect(
          (await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ animation: false }))).length,
        ).toBe(2);
      });

      it('should treat `"false"` as `false`', async () => {
        expect(
          (await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ animation: 'false' }))).length,
        ).toBe(2);
      });

      it('should not match', async () => {
        expect(await loader.hasHarness(NgxSkeletonLoaderHarness.with({ animation: 'pulse-dark' }))).toBe(true);
        expect(await loader.hasHarness(NgxSkeletonLoaderHarness.with({ animation: 'wave', appearance: 'circle' }))).toBe(
          false,
        );
      });
    });

    describe('loadingText', () => {
      it('should match a string', async () => {
        const harnesses = await loader.getAllHarnesses(NgxSkeletonLoaderHarness.with({ loadingText: 'Loading...' }));

        expect(harnesses.length).toBe(11);
      });

      it('should match a RegExp', async () => {
        const harness = await loader.getHarness(NgxSkeletonLoaderHarness.with({ loadingText: /PROFILE/i }));

        expect(await harness.getAppearance()).toBe('circle');
      });

      it('should not match a string', async () => {
        expect(await loader.hasHarness(NgxSkeletonLoaderHarness.with({ loadingText: 'Loading' }))).toBe(false);
      });

      it('should not match a RegExp', async () => {
        expect(await loader.hasHarness(NgxSkeletonLoaderHarness.with({ loadingText: /^profile/ }))).toBe(false);
      });
    });

    it('should combine filters', async () => {
      const harness = await loader.getHarness(
        NgxSkeletonLoaderHarness.with({ appearance: 'circle', animation: 'progress', loadingText: /profile/ }),
      );

      expect(await harness.getItemCount()).toBe(1);
    });

    it('should support the `selector` base filter', async () => {
      const harness = await loader.getHarness(NgxSkeletonLoaderHarness.with({ selector: '#wave *' }));

      expect(await harness.getAnimation()).toBe('wave');
    });
  });

  describe('presence', () => {
    it('should report when the skeleton is removed', async () => {
      expect(await loader.hasHarness(NgxSkeletonLoaderHarness)).toBe(true);

      fixture.componentInstance.visible.set(false);

      expect(await loader.hasHarness(NgxSkeletonLoaderHarness)).toBe(false);
    });

    it('should work inside a parent harness', async () => {
      const container = await TestbedHarnessEnvironment.harnessForFixture(fixture, ContainerHarness);
      expect(await container.isLoading()).toBe(true);

      fixture.componentInstance.visible.set(false);
      expect(await container.isLoading()).toBe(false);
    });
  });

  describe('nested skeletons', () => {
    it('should only read the items of its own skeleton', async () => {
      const nestedFixture = TestBed.createComponent(NestedComponent);
      const nestedLoader = TestbedHarnessEnvironment.loader(nestedFixture);
      const [outer, inner] = await nestedLoader.getAllHarnesses(NgxSkeletonLoaderHarness);

      expect(await outer.getItemCount()).toBe(1);
      expect(await outer.getAppearance()).toBe('custom-content');
      expect(await outer.getAnimation()).toBe('wave');
      expect(await inner.getItemCount()).toBe(2);
      expect(await inner.getAppearance()).toBe('circle');
    });
  });
});
