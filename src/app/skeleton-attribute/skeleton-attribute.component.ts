import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-attribute',
  templateUrl: './skeleton-attribute.component.html',
  styleUrls: ['./skeleton-attribute.component.scss']
})
export class SkeletonAttributeComponent implements OnInit {

  loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  toggleLoading() {
    this.loading = !this.loading;
  }


}
