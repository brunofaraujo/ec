import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ThemeModule} from '../../@theme/theme.module';
import {SwitchEditComponent} from './switch-edit/switch-edit.component';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NbAlertModule} from '@nebular/theme';
import {PasswordModalComponent} from './password-modal/password-modal.component';
import {NbAuthModule} from '../../@auth';

const components = [
  ProfileComponent,
  SwitchEditComponent,
  PasswordModalComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    ProfileRoutingModule,
    NgbTooltipModule,
    NbAlertModule,
    NbAuthModule,
  ],
  declarations: [...components],
  entryComponents: [PasswordModalComponent],
})
export class ProfileModule { }
