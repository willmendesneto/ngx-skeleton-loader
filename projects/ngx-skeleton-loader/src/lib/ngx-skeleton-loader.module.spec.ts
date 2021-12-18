import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed, waitForAsync as waitForAsync } from '@angular/core/testing';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(0);
  });
});
