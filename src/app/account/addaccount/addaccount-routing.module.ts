import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddaccountPage } from './addaccount.page';

const routes: Routes = [
  {
    path: '',
    component: AddaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddaccountPageRoutingModule {}
