import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessPageRoutingModule } from './success-routing.module';

import { SuccessPage } from './success.page';
import { HeaderGivbuxModule } from '../header-givbux/header-givbux.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessPageRoutingModule,
    HeaderGivbuxModule
  ],
  declarations: [SuccessPage]
})
export class SuccessPageModule {}
