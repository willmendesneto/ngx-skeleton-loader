# NGX Skeleton loader

[![Dependency Status](https://david-dm.org/willmendesneto/ngx-skeleton-loader.svg)](https://david-dm.org/willmendesneto/ngx-skeleton-loader)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-skeleton-loader-sample)

[![NPM](https://nodei.co/npm/ngx-skeleton-loader.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-skeleton-loader)
[![NPM](https://nodei.co/npm-dl/ngx-skeleton-loader.png?height=3&months=3)](https://npmjs.org/ngx-skeleton-loader)

[![Build Status](https://circleci.com/gh/willmendesneto/ngx-skeleton-loader.svg?style=shield)](https://circleci.com/gh/willmendesneto/ngx-skeleton-loader)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-skeleton-loader/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/ngx-skeleton-loader?branch=master)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-skeleton-loader.svg)](https://bundlephobia.com/result?p=ngx-skeleton-loader)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

![ngx-skeleton-loader in action](https://user-images.githubusercontent.com/1252570/50053778-d4e0d900-018e-11e9-9de7-fad6f9fddd9e.gif)

## Why skeletons?

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

Try out our [demo on Stackblitz](https://ngx-skeleton-loader-sample.stackblitz.io)!

## Install

You can get it on NPM installing `ngx-skeleton-loader` module as a project dependency.

```shell
npm install ngx-skeleton-loader --save
```

## Setup

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
<div class="item"><ngx-skeleton-loader count="5" appearance="circle"> </ngx-skeleton-loader></div>
```

## Theming

You can also define different styles for the skeleton loader by passing an object with the css styles - in dashed case - into the component via `[theme]` attribute.

```html

<!--
If you need to change all the background wrapper
you need to apply the style changes on the 
`ngx-skeleton-loader`component wrapper
-->

<div
  style="background: #FF0001; padding: 10px;"
>
  <ngx-skeleton-loader
    count="5"
    [theme]="{ 
      'border-radius': '5px',
      height: '50px',
      'background-color': '#992929',
      border: '1px solid white'
    }"
  ></ngx-skeleton-loader>
</div>

```

> You should change the styles on the skeleton wrapper element in case you need to change the background color. You can check the code details in the [Stackblitz Live Demo Link](https://stackblitz.com/edit/ngx-skeleton-loader-sample?file=app%2Fapp.component.html)

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/ngx-skeleton-loader`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-skeleton-loader/blob/master/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-skeleton-loader/blob/master/CODE_OF_CONDUCT.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <https://twitter.com/willmendesneto>
- <http://github.com/willmendesneto>
