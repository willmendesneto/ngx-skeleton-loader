import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxSkeletonLoaderModule } from '../../projects/ngx-skeleton-loader/src/lib/ngx-skeleton-loader.module';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [NgxSkeletonLoaderModule],
      errorOnUnknownElements: true,
      errorOnUnknownProperties: false,
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngx-skeleton-loader-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ngx-skeleton-loader-demo');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('NGX Skeleton Loader');
  });
});
