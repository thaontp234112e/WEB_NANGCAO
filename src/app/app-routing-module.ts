import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionDetail } from './fashion-detail/fashion-detail';
import { Fashion } from './fashion/fashion';

const routes: Routes = [
  {path:"",component:Fashion},
  {path:"fashiondetail/:id",component:FashionDetail},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
