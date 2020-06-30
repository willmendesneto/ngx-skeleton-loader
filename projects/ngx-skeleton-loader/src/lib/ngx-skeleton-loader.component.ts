import { Component, OnInit, Input, isDevMode } from '@angular/core';

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
})
export class NgxSkeletonLoaderComponent implements OnInit {
  @Input()
  count = 1;

  @Input()
  appearance: 'circle' | '' = '';

  @Input()
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' = 'progress';

  @Input() theme: { [k: string]: string } = {};

  items: Array<any> = [];

  ngOnInit() {
    this.items.length = this.count;
    const allowedAnimations = ['progress', 'progress-dark', 'pulse', 'false'];
    if (allowedAnimations.indexOf(this.animation)===-1) {
      // Shows error message only in Development
      if (isDevMode()) {
        console.error(
          `\`NgxSkeletonLoaderComponent\` need to receive 'animation' as: ${allowedAnimations.join(
            ', '
          )}. Forcing default to "progress".`
        );
      }
      this.animation = 'progress';
    }
  }
}
