import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterprisemanagementPage } from './enterprisemanagement.page';

const routes: Routes = [
  {
    path: '',
    component: EnterprisemanagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterprisemanagementPageRoutingModule {}
