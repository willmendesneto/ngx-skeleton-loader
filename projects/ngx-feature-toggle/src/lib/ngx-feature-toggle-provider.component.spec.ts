import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync as asyncMethod } from '@angular/core/testing';
import { FeatureToggleProviderComponent } from './ngx-feature-toggle-provider.component';
import { FeatureToggleDirective } from './ngx-feature-toggle.directive';
import { set, FeatureToggleServiceConfig } from 'feature-toggle-service';

@Component({
  selector: 'ngx-container',
  standalone: true,
  imports: [FeatureToggleProviderComponent, FeatureToggleDirective],
  template: `
    <div>
      <ngx-feature-toggle-provider [features]="featureToggleData">
        <div class="feature-toggle-component" *ngxFeatureToggle="'enableFirstText'">
          <p>Enabled content</p>
          <div class="feature-toggle-component" *ngxFeatureToggle="'enableSecondText'">Disabled content</div>
        </div>
      </ngx-feature-toggle-provider>
    </div>
  `,
})
class ContainerComponent {
  featureToggleData: FeatureToggleServiceConfig = {
    enableFirstText: true,
    enableSecondText: false,
  };
}

describe('Component: FeatureToggleProviderComponent', () => {
  let fixture: any;
  let nativeElement: any;

  beforeEach(
    asyncMethod(() => {
      set({ enableFirstText: true });

      fixture = TestBed.configureTestingModule({
        imports: [ContainerComponent],
        schemas: [NO_ERRORS_SCHEMA],
      }).createComponent(ContainerComponent);
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    }),
  );

  afterEach(() => {
    set({ enableFirstText: false });
  });

  it('should render the enabled children content', () => {
    const elementText = fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].innerText;
    expect(elementText).toContain('Enabled content');
  });

  it('should NOT render the disabled content', () => {
    const elementText = fixture.nativeElement.querySelectorAll('.feature-toggle-component')[0].innerText;
    expect(elementText).not.toContain('Disabled content');
  });
});
