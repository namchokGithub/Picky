import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsAddPageRoutingModule } from './transactions-add-routing.module';

import { TransactionsAddPage } from './transactions-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsAddPageRoutingModule
  ],
  declarations: [TransactionsAddPage]
})
export class TransactionsAddPageModule {}
