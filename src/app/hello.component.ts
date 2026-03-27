import { isPlatformBrowser } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FeatureToggleProviderComponent,
  FeatureToggleDirective,
} from '../../projects/ngx-feature-toggle/src/public-api';

@Component({
  selector: 'ngx-app-hello',
  templateUrl: './hello.component.html',
  standalone: true,
  imports: [FeatureToggleProviderComponent, FeatureToggleDirective],
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `,
  ],
})
export class HelloComponent implements OnInit, OnDestroy {
  @Input() name: string = '';

  anotherFeatureToggleData: Record<string, boolean> = {
    enableAnother: true,
  };

  private intervalId: ReturnType<typeof setInterval> | undefined;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        Object.keys(this.anotherFeatureToggleData).forEach(
          key => (this.anotherFeatureToggleData[key] = !this.anotherFeatureToggleData[key]),
        );
      }, 2000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
