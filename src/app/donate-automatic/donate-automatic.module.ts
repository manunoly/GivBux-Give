import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonateAutomaticPageRoutingModule } from './donate-automatic-routing.module';

import { DonateAutomaticPage } from './donate-automatic.page';
import { HeaderGivbuxModule } from '../header-givbux/header-givbux.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonateAutomaticPageRoutingModule,
    HeaderGivbuxModule
  ],
  declarations: [DonateAutomaticPage]
})
export class DonateAutomaticPageModule {}
