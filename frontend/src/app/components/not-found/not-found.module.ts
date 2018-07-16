import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbLayoutModule, NbThemeModule, NbCardModule } from '@nebular/theme';

@NgModule({
  imports: [
    //CommonModule
    RouterModule,
    NbThemeModule,
    NbLayoutModule,
    NbCardModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
