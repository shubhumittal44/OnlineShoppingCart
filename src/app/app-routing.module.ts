import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyOrderListComponent } from './Orders/my-order-list/my-order-list.component';
import { PendingOrdersComponent } from './Orders/my-order-list/pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './Orders/my-order-list/completed-orders/completed-orders.component';
import { LogoutComponent } from './logout/logout.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { SelectedProductComponent } from './product-list/selected-product/selected-product.component';
import { LoginModuleModule } from './login-module/login-module.module';
import { SignUpModuleModule } from './sign-up-module/sign-up-module.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./login-module/login-module.module').then(m => LoginModuleModule)},
  {path: 'SignUp', loadChildren: () => import('./sign-up-module/sign-up-module.module').then(m => SignUpModuleModule)},
  {path: 'home', component: DashboardComponent, canActivate : [AuthGuard]},
  {path: 'profile', component: UserProfileComponent, canActivate : [AuthGuard]},
  {
    path: 'MyOrders', 
    component: MyOrderListComponent,
    children: [
      {path: 'pending/:name', component: PendingOrdersComponent},
      {path: 'delivered/:name', component: CompletedOrdersComponent}
    ],
    canActivate : [AuthGuard]
  },
  {path: 'logout', component: LogoutComponent},
  {path: 'myCart', component: MyCartComponent, canActivate : [AuthGuard]},
  {path: 'product/:name', component: SelectedProductComponent, canActivate : [AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
