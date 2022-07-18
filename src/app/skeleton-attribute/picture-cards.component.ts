import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture-cards',
  template: `
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <div class="d-flex flex-row bd-highlight mb-3">
          <div class="pe-3">
            <img [src]="imgUrl"
                 [ngxSkeletonShow]="loading"
                 [ngxSkeletonType]="'circle'"
                 [ngxSkeletonStyle]="{height: '80px'}"
                 class="rounded-circle" alt="..." width="80px">
          </div>
          <div class="d-flex flex-column">
            <h5 class="card-title" [ngxSkeletonShow]="loading" [ngxSkeletonStyle]="{minWidth: '75px', display: 'block'}">{{name}}</h5>
            <p class="card-text" [ngxSkeletonShow]="loading" [ngxSkeletonStyle]="{minWidth: '75px', display: 'block'}">{{title}}</p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title" [ngxSkeletonShow]="loading">Card title</h5>
        <p class="card-text" [ngxSkeletonShow]="loading">Some quick example text to build on the card title and make up the
          bulk of the card'sd-flex
          content.</p>
        <a href="#" class="btn btn-primary" [ngxSkeletonShow]="loading">Go somewhere</a>
      </div>
    </div>
  `,
  styleUrls:['./picture-cards.component.scss']
})
export class PictureCardsComponent implements OnInit {

  @Input()
  imgUrl: string = '';
  @Input()
  name: string = '';
  @Input()
  title: string = '';
  @Input()
  loading: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
