import { inject, isDevMode } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
} from '@angular/router';
import { isOn } from 'feature-toggle-service';

function isOnCheck(route: ActivatedRouteSnapshot | Route, router: Router): boolean {
  if (
    !route ||
    !route.data ||
    (typeof route.data['featureToggle'] !== 'string' && !Array.isArray(route.data['featureToggle']))
  ) {
    if (isDevMode()) {
      // eslint-disable-next-line no-console
      console.error(
        '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.',
      );
    }
    return false;
  }

  const hasAllTogglesOn = ([].concat(route.data['featureToggle'] as never) as string[]).every(toggle => {
    if (typeof toggle !== 'string') {
      return false;
    }

    return toggle[0] === '!' ? !isOn(toggle.replace('!', '')) : isOn(toggle);
  });

  if (!hasAllTogglesOn && route.data['redirectTo'] !== null && route.data['redirectTo'] !== undefined) {
    router.navigate([].concat(route.data['redirectTo']));
  }

  return hasAllTogglesOn;
}

export const ngxFeatureToggleCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return isOnCheck(route, inject(Router));
};

export const ngxFeatureToggleCanActivateChild: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot) => {
  return isOnCheck(childRoute, inject(Router));
};

export const ngxFeatureToggleCanMatch: CanMatchFn = (route: Route) => {
  return isOnCheck(route, inject(Router));
};
