import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';

const signUpRoutes : Routes = [
    {path : '', component: SignUpComponent}
]; 
 export const signUpRoutingModule = RouterModule.forChild(signUpRoutes);
 


