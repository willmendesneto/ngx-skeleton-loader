import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxSkeletonLoaderComponent } from './ngx-skeleton-loader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxSkeletonLoaderComponent],
  imports: [CommonModule],
  exports: [NgxSkeletonLoaderComponent],
})

export class NgxSkeletonLoaderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxSkeletonLoaderModule,
    };
  }
}
