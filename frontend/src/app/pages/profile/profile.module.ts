import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ThemeModule} from '../../@theme/theme.module';
import {SwitchEditComponent} from './switch-edit/switch-edit.component';
import {NgbDatepickerModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NbAlertModule} from '@nebular/theme';
import {PasswordModalComponent} from './password-modal/password-modal.component';
import {NbAuthModule} from '../../@auth';
import {NgxMaskModule} from 'ngx-mask';

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
    NgxMaskModule,
    NgbDatepickerModule,
  ],
  declarations: [...components],
  entryComponents: [PasswordModalComponent],
})
export class ProfileModule { }
