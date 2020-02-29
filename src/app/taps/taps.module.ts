import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TapsPageRoutingModule } from './taps-routing.module';

import { TapsPage } from './taps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TapsPageRoutingModule
  ],
  declarations: [TapsPage]
})
export class TapsPageModule {}
