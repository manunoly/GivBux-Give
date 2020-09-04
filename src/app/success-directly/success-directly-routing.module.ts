import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessDirectlyPage } from './success-directly.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessDirectlyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessDirectlyPageRoutingModule {}
