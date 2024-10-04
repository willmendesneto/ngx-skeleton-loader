import {
  Component,
  isDevMode,
  ChangeDetectionStrategy,
  input,
  inject,
  numberAttribute,
  computed,
} from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import {
  NgxSkeletonLoaderConfig,
  NgxSkeletonLoaderConfigTheme,
  NGX_SKELETON_LOADER_CONFIG,
} from './ngx-skeleton-loader-config.types';

/**
 * The `NgxSkeletonLoaderComponent` is a standalone Angular component that provides a skeleton
 * loader UI element.
 * It can be used to display a loading state before the actual content is available.
 * The component can be configured with various options such as the number of elements, appearance,
 * animation, and theme.
 */
@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
  imports: [NgClass, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NgxSkeletonLoaderComponent {
  /**
   * Injects the `NgxSkeletonLoaderConfig` configuration object, which is optional.
   * This configuration object provides various options for customizing the behavior
   * and appearance of the `NgxSkeletonLoaderComponent`.
   */
  readonly #config = inject<NgxSkeletonLoaderConfig>(NGX_SKELETON_LOADER_CONFIG, { optional: true});
  /**
   * The `count` property is an input that determines the number of skeleton loader elements
   * to display.
   * It is initialized with the value from the `NgxSkeletonLoaderConfig` object, or 1 if the config
   * is not provided.
   * The `transform: numberAttribute` option ensures that the input value is converted to a number.
   */
  readonly count = input(this.#config?.count || 1, { transform: numberAttribute });
  /**
   * The `loadingText` property is an input that determines the text to display while the content
   * is loading.
   * It is initialized with the value from the `NgxSkeletonLoaderConfig` object, or 'Loading...'
   * if the config is not provided.
   */
  readonly loadingText = input<NgxSkeletonLoaderConfig['loadingText']>(this.#config?.loadingText || 'Loading...');
  /**
   * The `appearance` property is an input that determines the visual appearance of the skeleton
   * loader.
   * It is initialized with the value from the `NgxSkeletonLoaderConfig` object, or 'line' if the
   * config is not provided.
   * The available appearance options are defined in the `NgxSkeletonLoaderConfig['appearance']`
   * type.
   */
  readonly appearance = input<NgxSkeletonLoaderConfig['appearance']>(this.#config?.appearance || 'line');
  /**
   * The `animation` property is an input that determines the type of animation to apply to the
   * skeleton loader.
   * It is initialized with the value from the `NgxSkeletonLoaderConfig` object, or 'progress' if
   * the config is not provided.
   * The available animation options are defined in the `NgxSkeletonLoaderConfig['animation']` type.
   */
  readonly animation = input<NgxSkeletonLoaderConfig['animation']>(this.#config?.animation || 'progress');
  /**
   * The `ariaLabel` property is an input that determines the ARIA label to be used for the skeleton
   * loader element. This is useful for providing accessibility information to screen readers.
   * It is initialized with the value from the `NgxSkeletonLoaderConfig` object, or 'loading' if the
   * config is not provided.
   */
  readonly ariaLabel = input<NgxSkeletonLoaderConfig['ariaLabel']>(this.#config?.ariaLabel || 'loading');
  /**
   * The `theme` property is an input that determines the theme configuration for the skeleton
   * loader.
   * It is initialized with the value from the `NgxSkeletonLoaderConfig` object, or `null` if the
   * config is not provided.
   * The theme configuration is defined by the `NgxSkeletonLoaderConfigTheme` type, which allows
   * customizing various aspects of the skeleton loader's appearance, such as colors, animation,
   * etc.
   */
  readonly theme = input<NgxSkeletonLoaderConfigTheme>(this.#config?.theme || null);
  /**
   * The `items` property is a computed property that generates an array of indices based on the
   * `count` input.
   * If the `appearance` is set to 'custom-content', the `count` is forced to 1 to ensure that the
   * skeleton loader is displayed as a single DOM node, as required by the 'custom-content'
   * appearance.
   * This computed property is used to render the appropriate number of skeleton loader elements.
   */
  readonly items = computed(() => {
    let count = this.count() || 1;
    // Force count to 1 when custom-content is used
    if (this.appearance() === 'custom-content') {
      // Shows error message only in Development
      if (isDevMode() && count !== 1) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` enforces elements with "custom-content" appearance as DOM nodes. Forcing "count" to "1".`,
        );
        count = 1;
      }
    }
    return [...Array(count)].map((_, index) => index);
  });
  /**
   * A computed property that returns the final theme configuration for the skeleton loader.
   * If the `extendsFromRoot` property is set in the `NgxSkeletonLoaderConfig`, the theme is merged
   * with the root theme configuration. Otherwise, the theme is returned as-is.
   * This allows the skeleton loader to inherit global theme settings while still allowing for
   * component-specific theme customization.
   */
  readonly styles = computed(() => {
    const theme = this.theme();
    if (this.#config?.theme?.extendsFromRoot) {
      return {
        ...this.#config?.theme,
        ...theme,
      };
    }
    return theme;
  });
}
