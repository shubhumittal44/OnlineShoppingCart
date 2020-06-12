import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { MyOrderListComponent } from './Orders/my-order-list/my-order-list.component';
import { PendingOrdersComponent } from './Orders/my-order-list/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './Orders/my-order-list/completed-orders/completed-orders.component';
import { LogoutComponent } from './logout/logout.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import{ AuthGuard } from './auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginAuthGuard } from './core-services/login-AuthGuard';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    HeaderComponent,
    MyOrderListComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent,
    LogoutComponent,
    MyCartComponent,
 
    PageNotFoundComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true
    })
    // ReactiveFormsModule,
    // FormsModule
  ],
  providers: [AuthGuard, LoginAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
