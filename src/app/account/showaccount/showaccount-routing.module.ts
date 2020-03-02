import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowaccountPage } from './showaccount.page';

const routes: Routes = [
  {
    path: '',
    component: ShowaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowaccountPageRoutingModule {}
