import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD:src/app/Transactions/transactions-add/transactions-add-routing.module.ts
import { TransactionsAddPage } from './transactions-add.page';
=======
import { ListTransactionsPage } from './list-transactions.page';
>>>>>>> origin/Jutamas:src/app/Transactions/transactions-add/list-transactions/list-transactions-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD:src/app/Transactions/transactions-add/transactions-add-routing.module.ts
    component: TransactionsAddPage
=======
    component: ListTransactionsPage
>>>>>>> origin/Jutamas:src/app/Transactions/transactions-add/list-transactions/list-transactions-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTransactionsPageRoutingModule {}
