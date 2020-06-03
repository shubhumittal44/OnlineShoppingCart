import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  signUpRoutingModule } from './signUp-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ColorChangingDirective } from '../directives/color-changing.directive';

@NgModule({
  declarations: [SignUpComponent,
    ColorChangingDirective
  ],
  imports: [
    CommonModule,
    signUpRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
  // exports:[
  //   FormsModule,
  //   ReactiveFormsModule
  // ]
})
export class SignUpModuleModule { }
