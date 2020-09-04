import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { HeaderGivbuxModule } from '../header-givbux/header-givbux.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HeaderGivbuxModule,
    SharedModule
  ],
  declarations: [
    HomePage,
  ]
})
export class HomePageModule {}
