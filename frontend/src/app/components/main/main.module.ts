import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';

@NgModule({
  imports: [
    //CommonModule,
    RouterModule,
    NbLayoutModule,
    NbThemeModule
  ],
  declarations: []
})
export class MainModule { }
