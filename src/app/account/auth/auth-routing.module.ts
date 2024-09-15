import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { SigninComponent } from './signin/signin.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { LogoutComponent } from './logout/logout.component';
import { Error404Component } from './errors/error404/error404.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'pass-reset',
    component: PassResetComponent,
  },
  {
    path: 'pass-change',
    component: PassChangeComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '404', 
    component:Error404Component
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
