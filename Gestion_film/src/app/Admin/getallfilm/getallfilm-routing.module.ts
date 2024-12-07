import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetallfilmPage } from './getallfilm.page';

const routes: Routes = [
  {
    path: '',
    component: GetallfilmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetallfilmPageRoutingModule {}
