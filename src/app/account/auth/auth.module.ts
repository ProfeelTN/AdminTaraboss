import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Route
import { AuthRoutingModule } from './auth-routing.module';

// Component
import { SigninComponent } from './signin/signin.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { LogoutComponent } from './logout/logout.component';
import { Error404Component } from './errors/error404/error404.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SigninComponent,
    PassResetComponent,
    PassChangeComponent,
    LogoutComponent,
    Error404Component,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AuthModule { }
