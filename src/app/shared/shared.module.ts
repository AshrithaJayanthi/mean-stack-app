import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ViewproductsComponent } from '../viewproducts/viewproducts.component'


@NgModule({
 imports:      [ CommonModule ],
 declarations: [  ViewproductsComponent],
 exports:      [ CommonModule, FormsModule ]
})
export class SharedModule { }