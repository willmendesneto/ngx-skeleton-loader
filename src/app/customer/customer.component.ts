import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Customer {
  id: number;
  name: string;
}

@Component({
  selector: 'app-customer',
  styleUrls: ['./customer.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <p>Customer List</p>
    <ul>
      <li *ngFor="let customer of customers">
        <a
          [routerLink]="['/customer', customer.id]"
          [routerLinkActiveOptions]="{ exact: true }"
          routerLinkActive="active"
          >{{ customer.name }}</a
        >
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  private router = inject(Router);

  ngOnInit() {
    this.customers = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' },
    ];
  }
}
