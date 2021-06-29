import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import {AddProductComponent} from './add-product/add-product.component';
import{ViewproductsComponent} from '../viewproducts/viewproducts.component';
const routes: Routes = [
  { path: '', component: AdminComponent },
  {path:"add-product",component:AddProductComponent},
  {path:"viewproducts",component:ViewproductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
