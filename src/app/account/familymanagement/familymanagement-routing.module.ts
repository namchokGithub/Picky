import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamilymanagementPage } from './familymanagement.page';

const routes: Routes = [
  {
    path: '',
    component: FamilymanagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamilymanagementPageRoutingModule {}
