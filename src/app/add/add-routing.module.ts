import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPage } from './add.page';

const routes: Routes = [
  {
    path: '',
    component: AddPage
  },  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPageRoutingModule {}
