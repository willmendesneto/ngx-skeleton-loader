import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'ngx-skeleton-loader',
  templateUrl: './ngx-skeleton-loader.html',
  styleUrls: ['./ngx-skeleton-loader.scss'],
})
export class NgxSkeletonLoaderComponent implements OnInit {
  @Input()
  count = 1;

  @Input()
  appearance = '';

  @Input() theme: { [k: string]: string } = {};

  styles: { [k: string]: any } = {};

  items: Array<any> = [];

  ngOnInit() {
    this.styles = this.theme || {};
    this.items.length = this.count;
  }
}
