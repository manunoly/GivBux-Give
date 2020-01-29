import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: ':token',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'user/history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'user/donate-automatic',
    loadChildren: () => import('./donate-automatic/donate-automatic.module').then( m => m.DonateAutomaticPageModule)
  },
  {
    path: 'user/donate-directly',
    loadChildren: () => import('./donate-directly/donate-directly.module').then( m => m.DonateDirectlyPageModule)
  },
  {
    path: 'user/success/:typepage',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: '**',
    redirectTo: '', pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
