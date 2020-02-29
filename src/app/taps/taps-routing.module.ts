import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapsPage } from './taps.page';

const routes: Routes = [
  {
    path: '',
    component: TapsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapsPageRoutingModule {}
