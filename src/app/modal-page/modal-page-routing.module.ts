import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPagePage } from './modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPagePageRoutingModule {}
