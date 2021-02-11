import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBankAccountPageRoutingModule } from './add-bank-account-routing.module';

import { AddBankAccountPage } from './add-bank-account.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddBankAccountPageRoutingModule,
    SharedModule
  ],
  declarations: [AddBankAccountPage]
})
export class AddBankAccountPageModule {}
