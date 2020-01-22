import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateAutomaticPage } from './donate-automatic.page';

const routes: Routes = [
  {
    path: '',
    component: DonateAutomaticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonateAutomaticPageRoutingModule {}
