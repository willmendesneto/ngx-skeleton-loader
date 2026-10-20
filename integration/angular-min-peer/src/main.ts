import { Component, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NgxSkeletonLoaderComponent, provideNgxSkeletonLoader } from 'ngx-skeleton-loader';

// Uses the public API of the package, compiled with `strictTemplates`
@Component({
  selector: 'app-root',
  imports: [NgxSkeletonLoaderComponent],
  template: `
    <ngx-skeleton-loader count="3" />
    <ngx-skeleton-loader appearance="circle" animation="pulse" />
    <ngx-skeleton-loader appearance="square" size="40" measureUnit="px" />
    <ngx-skeleton-loader animation="false" [theme]="{ height: '30px' }" />
  `,
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideExperimentalZonelessChangeDetection(), provideNgxSkeletonLoader({ animation: 'progress' })],
});
