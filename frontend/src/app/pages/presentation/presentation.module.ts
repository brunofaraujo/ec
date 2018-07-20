import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresentationRoutingModule } from './presentation-routing.module';
import { PresentationComponent } from './presentation.component';
import {ThemeModule} from '../../@theme/theme.module';

const components = [
  PresentationComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    PresentationRoutingModule,
  ],
  declarations: [...components],
})
export class PresentationModule { }
