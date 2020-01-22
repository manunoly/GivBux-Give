import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  },  {
    path: 'donate-automatic',
    loadChildren: () => import('./donate-automatic/donate-automatic.module').then( m => m.DonateAutomaticPageModule)
  },
  {
    path: 'donate-directly',
    loadChildren: () => import('./donate-directly/donate-directly.module').then( m => m.DonateDirectlyPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
