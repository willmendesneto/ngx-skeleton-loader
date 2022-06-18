import { Component, OnInit } from '@angular/core';
import {
  NgxSkeletonLoaderConfigTheme
} from "../../../projects/ngx-skeleton-loader/src/lib/ngx-skeleton-loader-config.types";

@Component({
  selector: 'app-skeleton-attribute',
  templateUrl: './skeleton-attribute.component.html',
  styleUrls: ['./skeleton-attribute.component.scss']
})
export class SkeletonAttributeComponent implements OnInit {

  loading: boolean = true;
  menuStyle: NgxSkeletonLoaderConfigTheme = {
    backgroundColor: 'rgba(85,149,245,0.5)',
    height: '22px',
    marginRight: '10px',
    marginTop: 'auto',
    top: '22%'
  };


  constructor() { }

  ngOnInit(): void {
  }

  toggleLoading() {
    this.loading = !this.loading;
  }


}
