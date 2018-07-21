import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-subscription',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class SubscriptionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
