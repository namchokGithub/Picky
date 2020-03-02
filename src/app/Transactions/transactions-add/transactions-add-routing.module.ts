import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsAddPage } from './transactions-add.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionsAddPageRoutingModule {}
