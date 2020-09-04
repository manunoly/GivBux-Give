import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessDirectlyPageRoutingModule } from './success-directly-routing.module';

import { SuccessDirectlyPage } from './success-directly.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessDirectlyPageRoutingModule,
    SharedModule
  ],
  declarations: [SuccessDirectlyPage]
})
export class SuccessDirectlyPageModule {}
