import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateDirectlyPage } from './donate-directly.page';

const routes: Routes = [
  {
    path: '',
    component: DonateDirectlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateDirectlyPageRoutingModule {}
