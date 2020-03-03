import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'list-transactions',
        children: [
          {
            path: '',
            // tslint:disable-next-line: max-line-length
            loadChildren: () => import('../transactions/list-transactions/list-transactions.module').then( m => m.ListTransactionsPageModule)
          }
        ]
      },
      {
        path: 'showaccount',
        children: [
          {
            path: '',
            // tslint:disable-next-line: max-line-length
            loadChildren: () => import('../account/showaccount/showaccount.module').then( m => m.ShowaccountPageModule)
          }
        ]
      },
      {
        path: 'transactions-add',
        children: [
          {
            path: '',
            // tslint:disable-next-line: max-line-length
            loadChildren: () => import('../transactions/transactions-add/transactions-add.module').then( m => m.TransactionsAddPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/list-transactions',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
