import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-app-customer-detail',
  template: '<p>Customer Detail: ID {{ id }}</p>',
  standalone: true,
})
export class CustomerDetailComponent implements OnInit {
  id: number = 0;

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => (this.id = Number(params.get('id'))));
  }
}
