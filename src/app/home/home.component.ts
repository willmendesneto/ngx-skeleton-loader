import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FeatureToggleProviderComponent,
  FeatureToggleDirective,
} from '../../../projects/ngx-feature-toggle/src/public-api';
import { HelloComponent } from '../hello.component';

@Component({
  selector: 'ngx-app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FeatureToggleProviderComponent, FeatureToggleDirective, HelloComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  featureToggleData: Record<string, boolean> = {
    enableFirstText: false,
    enableSecondText: true,
  };

  private intervalId: ReturnType<typeof setInterval> | undefined;
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        Object.keys(this.featureToggleData).forEach(key => (this.featureToggleData[key] = !this.featureToggleData[key]));
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
