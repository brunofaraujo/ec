import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from '../../../@core/data/subscription.service';

@Component({
  selector: 'ngx-subscription-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewSubscriptionComponent implements OnInit {

  modalidades;
  loading: boolean = false;
  errors;

  constructor(private subscriptionService: SubscriptionService) {
  }

  getModalidades() {
    this.loading = true;
    this.subscriptionService.getModalidades().subscribe(
      (data) => {
        this.loading = false;
        this.modalidades = data;
      },
      (error) => {
        this.loading = false;
        this.errors = error;
      })
  }

  ngOnInit() {
    this.getModalidades();
  }

}
