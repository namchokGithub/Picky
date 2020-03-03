import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./Transactions/transactions-add.module').then( m => m.TransactionsPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  }
  ,
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Login/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'showaccount',
    loadChildren: () => import('./account/showaccount/showaccount.module').then( m => m.ShowaccountPageModule)
  },
  {
    path: 'addaccount',
    loadChildren: () => import('./account/addaccount/addaccount.module').then( m => m.AddaccountPageModule)
  },
  {
    path: 'list-transactions',
    loadChildren: () => import('./transactions/list-transactions/list-transactions.module').then( m => m.ListTransactionsPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
