import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ThemeModule} from '../../@theme/theme.module';
import {SwitchEditComponent} from './switch-edit/switch-edit.component';

const components = [
  ProfileComponent,
  SwitchEditComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
  ],
  declarations: [...components],
})
export class ProfileModule { }
