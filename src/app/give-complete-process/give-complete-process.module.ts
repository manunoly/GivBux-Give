import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GiveCompleteProcessPageRoutingModule } from './give-complete-process-routing.module';

import { GiveCompleteProcessPage } from './give-complete-process.page';
import { HeaderGivbuxModule } from '../header-givbux/header-givbux.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GiveCompleteProcessPageRoutingModule,
    HeaderGivbuxModule,
    SharedModule
  ],
  declarations: [GiveCompleteProcessPage]
})
export class GiveCompleteProcessPageModule {}
