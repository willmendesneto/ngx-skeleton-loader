import { Component, PLATFORM_ID } from '@angular/core';
import { async as waitForAsync, TestBed } from '@angular/core/testing';

import { NgxSkeletonLoaderModule } from './ngx-skeleton-loader.module';

@Component({
  selector: 'ngx-container',
  template: `
    <div>
      <div class="skeletons-defaults">
        <ngx-skeleton-loader></ngx-skeleton-loader>
      </div>
    </div>
  `,
})
class ContainerComponent {}

describe('NgxSkeletonLoaderModule method', () => {
  // tslint:disable-next-line: no-any
  let fixture: any;

  beforeEach(
    waitForAsync(() => {
      spyOn(console, 'error');
      spyOn(console, 'log');
      spyOn(console, 'warn');
      spyOn(console, 'info');
      fixture = TestBed.configureTestingModule({
        imports: [NgxSkeletonLoaderModule.forRoot({ appearance: 'circle', count: 3 })],
        declarations: [ContainerComponent],
        providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
      }).createComponent(ContainerComponent);
      fixture.detectChanges();
    }),
  );

  it('should render the component properly using given forRoot() config', () => {
    expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .loader.circle').length).toBe(3);
  });

  it('should NOT call console.error() method', () => {
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('should NOT call console.log() method', () => {
    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it('should NOT call console.warn() method', () => {
    expect(console.warn).toHaveBeenCalledTimes(0);
  });

  it('should NOT call console.info() method', () => {
    // tslint:disable-next-line: no-console
    expect(console.info).toHaveBeenCalledTimes(0);
  });

  describe('When the module loaded twice asynchronously in a submodule', () => {
    it('should throw an error if the module was previously loaded', () => {
      expect(() => new NgxSkeletonLoaderModule(new NgxSkeletonLoaderModule())).toThrowError(
        // tslint:disable-next-line: max-line-length
        '`NgxSkeletonLoaderModule` is already loaded and it might cause issues. To avoid that, import the module only once in your app.',
      );
    });
  });
});
