import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddaccountPageRoutingModule } from './addaccount-routing.module';

import { AddaccountPage } from './addaccount.page';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddaccountPageRoutingModule
  ],
  declarations: [AddaccountPage]
})
export class AddaccountPageModule {}
