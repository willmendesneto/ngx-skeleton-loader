import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { provideNgxSkeletonLoader, NgxSkeletonLoaderComponent } from '../public-api';

@Component({
  selector: 'ngx-container',
  imports: [NgxSkeletonLoaderComponent],
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

describe('provideNgxSkeletonLoader method', () => {
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(waitForAsync(() => {
    spyOn(console, 'error');
    spyOn(console, 'log');
    spyOn(console, 'warn');
    spyOn(console, 'info');
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideNgxSkeletonLoader({
          appearance: 'circle',
          count: 3,
          theme: {
            extendsFromRoot: true,
            background: 'red',
          },
        })
      ],
    });
    fixture = TestBed.createComponent(ContainerComponent);
    fixture.detectChanges();
  }));

  describe('When #provideNgxSkeletonLoader receives a `theme`', () => {
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

  it('should render the component properly using given provideNgxSkeletonLoader() config', () => {
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
