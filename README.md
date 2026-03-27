# NGX Feature Toggle

[![Dependency Status](https://david-dm.org/willmendesneto/ngx-feature-toggle.svg)](https://david-dm.org/willmendesneto/ngx-feature-toggle)
[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-feature-toggle-sample)

[![NPM](https://nodei.co/npm/ngx-feature-toggle.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/ngx-feature-toggle)
[![NPM](https://nodei.co/npm-dl/ngx-feature-toggle.png?height=3&months=3)](https://npmjs.org/ngx-feature-toggle)

[![Build Status](https://circleci.com/gh/willmendesneto/ngx-feature-toggle.svg?style=shield)](https://circleci.com/gh/willmendesneto/ngx-feature-toggle)
[![Coverage Status](https://coveralls.io/repos/willmendesneto/ngx-feature-toggle/badge.svg?branch=master)](https://coveralls.io/r/willmendesneto/ngx-feature-toggle?branch=master)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/ngx-feature-toggle.svg)](https://bundlephobia.com/result?p=ngx-feature-toggle)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

Your module to handle with [feature toggles](http://martinfowler.com/bliki/FeatureToggle.html) in Angular applications easier.

## Why Feature toggle?

> This is a common concept, but why use this directive instead solve it via server-side rendering?

The idea of this directive is make this process transparent and easier. So the main point is integrate this directive with other tooling process, such as:

- Server-side rendering;
- Progressive rendering;
- Any other that you like :)

You can integrate with WebSockets or handling this in a EventSourcing architecture. It's totally transparent for you and you can integrate easier in your application.

- [Demo](#demo)
- [Install](#install)
- [Setup](#setup)
- [Development](#development)
- [Contribute](#contribute)

## Demo

Try out the demos on Stackblitz:

- [Components and directives example](https://stackblitz.com/edit/ngx-feature-toggle-sample)
- [Routing Guards example](https://stackblitz.com/edit/ngx-feature-toggle-routing-guard-sample)

## Install

You can get it on NPM installing `ngx-feature-toggle` module as a project dependency.

```shell
npm install ngx-feature-toggle --save
```

## Setup

You'll need to add `FeatureToggleModule` to your application module. So that, the `featureToggle` components will be accessible in your application.

```typescript
...
import { FeatureToggleModule } from 'ngx-feature-toggle';
...
@NgModule({
  declarations: [
    YourAppComponent
  ],
  imports: [
    ...
    FeatureToggleModule,
    ...
  ],
  providers: [],
  bootstrap: [YourAppComponent]
})

export class YourAppComponent {}

```

Now you just need to add a configuration in your application root component. Your feature toggle configuration can be added using different approaches, such as:

- RXJS subscribe information;
- HTTP Request;
- CQRS event data;
- File information;
- etc;

After that, you can use the `featureToggle` components and directives in your templates, passing the string based on the feature toggle configuration data.

## Module

### Components and Directives

- `feature-toggle-provider`: Handle with feature toggle configuration in your application. It adds the default values of your enabled/disabled features;
- `*featureToggle`: Directive that handles with feature toggle check. So that, the component will be rendered/removed based on the feature toggle configuration is enabled;
- `*featureToggleWhenDisabled`: Directive that handles with feature toggle check. So that, the component will be rendered/removed when the feature toggle configuration is disabled;

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'component-docs',
  template: `
    <feature-toggle-provider [features]="featureToggleData">
      <div *featureToggle="'enableSecondText'">
        <p>condition is true and "featureToggle" is enabled.</p>
      </div>
      <div *featureToggle="'enableFirstText'">
        <p>condition is false and "featureToggle" is disabled. In that case this content should not be rendered.</p>
      </div>
      <div *featureToggle="'!enableFirstText'">
        <p>
          condition is false and "featureToggle" is disabled
          <b>but it has "!" as a prefix of the feature toggle to be checked.</b>
          In that case this content should be rendered.
        </p>
      </div>
      <div
        class="combined-feature-toggles-with-truthly-option"
        *featureToggle="['!enableFirstText', 'enableSecondText']"
      >
        <p>
          This is a combined condition. It shows if <b>enableSecondText</b> is true and <b>enableFirstText</b> is falsy,
          but it has "!" as a prefix. If both cases are correct, then the "featureToggle" is enabled and rendering this
          component.
        </p>
      </div>
    </feature-toggle-provider>
  `,
})
export class ComponentDocsComponent {
  public featureToggleData: any = {
    enableFirstText: false,
    enableSecondText: true,
  };
}
```

### Route Guards

In some scenarios when you need to prevent the route to be loaded, you can use `NgxFeatureToggleCanLoadGuard`, by passing the class and configuration of the feature toggle to be checked in your route data.

```js
...
export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NgxFeatureToggleCanLoadGuard],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        // This configuration will check if feature toggle is disabled
        // since it has `!` prefix in the configuration
        '!enableFirstText'
      ],
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [NgxFeatureToggleCanLoadGuard],
    data: {
      // Using string as configuration
      featureToggle: 'enableSecondText',
    },
  },
];
...
```

Also, you can use `NgxFeatureToggleRouteGuard` to check if the route should be activated or not by passing the class and configuration of the feature toggle to be checked in your route data.

```js
...
export const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        // This configuration will check if feature toggle is disabled
        // since it has `!` prefix in the configuration
        '!enableFirstText'
      ],
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      // Using string as configuration
      featureToggle: 'enableSecondText',
    },
  },
];
...
```

In both route guards you can pass route data with feature toggle as an array. For scenarios when you need to check for feature toggles enabled and/or disabled you can easily configure it by passing `!` if the application should check if the feature toggle is disabled

```js
...
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      // Using array as configuration
      featureToggle: [
        // This configuration will check if feature toggle is enabled
        'enableSecondText',
        // This configuration will check if feature toggle is disabled
        // since it has `!` prefix in the configuration
        '!enableFirstText'
      ],
    },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [NgxFeatureToggleRouteGuard],
    data: {
      // Using string as configuration
      featureToggle: 'enableSecondText',
    },
  },
];
...
```

In this case, we are combining the checks. So the component will be activated if `enableSecondText` is configured as `true` AND `enableFirstText` is configured as `false`. With that configuration you can have all the flexibility to cover different scenarios in your app.

Use `NgxFeatureToggleRouteGuard` to control when the child component of a specific component can be activate via routing. It can be passed as an array of items.

```js
...
export const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    canActivateChild: [NgxFeatureToggleRouteGuard],
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        // This is the featureToggle configuration for
        // the child component. It can also use
        // a combination of feature toggles
        data: {
          featureToggle: [
            // This configuration will check if feature toggle is enabled
            'enableCustomerPage',
            // This configuration will check if feature toggle is disabled
            // since it has `!` prefix in the configuration
            '!enableChildrenNavigation'],
        },
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivateChild: [NgxFeatureToggleRouteGuard],
    children: [
      {
        path: ':id',
        component: DashboardDetailsComponent,
        // This is the featureToggle configuration for
        // the child component. It can also use
        // a combination of feature toggles
        data: {
          // using string to configure
          featureToggle: 'enableDashboardDetailsPage',
        },
      },
    ],
  },
];
...
```

#### Redirects

You might have some specific requirements that you should redirect a user to a specific route in case of a feature flag is disabled. For that, you can use `redirectTo` as a mechanism to redirect a user in a specific route when it tries to access in a route with a CanActivate/CanActivateChild/CanLoad Feature Toggle Guard and the feature toggle is disabled.

For advanced scenarios you can use a combination of route guards AND redirects. E.G.

```js
...
export const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    canLoad: [NgxFeatureToggleRouteGuard],
    canActivate: [NgxFeatureToggleRouteGuard],
    canActivateChild: [NgxFeatureToggleRouteGuard],
    // This is the featureToggle configuration for
    // the parent component
    data: {
      featureToggle: ['enableCustomerPage'],
      // If feature toggle is disabled, the user will be redirected to `/error` URL
      redirectTo: '/error'
    },
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        // This is the featureToggle configuration for
        // the child component. It can also use
        // a combination of feature toggles
        data: {
          featureToggle: ['enableCustomerPage', '!enableChildrenNavigation'],
          // If one (or all of them) of the feature toggle is disabled, the user will be redirected to `/customer-error` URL
          // Note that you can use redirects for the main url and their children
          redirectTo: '/customer-error'
        },
      },
    ],
  },
];
...
```

## Development

### Run demo locally

1. This project uses [Angular CLI](https://cli.angular.io/) as base. That means you just need to run `npm start` and access the link `http://localhost:4200` in your browser

### Run tests

1. Run `npm test` for run tests. In case you want to test using watch, please use `npm run tdd`

### Publish

this project is using `np` package to publish, which makes things straightforward. EX: `np <patch|minor|major> --contents=dist/ngx-feature-toggle`

> For more details, [please check np package on npmjs.com](https://www.npmjs.com/package/np)

## Contribute

For any type of contribution, please follow the instructions in [CONTRIBUTING.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/master/CONTRIBUTING.md) and read [CODE_OF_CONDUCT.md](https://github.com/willmendesneto/ngx-feature-toggle/blob/master/CODE_OF_CONDUCT.md) files.

## Author

**Wilson Mendes (willmendesneto)**

- <http://github.com/willmendesneto>
