import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { FaqsComponent } from "./faqs/faqs.component";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';

const routes: Routes = [
  {
    path: 'faqs',
    component: FaqsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'term-conditions',
    component: TermConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule { }
