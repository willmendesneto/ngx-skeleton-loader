import { Component, NgModule, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSkeletonLoaderModule } from './ngx-skeleton-loader.module';

@Component({
  standalone: false,
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

@NgModule({
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
  exports: [ContainerComponent],
})
class ContainerTestModule {}

describe('NgxSkeletonLoaderModule method', () => {
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    vi.spyOn(console, 'error').mockReturnValue(undefined);
    vi.spyOn(console, 'log').mockReturnValue(undefined);
    vi.spyOn(console, 'warn').mockReturnValue(undefined);
    vi.spyOn(console, 'info').mockReturnValue(undefined);
    await TestBed.configureTestingModule({
      imports: [ContainerTestModule],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    fixture.detectChanges();
  });

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
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(0);
  });

  it('should NOT call console.log() method', () => {
    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledTimes(0);
  });

  it('should NOT call console.warn() method', () => {
    // eslint-disable-next-line no-console
    expect(console.warn).toHaveBeenCalledTimes(0);
  });

  it('should NOT call console.info() method', () => {
    // eslint-disable-next-line no-console
    expect(console.info).toHaveBeenCalledTimes(0);
  });
});
