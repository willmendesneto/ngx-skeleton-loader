import { BaseHarnessFilters, ComponentHarness, HarnessPredicate } from '@angular/cdk/testing';
import type { NgxSkeletonLoaderConfig } from 'ngx-skeleton-loader';

type NgxSkeletonLoaderHarnessAppearance = 'line' | 'circle' | 'square' | 'custom-content';
type NgxSkeletonLoaderHarnessAnimation = NgxSkeletonLoaderConfig['animation'];

/** A set of criteria that can be used to filter a list of `NgxSkeletonLoaderHarness` instances */
export interface NgxSkeletonLoaderHarnessFilters extends BaseHarnessFilters {
  /** Only find instances rendered with the given appearance (`'line'` includes the `''` appearance) */
  appearance?: NgxSkeletonLoaderHarnessAppearance;
  /** Only find instances rendered with the given animation (`'false'` is the same as `false`) */
  animation?: NgxSkeletonLoaderHarnessAnimation;
  /** Only find instances whose loading text (`aria-valuetext`) matches the given value */
  loadingText?: string | RegExp;
}

const APPEARANCES = ['circle', 'square', 'custom-content'] as const;
const BUILT_IN_ANIMATIONS = /^(wave|(progress|pulse)(-dark)?)$/;
const CUSTOM_ANIMATION_PREFIX = 'animation-';

/** Harness for interacting with `<ngx-skeleton-loader>` in tests. It reports the resolved values rendered in the DOM */
export class NgxSkeletonLoaderHarness extends ComponentHarness {
  static hostSelector = 'ngx-skeleton-loader';

  // `:scope >` ignores skeletons nested via `custom-content`
  private readonly items = this.locatorForAll(':scope > .skeleton-loader');

  /** Gets a `HarnessPredicate` that can be used to search for a skeleton loader with specific attributes */
  static with(options: NgxSkeletonLoaderHarnessFilters = {}): HarnessPredicate<NgxSkeletonLoaderHarness> {
    return new HarnessPredicate(NgxSkeletonLoaderHarness, options)
      .addOption('appearance', options.appearance, async (harness, appearance) => {
        return (await harness.getAppearance()) === appearance;
      })
      .addOption('animation', options.animation, async (harness, animation) => {
        return (await harness.getAnimation()) === (animation === 'false' ? false : animation);
      })
      .addOption('loadingText', options.loadingText, (harness, loadingText) =>
        HarnessPredicate.stringMatches(harness.getLoadingText(), loadingText),
      );
  }

  /** Gets the number of rendered skeleton items. `custom-content` always renders one */
  async getItemCount(): Promise<number> {
    return (await this.items()).length;
  }

  /** Gets the appearance. It is `'line'` when no appearance class is rendered */
  async getAppearance(): Promise<NgxSkeletonLoaderHarnessAppearance> {
    const [item] = await this.items();

    for (const appearance of APPEARANCES) {
      if (await item.hasClass(appearance)) {
        return appearance;
      }
    }

    return 'line';
  }

  /** Gets the animation name, without the `animation-` prefix of custom animations. It is `false` when there is no animation */
  async getAnimation(): Promise<NgxSkeletonLoaderHarnessAnimation> {
    const [item] = await this.items();
    const classes = ((await item.getAttribute('class')) ?? '').split(/\s+/);

    for (const className of classes) {
      if (BUILT_IN_ANIMATIONS.test(className)) {
        return className as NgxSkeletonLoaderHarnessAnimation;
      }
      if (className.startsWith(CUSTOM_ANIMATION_PREFIX)) {
        return className.slice(CUSTOM_ANIMATION_PREFIX.length) as NgxSkeletonLoaderHarnessAnimation;
      }
    }

    return false;
  }

  /** Gets the loading text (`aria-valuetext` of the host) */
  async getLoadingText(): Promise<string | null> {
    return (await this.host()).getAttribute('aria-valuetext');
  }

  /** Gets the ARIA label (`aria-label` of the host) */
  async getAriaLabel(): Promise<string | null> {
    return (await this.host()).getAttribute('aria-label');
  }
}
