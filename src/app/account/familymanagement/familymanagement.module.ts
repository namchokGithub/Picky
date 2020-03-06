import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FamilymanagementPageRoutingModule } from './familymanagement-routing.module';

import { FamilymanagementPage } from './familymanagement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FamilymanagementPageRoutingModule
  ],
  declarations: [FamilymanagementPage]
})
export class FamilymanagementPageModule {}
