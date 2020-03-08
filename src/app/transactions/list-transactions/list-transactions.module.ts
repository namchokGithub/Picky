import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListTransactionsPageRoutingModule } from './list-transactions-routing.module';

import { ListTransactionsPage } from './list-transactions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListTransactionsPageRoutingModule
  ],
  declarations: [ListTransactionsPage]
})
export class ListTransactionsPageModule {}
