import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-add-routing.module';

import { TransactionsAddPage } from './transactions-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule
  ],
  declarations: [TransactionsAddPage]
})
export class TransactionsAddPageModule {}
