import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ThemeModule} from "../../@theme/theme.module";

const components = [
  ProfileComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    ProfileRoutingModule
  ],
  declarations: [...components]
})
export class ProfileModule { }
