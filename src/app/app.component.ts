import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngx-skeleton-loader-demo';

  animation = 'pulse';
  intervalId;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress' : 'pulse';
    }, 2000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
