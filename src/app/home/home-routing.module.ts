import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'add',
    loadChildren: () => import('../add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'showaccount',
    loadChildren: () => import('../account/showaccount/showaccount.module').then( m => m.ShowaccountPageModule)
  },
  {
    path: 'list-transactions',
    loadChildren: () => import('../transactions/list-transactions/list-transactions.module').then( m => m.ListTransactionsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
