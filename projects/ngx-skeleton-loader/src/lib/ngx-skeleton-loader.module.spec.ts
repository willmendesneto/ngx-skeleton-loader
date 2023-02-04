import { Component, PLATFORM_ID } from '@angular/core';
import { TestBed, waitForAsync as waitForAsync } from '@angular/core/testing';

import { NgxSkeletonLoaderModule } from './ngx-skeleton-loader.module';

@Component({
  selector: 'ngx-container',
  template: `
    <div>
      <div class="skeletons-defaults">
        <ngx-skeleton-loader [theme]="{ width: '70px' }"></ngx-skeleton-loader>
      </div>
      <div class="skeletons-extended-theme">
        <ngx-skeleton-loader [theme]="{ width: '100px', background: 'blue' }"></ngx-skeleton-loader>
      </div>
    </div>
  `,
})
class ContainerComponent {}

describe('NgxSkeletonLoaderModule method', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fixture: any;

  beforeEach(waitForAsync(() => {
    spyOn(console, 'error');
    spyOn(console, 'log');
    spyOn(console, 'warn');
    spyOn(console, 'info');
    fixture = TestBed.configureTestingModule({
      imports: [
        NgxSkeletonLoaderModule.forRoot({
          appearance: 'circle',
          count: 3,
          theme: {
            extendsFromRoot: true,
            background: 'red',
          },
        }),
      ],
      declarations: [ContainerComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).createComponent(ContainerComponent);
    fixture.detectChanges();
  }));

  describe('When #forRoot receives a `theme`', () => {
    it('should render skeleton extending theme styles from root and overriding config theming in favour of local theme if local config has any similar CSS attribute', () => {
      const skeletonWithTheming = fixture.nativeElement.querySelector(
        '.skeletons-extended-theme .skeleton-loader.circle',
      ).attributes as NamedNodeMap;

      expect((skeletonWithTheming.getNamedItem('style') as Attr).value).toBe('background: blue; width: 100px;');
    });

    it('should render skeleton with styles extending/combining theme styles from root if CSS attributes are not similar', () => {
      const skeletonWithTheming = fixture.nativeElement.querySelector('.skeletons-defaults .skeleton-loader.circle')
        .attributes as NamedNodeMap;

      expect((skeletonWithTheming.getNamedItem('style') as Attr).value).toBe('background: red; width: 70px;');
    });
  });

  it('should render the component properly using given forRoot() config', () => {
    expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .skeleton-loader.circle').length).toBe(3);
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
