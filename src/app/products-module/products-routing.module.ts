import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { AllProductsComponent } from './all-products/all-products.component';

const routes : Routes = [
    {path : '', component: AllProductsComponent}
];

 
export const productsRoutingModule = RouterModule.forChild(routes);

 