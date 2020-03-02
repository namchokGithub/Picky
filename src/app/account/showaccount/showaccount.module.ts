import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowaccountPageRoutingModule } from './showaccount-routing.module';

import { ShowaccountPage } from './showaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowaccountPageRoutingModule
  ],
  declarations: [ShowaccountPage]
})
export class ShowaccountPageModule {}
