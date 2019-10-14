import { Component, OnInit, Input } from '@angular/core';

import { NgxSkeletonAppearance } from './models/appearance';
import { NgxSkeleton } from './models/skeleton';

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
})
export class NgxSkeletonLoaderComponent implements OnInit {
  @Input() public count: number = 1;
  @Input() public appearance: NgxSkeletonAppearance | NgxSkeletonAppearance[] = ''
  @Input() public theme: { [k: string]: string } | { [k: string]: string }[] = {};

  public skeletonItems: NgxSkeleton[] = [];

  public ngOnInit(): void {
    for (let i = 0; i < this.count; i++) {
      this.skeletonItems.push({
        style: !Array.isArray(this.theme) ? this.theme : this.theme[i] || this.theme[0] || {},
        appearance: !Array.isArray(this.appearance)
          ? this.appearance
          : this.appearance[i] === ''
            ? ''
            : this.appearance[i] || this.appearance[0] || '',
      });
    }
  }
}
