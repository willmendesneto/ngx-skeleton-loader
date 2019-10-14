import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';

@Component({
  selector: 'ngx-container',
  template: `
    <div>
      <div class="skeletons-defaults"><ngx-skeleton-loader></ngx-skeleton-loader></div>

      <div class="skeletons-with-count"><ngx-skeleton-loader count="2"></ngx-skeleton-loader></div>

      <div class="skeletons-appearance-circle">
        <ngx-skeleton-loader appearance="circle"> </ngx-skeleton-loader>
      </div>

      <div class="skeletons-with-theming">
        <ngx-skeleton-loader
          appearance="circle"
          [theme]="{ width: '70px', height: '70px', 'border-radius': '10px' }"
        >
        </ngx-skeleton-loader>
      </div>

      <div class="skeletons-with-multi-theming">
        <ngx-skeleton-loader
          count="3"
          [appearance]="['circle', '']"
          [theme]="[{ width: '70px', height: '70px', 'border-radius': '10px' }, { width: '50px', height: '50px', 'border-radius': '5px' }]"
        >
        </ngx-skeleton-loader>
      </div>
    </div>
  `,
})
class ContainerComponent { }

describe('NgxSkeletonLoaderComponent', () => {
  let fixture: any;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ContainerComponent, NgxSkeletonLoaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).createComponent(ContainerComponent);
    fixture.detectChanges();
  }));

  describe('When skeleton is created using default settings', () => {
    it('should render a single skeleton', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .loader').length).toBe(1);
    });
  });

  describe('When skeleton is created with count', () => {
    it('should render skeleton based on given count attribute', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-with-count .loader').length).toBe(
        2,
      );
    });
  });

  describe('When skeleton is created with circle appearance', () => {
    it('should add styles based on circle class on the skeleton components', () => {
      expect(
        fixture.nativeElement.querySelectorAll('.skeletons-appearance-circle .loader.circle')
          .length,
      ).toBe(1);
    });
  });

  describe('When skeleton is created with theming', () => {
    it('should render skeleton with styles based on theme attribute', () => {
      const skeletonWithTheming = fixture.nativeElement.querySelector(
        '.skeletons-with-theming .loader.circle',
      ).attributes as NamedNodeMap;

      expect(skeletonWithTheming.getNamedItem('style').value).toBe(
        'width: 70px; height: 70px; border-radius: 10px;',
      );
    });
  });

  describe('when skeleton is created with multiple theming', () => {
    it('should render skeletons with styles based on theme and appearance attributes', () => {
      const elements = fixture.nativeElement.querySelectorAll('.skeletons-with-multi-theming .loader');

      expect(elements.length).toBe(3);
      expect(elements[0]).toHaveClass('circle');
      expect(elements[0].attributes.getNamedItem('style').value).toBe(
        'width: 70px; height: 70px; border-radius: 10px;',
      );
      expect(elements[1]).not.toHaveClass('circle');
      expect(elements[1].attributes.getNamedItem('style').value).toBe(
        'width: 50px; height: 50px; border-radius: 5px;',
      );
      expect(elements[2]).toHaveClass('circle');
      expect(elements[2].attributes.getNamedItem('style').value).toBe(
        'width: 70px; height: 70px; border-radius: 10px;',
      );
    });
  });
});
