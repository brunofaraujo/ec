import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import {ThemeModule} from '../../@theme/theme.module';

const components = [
  SubscriptionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    SubscriptionRoutingModule,
  ],
  declarations: [...components],
})
export class SubscriptionModule { }
