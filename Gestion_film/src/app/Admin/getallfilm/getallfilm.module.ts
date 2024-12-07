import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetallfilmPageRoutingModule } from './getallfilm-routing.module';

import { GetallfilmPage } from './getallfilm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetallfilmPageRoutingModule
  ],
  declarations: [GetallfilmPage]
})
export class GetallfilmPageModule {}
