# NGX Skeleton loader

[![npm downloads](https://img.shields.io/npm/dm/ngx-skeleton-loader.svg)](https://npmjs.org/ngx-skeleton-loader)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-skeleton-loader-sample)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-skeleton-loader-user-card-component-sample)

[![NPM](https://nodei.co/npm/ngx-skeleton-loader.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-skeleton-loader)
[![NPM](https://nodei.co/npm-dl/ngx-skeleton-loader.png?height=3&months=3)](https://npmjs.org/ngx-skeleton-loader)

[![Build Status](https://circleci.com/gh/willmendesneto/ngx-skeleton-loader.svg?style=shield)](https://circleci.com/gh/willmendesneto/ngx-skeleton-loader)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-skeleton-loader/badge.svg?branch=main)](https://coveralls.io/r/willmendesneto/ngx-skeleton-loader?branch=main)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-skeleton-loader.svg)](https://bundlephobia.com/result?p=ngx-skeleton-loader)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

![ngx-skeleton-loader in action](https://user-images.githubusercontent.com/1252570/50053778-d4e0d900-018e-11e9-9de7-fad6f9fddd9e.gif)

## Why skeletons?

> If you want to get more details about that, please read ["NGX-Skeleton-Loader — States, Animations, Performance, and Accessibility for your Angular App"](https://willmendesneto.com/posts/ngx-skeleton-loader-states-animations-performance-and-accessibility-for-your-angular-app) blog post

The idea of this component is make the process transparent and easier. So the main point is integrate this component with other tooling process, such as:

- Server-side rendering;
- Progressive rendering;
- Any other that you like :)

It's totally transparent for you and you can integrate easier in your application, improving your user experience 🎉

- [Demo](#demo)
- [Install](#install)
- [Setup](#setup)
- [Development](#development)
- [Contribute](#contribute)

## Demo

Try out our demos on Stackblitz!

- [Usage: animations, appearance, and themes](https://ngx-skeleton-loader-sample.stackblitz.io)
- [User Card Component Loading simulation using NGX Skeleton Loader](https://ngx-skeleton-loader-user-card-component-sample.stackblitz.io)

## Install

You can get it on NPM installing `ngx-skeleton-loader` module as a project dependency.

```shell
npm install ngx-skeleton-loader --save
```

## Setup

## Standalone Setup

Add `ngx-skeleton-loader` to your application's `app.config.ts` providers.

```typescript
// app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxSkeletonLoader({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),
  ]
};
```

After that, you can use the `ngx-skeleton-loader` component in your templates. Optionally you can pass configuration data into the component itself

- `ngx-skeleton-loader`: Handle the skeleton animation and the skeleton styles of your app;

```html
<div class="item">
  <ngx-skeleton-loader count="5" appearance="circle" />
</div>
```

## NgModule Setup

You'll need to add `NgxSkeletonLoaderModule` to your application module. So that, the `<ngx-skeleton-loader>` components will be accessible in your application.

```typescript
...
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
...

@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    ...
    NgxSkeletonLoaderModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

After that, you can use the `ngx-skeleton-loader` components in your templates, passing the configuration data into the component itself.

- `ngx-skeleton-loader`: Handle the skeleton animation and the skeleton styles of your app;

```html
<div class="item">
  <ngx-skeleton-loader count="5" appearance="circle" />
</div>
<div class="item">
  <!-- It will use `px` as default CSS measure unit -->
  <ngx-skeleton-loader count="5" appearance="square" size="100" />
</div>
```

### Using `NgxSkeletonLoaderModule.forRoot()`

Also, you can import the module in your app by calling `NgxSkeletonLoaderModule.forRoot()` when adding it. So it will be available across your Angular application.

Importing the module this way also allows you to globally configure the default values for the `ngx-skeleton-loader` components in your application, in case you need some different default values for your app.

```typescript
...
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
...

@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    ...
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

```html
<div class="item">
  <ngx-skeleton-loader count="5" appearance="circle" />
  <!-- above line will produce the rendering of 5 circles with the pulse animation and the aria-valuetext attribute set with "This item is actually loading...", since it was 
  configured via `NgxSkeletonLoaderModule.forRoot()`-->

  <!-- It will render a component with `aria-valuetext` attribute set with `Loading section content`, 
   since it was passed directly via input attribute `loadingText` -->
  <ngx-skeleton-loader count="5" loadingText="Loading section content" />
</div>
```

#### Extending `theme` via `NgxSkeletonLoaderModule.forRoot()`

> By default when using `NgxSkeletonLoaderModule.forRoot({ theme: /* ...list of CSS atributes */} })` the application is using this value as source of truth, overriding any local theming passed to `<ngx-skeleton-loader>` component via `[theme]` input. Check these steps in case you need to change this behaviour in your app

This method is also accepting the option of having a global theme and local theme inputs. You can enable it by passing `NgxSkeletonLoaderModule.forRoot({ theme: { extendsFromRoot: true, /* ...list of CSS atributes */} })` in your module. Quite simple, right? 😄

By using that configuration in your application, you should also be aware that:

- By default, every `<ngx-skeleton-loader>` component will use `theme` coming from `NgxSkeletonLoaderModule.forRoot()` as the source of truth
- If there's any CSS attribute on the component locally which overrides the CSS spec, it combines both themes, but overriding global CSS attributes in favor of local ones.

As an example:

```typescript
...
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
...

@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    ...
    NgxSkeletonLoaderModule.forRoot({
      theme: {
        // Enabliong theme combination
        extendsFromRoot: true,
        // ... list of CSS theme attributes
        height: '30px',
      },
    }),
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

```html
<div class="item">
  <ngx-skeleton-loader />
  <!-- above line will produce a skeleton component using `height: 30px;`" -->
  <ngx-skeleton-loader [theme]="{background: 'blue'}" />
  <!-- above line will produce a skeleton component using `height: 30px; background: blue;`" -->
  <ngx-skeleton-loader [theme]="{height: '50px', background: 'red'}" />
  <!-- above line will produce a skeleton component using `height: 50px; background: red;`" -->
</div>
```

## Angular 17+ Deferrable Views example

```html
<div class="item">
  @defer {
    <my-item-view />
  } @placeholder (minimum 1000ms) {
    <ngx-skeleton-loader />
  }
</div>
```


## Layout

`<ngx-skeleton-loader>` is rendered as a block element (`display: block`), taking the full width of its container. To render skeletons side by side (e.g. an avatar next to a title), use a flex or grid container:

```html
<div style="display: flex; gap: 10px; align-items: center">
  <ngx-skeleton-loader appearance="circle" />
  <ngx-skeleton-loader width="200" />
</div>
```

## WAI-ARIA values

- loadingText - _default_ `Loading...`: attribute that defines the text value for `aria-valuetext` attribute. Defaults to "Loading..."
- `aria-label` - _default_ `loading`: you can add `ariaLabel` as input of the component to set a different value.

WAI-ARIA attributes (`role="progressbar"`, `aria-busy`, `aria-valuemin`, `aria-valuemax`, `aria-label` and `aria-valuetext`) are applied once in the `<ngx-skeleton-loader>` element, so screen readers announce a single progress bar per component - regardless of `count`. The skeleton items inside of it are hidden from assistive technologies via `aria-hidden="true"`.

## Appearance

You can also define which appearance want to use in your skeleton loader by passing the options in your component via `[appearance]` attribute.

### Options

- `''` - _default_: it will use it `''` as appearance. At the end, it will render like a line;
- `line`: it will render like a line. This is the same behavior as passing an empty string;
- `circle`: it will use `circle` as appearance. Great for avatar skeletons, for example :);
- `square`: it will use `square` as appearance and render it appropriately. Great for cards and images, for example; It also requires `size` to be passed through the component - `size` has default size of `40px` and it has `measureUnit` as optional way to change default CSS measure unit from `px` to one of the valid options: `px`, `em`, `rem`, `%`, `vh`, `vw`
- `custom-content`: it will NOT add any appearance. Great for custom content, such as SVG, internal components and such. Although not rendering appearance, animation will be added unless component has `animation="false"` prop;

### Appearance props (specific for `square`)

When setting `square` as appearance, your component can also use these other input attributes to configure it properly
- `size` - default _40_: number to be passed as definition for `width` and `height`. If not passed, it defaults to `40`. It accepts decimal values (e.g. `1.5`) and also a CSS measure unit as suffix (e.g. `10rem`), which takes precedence over `measureUnit`
- `measureUnit` - default _px_: CSS measure unit to be used for `width` and `height`. If not passed, it defaults to `px`. Valid options: `px`, `em`, `rem`, `%`, `vh`, `vw`

## Animations

You can also define which CSS animation you want to use - even not use any, if it's the case - in your skeleton loader by passing the options in your component via `[animation]` attribute.

### Options

- `"false"` (as string): it will disable the animation;
- `false` (as boolean): it will disable the animation. Animation will receive `false` as string when attribute field it's not using binding. Component now can receive `false` (boolean), "false" (string), or any other animation type via binding;
- `progress` - _default_: it will use it `progress` as animation;
- `progress-dark`: it will use it `progress-dark` as animation. Recommended if your color schema is darken;
- `pulse`: it will use `pulse` as animation;
- `pulse-dark`: it will use `pulse-dark` as animation. Recommended if your color schema is darken;
- `wave`: it will use `wave` as animation. Similar to `progress`, but with an oblique shimmer;

> `progress` is the default animation, used as the single one previously. If you don't pass the animation attribute, it defaults to `progress`.

```html
<!--
If you need to change all the background wrapper
you need to apply the style changes on the 
`ngx-skeleton-loader` component wrapper
-->
<div class="item">
  <!-- Disables the animation -->
  <ngx-skeleton-loader animation="false" />
  <!-- Disables the animation, but receiving boolean value from binding -->
  <!-- Via binding it can receive `false` (boolean), "false" (string), or any other animation type -->
  <ngx-skeleton-loader [animation]="classAttributeWithBooleanFalseValue" />
  <!-- Uses `progress` as animation -->
  <ngx-skeleton-loader animation="progress" />
  <ngx-skeleton-loader />
  <!-- Uses `pulse` as animation -->
  <ngx-skeleton-loader animation="pulse" />
  <!-- Uses `wave` as animation -->
  <ngx-skeleton-loader animation="wave" />
</div>
```

> You can check the code details in the [Stackblitz Live Demo Link](https://stackblitz.com/edit/ngx-skeleton-loader-sample?file=app%2Fapp.component.html)

### Custom animations

You can also create your own animations. These are the steps:

1. Register your animation name via TypeScript declaration merging, extending `NgxSkeletonLoaderCustomAnimations` interface. The file needs to be a module - that's why it has the `import` statement - otherwise it will replace the module types instead of extending them

```ts
// file: `src/ngx-skeleton-loader.d.ts`
import 'ngx-skeleton-loader';

declare module 'ngx-skeleton-loader' {
  interface NgxSkeletonLoaderCustomAnimations {
    'my-wave': true;
  }
}
```

2. Add your animation styles in a **global stylesheet** (e.g. `styles.css`). The skeleton will receive your animation name as CSS class with `animation-` prefix - in this case, `animation-my-wave`. The prefix avoids collisions with `ngx-skeleton-loader` internal classes, such as `circle` or `progress`

```css
/* file: `styles.css` */
.skeleton-loader.animation-my-wave {
  will-change: opacity;
  animation: my-wave 1.5s ease-in-out infinite;
}

@keyframes my-wave {
  50% {
    opacity: 0.5;
  }
}
```

3. Use it as any other animation

```html
<ngx-skeleton-loader animation="my-wave" />
```

```ts
provideNgxSkeletonLoader({ animation: 'my-wave' });
```

Some details to be aware of:

- **Type checking**: invalid animation names raise a TypeScript error (e.g. `Type '"my-wavee"' is not assignable to type ... Did you mean '"my-wave"'?`). In templates, static attributes such as `animation="my-wave"` are checked only when `strictTemplates` is enabled in your `tsconfig.json` - which is the default for new Angular projects
- **Global styles**: since component styles are encapsulated by Angular, your animation styles need to be added in a global stylesheet or via `::ng-deep`. Styles added in your component stylesheet won't reach the skeleton
- **Reduced motion**: custom animations - including the ones applied to `::before` and `::after` pseudo-elements - are disabled automatically when the user enabled the `Reduce Motion` option via operational system and/or browser, as it happens with the built-in animations

## Theming

You can also define different styles for the skeleton loader by passing an object with the css styles - in dashed case - into the component via `[theme]` attribute.

```html
<!--
If you need to change all the background wrapper
you need to apply the style changes on the 
`ngx-skeleton-loader` component wrapper
-->

<div style="background: #FF0001; padding: 10px;">
  <ngx-skeleton-loader
    count="5"
    [theme]="{ 
      'border-radius': '5px',
      height: '50px',
      'background-color': '#992929',
      border: '1px solid white'
    }"
  />
</div>
```

The [theme] attribute now accepts the same configuration as `[style]` as well. That means you can manage to use like you're doing with the built-in directive, having a pleasure and beautiful experience

```html
<!--
Note that we are using a combination of styles and [style] inside theme object,
having `height.px` receiving a number and `background-color` receiving a HEX Color
-->
<div style="background: #FF0001; padding: 10px;">
  <ngx-skeleton-loader
    count="5"
    [theme]="{ 
      'height.px': 50,
      'background-color': '#992929'
    }"
  />
</div>
```

### `width`, `height` and `borderRadius` shortcuts

For the most common theming cases, you can use `width`, `height` and `borderRadius` attributes instead of `[theme]`. They accept the same values as `size` - numbers (e.g. `100`), decimals (e.g. `1.5`) or values with CSS measure unit (e.g. `50%`, `10rem`) - and values without unit use `measureUnit` (`px` by default). They override the same styles passed via `[theme]`.

```html
<!-- Same as [theme]="{ width: '100px', height: '20px', 'border-radius': '8px' }" -->
<ngx-skeleton-loader width="100" height="20" borderRadius="8" />
<!-- Using CSS measure units -->
<ngx-skeleton-loader width="50%" height="1.5" measureUnit="rem" />
```

> For `square` appearance, `size` takes precedence over `width` and `height`.

### Theming via CSS custom properties

You can also customize skeletons via CSS custom properties (CSS variables). They can be set in any ancestor element - such as `:root`, `body`, a wrapper element in your component stylesheet - or directly via `[theme]` attribute, and they are inherited by every `<ngx-skeleton-loader>` inside of it.

| CSS custom property | Default value | Description |
| --- | --- | --- |
| `--ngx-skeleton-loader-color-scheme` | `light dark` | Color scheme used by the skeleton. `light dark` follows the user's preference. Use `light` or `dark` to force it. See [Color scheme (dark mode)](#color-scheme-dark-mode) |
| `--ngx-skeleton-loader-base-color` | `light-dark(rgb(239, 241, 246), rgb(48, 52, 61))` | Skeleton background color |
| `--ngx-skeleton-loader-light-mode-color` | `light-dark(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1))` | Shimmer color used by `progress` animation |
| `--ngx-skeleton-loader-light-mode-color-to` | `rgba(255, 255, 255, 0)` | Shimmer edges color used by `progress` animation |
| `--ngx-skeleton-loader-dark-mode-color` | `rgba(0, 0, 0, 0.2)` | Shimmer color used by `progress-dark` animation and background color used by `pulse-dark` animation |
| `--ngx-skeleton-loader-dark-mode-color-to` | `transparent` | Shimmer edges color used by `progress-dark` animation |
| `--ngx-skeleton-loader-animation-duration` | `2s` | Duration of the animations |
| `--ngx-skeleton-loader-background-image-light-mode` | gradient based on `light-mode` colors | Full shimmer `background-image` used by `progress` animation |
| `--ngx-skeleton-loader-background-image-dark-mode` | gradient based on `dark-mode` colors | Full shimmer `background-image` used by `progress-dark` animation |

```css
/* file: `styles.css` - applying it globally */
:root {
  --ngx-skeleton-loader-base-color: rgb(224, 231, 255);
  --ngx-skeleton-loader-light-mode-color: rgba(99, 102, 241, 0.25);
  --ngx-skeleton-loader-animation-duration: 1s;
}
```

```css
/* file: `my-component.component.css` - applying it only for skeletons inside of `.my-wrapper` element */
.my-wrapper {
  --ngx-skeleton-loader-base-color: rgb(224, 231, 255);
}
```

```html
<!-- applying it to a specific skeleton via `[theme]` attribute -->
<ngx-skeleton-loader [theme]="{ '--ngx-skeleton-loader-base-color': 'rgb(224, 231, 255)' }" />
```

### Color scheme (dark mode)

Skeletons follow the user's color scheme preference (OS and/or browser) by default, switching their default colors to dark mode automatically. You can force a specific color scheme via `colorScheme` - as component attribute or via `provideNgxSkeletonLoader()`/`NgxSkeletonLoaderModule.forRoot()` config - or via `--ngx-skeleton-loader-color-scheme` CSS custom property.

- `auto` - _default_: follows the user's color scheme preference;
- `light`: forces light color scheme;
- `dark`: forces dark color scheme;

```html
<!-- Follows the user's color scheme preference -->
<ngx-skeleton-loader />
<!-- Forces light color scheme -->
<ngx-skeleton-loader colorScheme="light" />
<!-- Forces dark color scheme -->
<ngx-skeleton-loader colorScheme="dark" />
```

```ts
// Forcing light color scheme for every skeleton
provideNgxSkeletonLoader({ colorScheme: 'light' });
```

```css
/* Forcing light color scheme for every skeleton via CSS */
:root {
  --ngx-skeleton-loader-color-scheme: light;
}
```

> If your application has its own theme switcher - instead of following the user's preference - force the color scheme based on your application theme, otherwise the skeletons will keep following the user's preference.

CSS custom properties are applied in both color schemes. You can use [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) to define different values per color scheme:

```css
:root {
  --ngx-skeleton-loader-base-color: light-dark(rgb(254, 243, 199), rgb(120, 53, 15));
}
```

### ⚠️ This is here only as a documentation, but it's not encouraged to be used. Please consider use it with caution ⚠️

Also, you can use CSS to add theme styles into your component. However, there are some implications:

- You're using `:host` in your stylesheet, which means **you are aware of any possible problem `:host` can create for your app at that level since it's based on [`:host` DOM style scoping](https://developer.mozilla.org/en-US/docs/Web/CSS/:host)**
- You're adding stylesheet based on `<ngx-skeleton-loader>` internal classes. It means that **class naming changes on module's side will be breaking changes for your application as well**.

As an example, your Component file is like this

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'my-ngx-skeleton-loader-with-theming',
  templateUrl: './my-ngx-skeleton-loader-with-theming.component.html',
  styleUrls: ['./my-ngx-skeleton-loader-with-theming.component.css'],
})
export class MyNGXSkeletonLoaderWithThemingComponent {
  /* ... code goes here*/
}
```

And your component HTML code is

```html
<!--
file: my-ngx-skeleton-loader-with-theming.component.html

As an example, it's not using themes via [theme] attributes.
-->

<ngx-skeleton-loader count="5" animation="pulse" />
```

You can apply theme changes in our stylesheet. At the end it will be

```css
/* file: `my-ngx-skeleton-loader-with-theming.component.css`
 *
 * You can find more details about `:host` at
 * Angular Component Style Docs https://angular.io/guide/component-styles#host
 */
:host >>> ngx-skeleton-loader .skeleton-loader {
  border-radius: 5px;
  height: 50px;
  background-color: #992929;
  border: 1px solid white;
}
```

> You should change the styles on the skeleton wrapper element in case you need to change the background color. You can check the code details in the [Stackblitz Live Demo Link](https://stackblitz.com/edit/ngx-skeleton-loader-sample?file=app%2Fapp.component.html) or check it out a content load simulation [in this Stackblitz Live Demo Link](https://stackblitz.com/edit/ngx-skeleton-loader-user-card-component-sample?file=app%2Fapp.component.html)

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `npx np <patch|minor|major> --no-yarn --no-cleanup --contents=dist/ngx-skeleton-loader`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-skeleton-loader/blob/main/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-skeleton-loader/blob/main/CODE_OF_CONDUCT.md) and [PUBLISHING_HOTFIX.md](https://github.com/willmendesneto/ngx-skeleton-loader/blob/main/PUBLISHING_HOTFIX.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <https://instagram.com/willmendesneto>
- <http://github.com/willmendesneto>
