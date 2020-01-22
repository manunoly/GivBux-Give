import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateDirectlyPageRoutingModule } from './donate-directly-routing.module';

import { DonateDirectlyPage } from './donate-directly.page';
import { HeaderGivbuxModule } from '../header-givbux/header-givbux.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateDirectlyPageRoutingModule,
    HeaderGivbuxModule
  ],
  declarations: [DonateDirectlyPage]
})
export class DonateDirectlyPageModule {}
