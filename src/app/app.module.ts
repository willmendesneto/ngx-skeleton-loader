import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSkeletonLoaderModule } from '../../projects/ngx-skeleton-loader/src/lib/ngx-skeleton-loader.module';
import { SkeletonAttributeComponent } from './skeleton-attribute/skeleton-attribute.component';
import { PictureCardsComponent } from './skeleton-attribute/picture-cards.component';

@NgModule({
  declarations: [AppComponent, SkeletonAttributeComponent, PictureCardsComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgxSkeletonLoaderModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
