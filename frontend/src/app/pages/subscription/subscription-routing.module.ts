import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SubscriptionComponent} from './subscription.component';
import {NewSubscriptionComponent} from './new/new.component';
import {CurrentSubscriptionComponent} from './current/current.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
    children: [
      {
        path: 'new',
        component: NewSubscriptionComponent,
      },
      {
        path: 'current',
        component: CurrentSubscriptionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {
}

export const routedComponents = [
  SubscriptionComponent,
  NewSubscriptionComponent,
  CurrentSubscriptionComponent,
];
