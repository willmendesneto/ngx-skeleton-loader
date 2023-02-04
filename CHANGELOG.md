# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

## [7.0.0][] - 2023-02-04

### Added

- Adding support for extending global theme added via `NgxSkeletonLoaderModule.forRoot({ theme: /* ...list of CSS atributes */} })`

By default when using `NgxSkeletonLoaderModule.forRoot({ theme: /* ...list of CSS atributes */} })` the application is using this value as source of truth, overriding any local theming passed to `<ngx-skeleton-loader>` component via `[theme]` input.

By using `NgxSkeletonLoaderModule.forRoot({ theme: { extendsFromRoot: true, /* ...list of CSS atributes */} })` in your application, you should also be aware that:

- By default, every `<ngx-skeleton-loader>` component will use `theme` coming from `NgxSkeletonLoaderModule.forRoot()` as the source of truth
- If there's any CSS attribute on the component locally which overrides the CSS spec, it combines both themes, but overriding global CSS attributes in favor of local ones.

```html
<!-- 
  // ... E.G: App is using this configuration below

  NgxSkeletonLoaderModule.forRoot({
    theme: {
      // Enabliong theme combination
      extendsFromRoot: true,
      // ... list of CSS theme attributes
      height: '30px',
    },
  }),
-->

<div class="item">
  <ngx-skeleton-loader></ngx-skeleton-loader>
  <!-- above line will produce a skeleton component using `height: 30px;`" -->
  <ngx-skeleton-loader [theme]="{background: 'blue'}"></ngx-skeleton-loader>
  <!-- above line will produce a skeleton component using `height: 30px; background: blue;`" -->
  <ngx-skeleton-loader [theme]="{height: '50px', background: 'red'}"></ngx-skeleton-loader>
  <!-- above line will produce a skeleton component using `height: 50px; background: red;`" -->
</div>
```

- Adding new `custom-content` appearance. From now on, consumers can now add their own content inside `<ng-skeleton-loader></ng-skeleton-loader>` component. So that, they can add some custom content, such as SVG, as an example
- Adding examples for `custom-content` usage

### Updated

- Updagrading module to Angular v15

### Fixed

- Removing build warnings

## [6.0.0][] - 2022-08-18

### Updated

- Adding Publishing setup using NPX
- Replacing CSS class namespace from `.loader` to `.skeleton-loader`

#### Breaking Change

The CSS class used as namespace was changed. Previously, it was called `.loader` and now is `.skeleton-loader`. It might cause some issues in cases of `:host` DOM style scoping usage. For the sake of semantic versioning, please bear in mind this scenario in case of `:host` usage.

## [5.0.0][] - 2022-02-08

### Updated

> Thanks @yharaskrik

#### Breaking Change

Bundle distribution are now `esm2020`, `fesm2015` and `fesm2020`. UMD and CommonJS versions were support were removed from Angular CLI directly. So the next version for the package will be a major version to cover these changes accordingly.

- Updating package bundle distribution
- Updating `@angular/cli` to v13
- Applying project changes to v13
- Updating bundlesize check to point to `fesm2020`

## [4.0.0][] - 2021-07-28

### Fixed

#### Breaking Change

- Rolling back "Adding mechanism to prevents calling `forRoot()` more than once if module is loaded asynchronously in a submodule.". Unfortunately, this was affecting consumers and it needed to be reverted to avoid friction in other applications.

If you need to have this feature in place, the suggestion is to create a specific module in your app and apply the changes on your application.

## [3.0.0][] - 2021-07-23

### Added

#### Breaking Change

- Adding mechanism to prevents calling `forRoot()` more than once if module is loaded asynchronously in a submodule. This is required in order to avoid issues in consumers. To avoid that, consumers should load the module once on the main module instead - if loading submodules async.

## [2.10.1][] - 2021-07-13

### Fixed

- Ensures every ARIA progressbar node has an accessible name. This is caused by missing aria-label on the `<span>` element.

