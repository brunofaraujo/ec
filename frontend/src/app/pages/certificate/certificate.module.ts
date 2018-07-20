import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateComponent } from './certificate.component';
import {ThemeModule} from '../../@theme/theme.module';

const components = [
  CertificateComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CertificateRoutingModule,
  ],
  declarations: [...components],
})
export class CertificateModule { }
