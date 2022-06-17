import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture-cards',
  template: `
    <div class="card" style="width: 18rem;">
      <div class="card-header">
        <div class="d-flex flex-row bd-highlight mb-3">
          <div class="pe-3">
            <img [src]="imgUrl"
                 [skeletonShow]="loading"
                 [skeletonType]="'circle'"
                 class="rounded-circle" alt="..." width="80px">
          </div>
          <div class="d-flex flex-column mt-3">
            <h5 class="card-title" [skeletonShow]="loading" [skeletonStyle]="{display: 'block'}">{{name}}</h5>
            <p class="card-text" [skeletonShow]="loading" [skeletonStyle]="{display: 'block'}">{{title}}</p>
          </div>
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title" [skeletonShow]="loading">Card title</h5>
        <p class="card-text" [skeletonShow]="loading">Some quick example text to build on the card title and make up the
          bulk of the card's
          content.</p>
        <a href="#" class="btn btn-primary" [skeletonShow]="loading">Go somewhere</a>
      </div>
    </div>
  `,
  styles: []
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
