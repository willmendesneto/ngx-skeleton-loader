# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased][]

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


[Unreleased]: https://github.com/willmendesneto/ngx-skeleton-loader/compare/v2.6.0...HEAD
[2.6.0]: https://github.com/willmendesneto/ngx-skeleton-loader/tree/v2.6.0