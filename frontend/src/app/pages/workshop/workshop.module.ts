import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopRoutingModule } from './workshop-routing.module';
import { WorkshopComponent } from './workshop.component';
import {ThemeModule} from '../../@theme/theme.module';

const components = [
  WorkshopComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    WorkshopRoutingModule,
  ],
  declarations: [...components],
})
export class WorkshopModule { }
