import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { set } from 'feature-toggle-service';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { RestrictPageDueFeatureToggleComponent } from './restrict-page-due-feature-toggle/restrict-page-due-feature-toggle.component';
import {
  ngxFeatureToggleCanActivate,
  ngxFeatureToggleCanActivateChild,
  ngxFeatureToggleCanMatch,
} from 'projects/ngx-feature-toggle/src/lib/ngx-feature-toggle-route-guard.router';

set({
  enableFirstText: true,
  enableSecondText: true,
  enableCustomerPage: true,
  enableChildrenNavigation: false,
});

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canMatch: [ngxFeatureToggleCanMatch],
    canActivate: [ngxFeatureToggleCanActivate],
    data: {
      featureToggle: ['enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'restrict',
    component: RestrictPageDueFeatureToggleComponent,
    canActivate: [ngxFeatureToggleCanActivate],
    data: {
      featureToggle: ['!enableSecondText'],
      redirectTo: '/error',
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [ngxFeatureToggleCanActivate],
    data: {
      featureToggle: ['enableFirstText'],
    },
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [ngxFeatureToggleCanActivate],
    canActivateChild: [ngxFeatureToggleCanActivateChild],
    data: {
      featureToggle: ['enableCustomerPage'],
      redirectTo: '/error',
    },
    children: [
      {
        path: ':id',
        component: CustomerDetailComponent,
        data: {
          featureToggle: ['enableCustomerPage', '!enableChildrenNavigation'],
          redirectTo: '/error',
        },
      },
    ],
  },
  { path: '**', redirectTo: '/home' },
];
