import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { productsRoutingModule } from './products-routing.module';
import { AllProductsFiltersComponent } from './all-products-filters/all-products-filters.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductListingComponent } from './product-listing/product-listing.component';

@NgModule({
  declarations: [ AllProductsFiltersComponent,AllProductsComponent, ProductListingComponent],
  imports: [
    CommonModule,
    productsRoutingModule
  ]
})
export class productsModuleModule { }
