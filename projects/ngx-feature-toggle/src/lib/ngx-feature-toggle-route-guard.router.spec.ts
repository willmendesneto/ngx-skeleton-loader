import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Route, Router, RouterModule } from '@angular/router';
import { set } from 'feature-toggle-service';
import {
  ngxFeatureToggleCanActivate,
  ngxFeatureToggleCanActivateChild,
  ngxFeatureToggleCanMatch,
} from './ngx-feature-toggle-route-guard.router';

function runGuard(
  guard: typeof ngxFeatureToggleCanActivate | typeof ngxFeatureToggleCanActivateChild | typeof ngxFeatureToggleCanMatch,
  routeData: Route['data'],
): boolean {
  return TestBed.runInInjectionContext(() => {
    const route = { data: routeData } as ActivatedRouteSnapshot & Route;
    if (guard === ngxFeatureToggleCanActivate) {
      return ngxFeatureToggleCanActivate(route, {} as never) as boolean;
    }
    if (guard === ngxFeatureToggleCanActivateChild) {
      return ngxFeatureToggleCanActivateChild(route, {} as never) as boolean;
    }
    return ngxFeatureToggleCanMatch(route, []) as boolean;
  });
}

describe('NgxFeatureToggle route guards', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
    });
    router = TestBed.inject(Router);
    set({ isFirstFeatureEnabled: true, isSecondFeatureEnabled: false });
    spyOn(console, 'error');
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    set({ isFirstFeatureEnabled: false, isSecondFeatureEnabled: false });
  });

  [ngxFeatureToggleCanActivate, ngxFeatureToggleCanActivateChild, ngxFeatureToggleCanMatch].forEach(guard => {
    const name = guard.name || guard.toString().slice(0, 40);

    describe(`${name}`, () => {
      it('should return `false` if feature toggle is not configured in application level', () => {
        expect(runGuard(guard, { featureToggle: ['thisFeatureToggleDoesNotExist'] })).toBeFalsy();
      });

      it('should return `false` if feature toggle key does not exist in route', () => {
        expect(runGuard(guard, {})).toBeFalsy();
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledWith(
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.',
        );
      });

      it('should return `false` if feature toggle is not added in route as an array', () => {
        expect(runGuard(guard, { featureToggle: {} })).toBeFalsy();
        // eslint-disable-next-line no-console
        expect(console.error).toHaveBeenCalledWith(
          '`NgxFeatureToggleRouteGuard` need to receive `featureToggle` as data as an array or string in your route configuration.',
        );
      });

      it('should return `false` if feature toggle is disabled and `redirectTo` is null', () => {
        expect(runGuard(guard, { featureToggle: ['isSecondFeatureEnabled'] })).toBeFalsy();
        expect(router.navigate).not.toHaveBeenCalled();
      });

      it('should return `false` and redirect if feature toggle is disabled AND route contains `redirectTo`', () => {
        expect(runGuard(guard, { featureToggle: ['isSecondFeatureEnabled'], redirectTo: '/redirect-url' })).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['/redirect-url']);
      });

      it('should return `false` and redirect when `redirectTo` is an empty string', () => {
        expect(runGuard(guard, { featureToggle: ['isSecondFeatureEnabled'], redirectTo: '' })).toBeFalsy();
        expect(router.navigate).toHaveBeenCalledWith(['']);
      });

      it('should return `true` if feature toggle is enabled', () => {
        expect(runGuard(guard, { featureToggle: ['isFirstFeatureEnabled'] })).toBeTruthy();
      });

      it('should return `true` if feature toggle is disabled AND route configuration starts with `!`', () => {
        expect(runGuard(guard, { featureToggle: ['!isSecondFeatureEnabled'] })).toBeTruthy();
      });

      it('should return `true` if combination of feature toggles are truthy', () => {
        expect(
          runGuard(guard, { featureToggle: ['isFirstFeatureEnabled', '!isSecondFeatureEnabled'] }),
        ).toBeTruthy();
      });
    });
  });
});
