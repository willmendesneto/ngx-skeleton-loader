import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngx-skeleton-loader-demo';

  animation = 'pulse';
  contentLoaded = false;
  intervalId;

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);

    this.intervalId = setInterval(() => {
      this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
