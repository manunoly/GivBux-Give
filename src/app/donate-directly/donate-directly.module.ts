import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateDirectlyPageRoutingModule } from './donate-directly-routing.module';

import { DonateDirectlyPage } from './donate-directly.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateDirectlyPageRoutingModule,
    SharedModule
  ],
  declarations: [DonateDirectlyPage]
})
export class DonateDirectlyPageModule {}
