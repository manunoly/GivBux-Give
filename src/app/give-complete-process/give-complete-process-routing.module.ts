import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GiveCompleteProcessPage } from './give-complete-process.page';

const routes: Routes = [
  {
    path: '',
    component: GiveCompleteProcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GiveCompleteProcessPageRoutingModule {}