Thanks @rkristelijn for raising the issue and the pull request!

## [2.10.0][] - 2021-06-15

### Added

- Adding module configuration support via `forRoot()` method. Now you can add configure your module via `forRoot()`. You can now set the default of `appearance`, `animation`, `theme`, `loadingText`, `count` and/or `items`.E.G.

```ts

@NgModule({
  // ...
  imports: [NgxSkeletonLoaderModule.forRoot({ appearance: 'circle', count: 3 )],
  // ...
})
```

## [2.9.2][] - 2021-04-11

### Updated

- Updating link in README.md

### Fixed

- Bumping dev dependencies to avoid security issues

## [2.9.1][] - 2021-02-20

### Fixed

- Adding `appearance` attribute to be checked via `ngOnChanges`

### Updated

- Updating examples with new features

## [2.9.0][] - 2021-02-19

### Added

- Adding validation for @Input attributes that needs internal manipulation. After these changes:
  - if `count` is not a numeric value, it will use the default value as `1`
  - if `animation` is not a valid attribute, it will use the default value as `progress`
  - PS: The other values alredy have a fallback, so nothing to worry here
- Adding error feedback for `appearance` attribute in case of wrong configuration. Now it will show a error message on the console in case of receiving a wrong value

### Updated

- Adding `ngOnChange` to validate `count` input in case of changes via binding
- Updating `README.md` with information about `appearance` and `theme` usage.

## [2.8.0][] - 2021-02-18

### Fixed

- Using `ngAcceptInputType_count` for template checking in count input. That solves issue https://github.com/willmendesneto/ngx-skeleton-loader/issues/59. You can find more details about it in https://angular.io/guide/template-typecheck
- Fixing type issues on `yarn build:ssr` command

### Updated

- Updating `perf-marks` to `v1.14.1`
- Adding strict mode support in module
- Updating types for `theme` to match with `ngStyle`. More details in https://angular.io/api/common/NgStyle#properties

## [2.7.0][] - 2021-02-06

### Added

- Adding new `loadingText` attribute to be used as WAI-ARIA `aria-valuetext`. In this case, it will render the component using "Please wait ...". Otherwise, it defaults to "Loading..."

```html
<!-- Passing loading text to be used as WAI-ARIA `aria-valuetext` -->
<!-- In this case, it will render the component using "Please wait ..." -->
<!-- Otherwise, it defaults to "Loading..." -->
<div class="skeleton-with-specific-loading-text">
  <ngx-skeleton-loader loadingText="Please wait ..."></ngx-skeleton-loader>
</div>
```

### Updated

- Using OnPush as changeDetection mechanism into ngx-skeleton-loader component
- Adding ability to pass `false` as string or boolean (coming from variable value via binding) on `animation` attribute in `ngx-skeleton-loader` component configuration. animation will receive `false` as string when attribute field it's not using binding. Component now can receive `false` (boolean), "false" (string), or any other animation type via binding.

```html
<div class="item">
  <!-- Disables the animation -->
  <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
  <!-- Disables the animation, but receiving boolean value from binding -->
  <!-- Via binding it can receive `false` (boolean), "false" (string), or any other animation type -->
  <ngx-skeleton-loader [animation]="classAttributeWithBooleanFalseValue"></ngx-skeleton-loader>
  <!-- Uses `progress` as animation -->
  <ngx-skeleton-loader animation="progress"></ngx-skeleton-loader>
  <ngx-skeleton-loader></ngx-skeleton-loader>
  <!-- Uses `pulse` as animation -->
  <ngx-skeleton-loader animation="pulse"></ngx-skeleton-loader>
</div>
```

## [2.6.2][] - 2020-12-08

### Fixed

- Removing Lighthouse "Avoid non-composited animations" issue. Lighthouse shows warnings from ngx-skeleton-loader.scss -file (progress).

- "Avoid non-composited animations":
- "Animations which are not composited can be janky and contribute to CLS"

To solve that, instead of using CSS `background-position` the module is now using CSS `translate3d`, which improves the animation by using GPU instead of CPU. Issue fixed and performance boost added 🎉

## [2.6.1][] - 2020-11-30

### Fixed

- Solving `forRoot()` types error `Generic type 'ModuleWithProviders<T>' requires 1 type argument(s)`. Closes https://github.com/willmendesneto/ngx-skeleton-loader/issues/51

## [2.6.0][] - 2020-11-15

### Added

- Adding `NgxSkeletonLoaderModule.forRoot()` method. Usage:

```js
import { NgModule } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// ... list of other app dependencies

import { AppComponent } from './app.component';
// ... list of other app components/modules

@NgModule({
  declarations: [AppComponent],
  imports: [NgxSkeletonLoaderModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## [2.5.0][] - 2020-10-10

### Fixed

- Fixing bundle size command on CircleCI pipeline

### Updated

- Upgrading NodeJS to v14.11.0
- Updating `perf-marks` package to v1.14.0
- Improving skeleton animations fps by using `cubic-bezier` instead of `ease-in-out`

## [2.4.4][] - 2020-08-21

### Fixed

- Remove check requirements if perf-marks is running in a browser or not in Angular apps 🔥

### Added

- Adding Angular Universal support for examples. Now we can run `npm run dev:ssr` and access `http://localhost:4200/index.html` and the page will run using angular universal 💪
- Adding `.prettierrc` file with some of the code styling rules

## [2.4.3][] - 2020-08-13

### Fixed

- Avoiding perf-marks call if running in Angular Universal applications

## [2.4.2][] - 2020-08-01

### Updated

- Bumping `perf-marks` to latest version

## [2.4.1][] - 2020-08-01

### Updated

- Bumping `perf-marks` to latest version

## [2.4.0][] - 2020-08-01

### Added

- Adding User Timing API to track component render and content loader time

### Updated

- Updating examples with new skeleton simulation
- Adding Stackblitz link for user card skeleton loading demo

## [2.3.0][] - 2020-08-01

### Added

- Adding User Timing API to track component render and content loader time

### Updated

- Updating examples with new skeleton simulation
- Adding Stackblitz link for user card skeleton loading demo

## [2.2.1][] - 2020-06-30

### Fixed

- For compatibility with IE11 by using indexOf instead of `includes`

### Updated

- Updating `npm run postinstall` command to follow the new rules from update.angular.io website

## [2.2.0][] - 2020-06-01

### Added

- Using `prefers-reduced-motion` to respect user’s OS option to `Reduce Motion`. More details about `prefers-reduced-motion` in https://web.dev/prefers-reduced-motion/

## [2.1.0][] - 2020-06-01

### Updated

- Upgrading @angular/cli to version 9
- 🎉 Decreasing bundle size to 1.17KB 🎉

## [2.0.0][] - 2020-05-15

### Updated

- Upgrading NodeJS to v12.16.2
- Updating documentation with `animation` attribute

### Added

- Supporting for new animation `progress-dark` to enable users when using theme with darker color schema
- Supporting for different animations 🎉

Now we can define the animation we want to use in `<ngx-skeleton-loader>` component via `animation` input. It's a string that can defined the animation used during the loading, having as options:

- `false`: it will disable the animation;
- `progress` - _default_: it will use it `progress` as animation;
- `pulse`: it will use `pulse` as animation;

> `progress` is the default animation, used as the single one previously. If you don't pass the animation attribute, it defaults to `progress`.

```html
<div class="item">
  <!-- Disables the animation -->
  <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
  <!-- Uses `progress` as animation -->
  <ngx-skeleton-loader animation="progress"></ngx-skeleton-loader>
  <ngx-skeleton-loader></ngx-skeleton-loader>
  <!-- Uses `pulse` as animation -->
  <ngx-skeleton-loader animation="pulse"></ngx-skeleton-loader>
</div>
```

- Supporting enabling/disabling animations.
  Now the users will be able to enable/disable animations by using `animation` input. It's a string with `false` as value that the component receives to check if it should not load progress animation.

> It works only to disable it. In case you want to keep enable it

```js
<div class="item">
  <ngx-skeleton-loader animation="false"></ngx-skeleton-loader>
</div>
```

## [1.2.7][] - 2020-04-13

### Updated

- Decreasing bundle size after disable Ivy in production build
- Adding description, keywords and github information on `package.json` files

## [1.2.6][] - 2020-02-26

### Fixed

- Changing angular library configuration to prod and forcing it at publish time

## [1.2.5][] - 2020-02-25

### Fixed

- Changing angular library configuration to prod

## [1.2.4][] - 2020-02-25

### Updated

- Updating Github templates
- Updating Angular CLI to v9

## [1.2.3][] - 2020-02-25

### Fixed

- Solving peerDependency warning when installing library in an Angular 9 project

## [1.2.2][] - 2019-06-22

### Fixed

- Fixing component dimensions via theme

## [1.2.1][] - 2019-06-08

### Updated

- Updating Angular CLI to v8

## [1.2.0][] - 2019-04-19

### Updated

- Updating Angular CLI to 7.3.8

## [1.1.2][] - 2019-01-07

### Added

- Adding badges for stackblitz, bundlephobia and license

### Updated

- Removing unnecessary CSS styles for skeleton

## [1.1.1][] - 2018-12-17

### Fixed

- Fixing Stackblitz link demo link

## [1.1.0][] - 2018-12-17

### Added

- Added GitHub urls into `package.json`
- Added Circle CI integration
- Added Coveralls integration
- Added GitHub templates
- Added `CODE_OF_CONDUCT.md` with the Code of conduct
- Added unit tests for skeletons and demo components

### Updated

- Decreased bundle size
- New gif showing `ngx-skeleton-loader` in action

## [1.0.2][] - 2018-12-16

### Fixed

- Added markdown files in dist folder in build time

## [1.0.1][] - 2018-12-16

### Fixed

- Added markdown files in dist folder in build time

## [1.0.0][] - 2018-12-16

### Fixed

- Fixed build script

## [0.0.1][] - 2018-12-16

### Added

- Created `ngx-skeleton-loader`
- Created test automation for the module

[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v0.0.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.0.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.0.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.0.2
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.1.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.1.1...HEAD
[1.1.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.1.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.4...HEAD
[1.2.4]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.1.2
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.5...HEAD
[1.2.5]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.2.5
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.6...HEAD
[1.2.6]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.2.6
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v1.2.7...HEAD
[1.2.7]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v1.2.7
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.0.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.1.0...HEAD
[2.1.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.1.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.2.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.2.1...HEAD
[2.2.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.2.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.3.0...HEAD
[2.3.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.3.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.4.0...HEAD
[2.4.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.4.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.4.1...HEAD
[2.4.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.4.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.4.2...HEAD
[2.4.2]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.4.2
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.4.3...HEAD
[2.4.3]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.4.3
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.4.4...HEAD
[2.4.4]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.4.4
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.5.0...HEAD
[2.5.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.5.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.6.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.6.1...HEAD
[2.6.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.6.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.6.2...HEAD
[2.6.2]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.6.2
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.7.0...HEAD
[2.7.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.7.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.8.0...HEAD
[2.8.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.8.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.9.0...HEAD
[2.9.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.9.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.9.1...HEAD
[2.9.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.9.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.9.2...HEAD
[2.9.2]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.9.2
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.10.0...HEAD
[2.10.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.10.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.10.1...HEAD
[2.10.1]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.10.1
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v4.0.0...HEAD
[4.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v3.0.0...v4.0.0
[3.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v3.0.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v5.0.0...HEAD
[5.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v5.0.0
[unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v6.0.0...HEAD
[6.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v6.0.0


[Unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v7.0.0...HEAD
[7.0.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v7.0.0