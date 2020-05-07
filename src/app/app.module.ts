import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { LoginComponent } from './login/login.component';
//import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { MyOrderListComponent } from './Orders/my-order-list/my-order-list.component';
import { PendingOrdersComponent } from './Orders/my-order-list/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './Orders/my-order-list/completed-orders/completed-orders.component';
import { LogoutComponent } from './logout/logout.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SelectedProductComponent } from './product-list/selected-product/selected-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    //SignUpComponent,
    DashboardComponent,
    UserProfileComponent,
    HeaderComponent,
    MyOrderListComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent,
    LogoutComponent,
    MyCartComponent,
    ProductListComponent,
    SelectedProductComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
