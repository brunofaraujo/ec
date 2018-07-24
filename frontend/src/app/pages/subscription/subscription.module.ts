import {NgModule} from '@angular/core';
import {SubscriptionRoutingModule, routedComponents} from './subscription-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    SubscriptionRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class SubscriptionModule {
}
