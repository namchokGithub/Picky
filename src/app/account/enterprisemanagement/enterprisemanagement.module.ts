import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterprisemanagementPageRoutingModule } from './enterprisemanagement-routing.module';

import { EnterprisemanagementPage } from './enterprisemanagement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterprisemanagementPageRoutingModule
  ],
  declarations: [EnterprisemanagementPage]
})
export class EnterprisemanagementPageModule {}
