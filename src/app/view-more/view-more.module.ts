import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMorePageRoutingModule } from './view-more-routing.module';

import { ViewMorePage } from './view-more.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMorePageRoutingModule,
    SharedModule
  ],
  declarations: [ViewMorePage]
})
export class ViewMorePageModule {}
