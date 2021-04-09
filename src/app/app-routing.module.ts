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
    path: 'user/view-more',
    loadChildren: () => import('./view-more/view-more.module').then( m => m.ViewMorePageModule)
  },
  {
    path: 'user/success-directly',
    loadChildren: () => import('./success-directly/success-directly.module').then( m => m.SuccessDirectlyPageModule)
  },
  {
    path: 'add-bank-account',
    loadChildren: () => import('./add-bank-account/add-bank-account.module').then( m => m.AddBankAccountPageModule)
  },
  {
    path: 'user/give-complete-process',
    loadChildren: () => import('./give-complete-process/give-complete-process.module').then( m => m.GiveCompleteProcessPageModule)
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
