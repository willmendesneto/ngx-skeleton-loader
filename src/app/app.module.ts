import { APP_ID, NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  NgxSkeletonLoaderModule
} from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    NgxSkeletonLoaderModule.forRoot({
      theme: {
        extendsFromRoot: true,
        height: '30px',
      },
    }),
  ],
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: APP_ID,  useValue: 'serverApp' }
  ],
})
export class AppModule {}
