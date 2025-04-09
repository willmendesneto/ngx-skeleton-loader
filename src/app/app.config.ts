import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { NgxSkeletonLoaderModule } from '../../projects/ngx-skeleton-loader/src/public-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
		importProvidersFrom(
			NgxSkeletonLoaderModule.forRoot({
        theme: {
          extendsFromRoot: true,
          height: '30px',
        },
      }),
		),
  ]
};
