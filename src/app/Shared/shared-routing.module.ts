import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../guard/login.guard';
import { DashboardGuard } from '../guard/dashboard.guard';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { Registeration1Component } from './user-registeration/registeration1/registeration1.component';
import { Registeration2Component } from './user-registeration/registeration2/registeration2.component';
import { Registeration3Component } from './user-registeration/registeration3/registeration3.component';
import { CompanyRegister1Component } from './company-admin-registeration/company-register/company-register1/company-register1.component';
import { CompanyRegister2Component } from './company-admin-registeration/company-register/company-register2/company-register2.component';
import { AdminRegister1Component } from './company-admin-registeration/admin-register/admin-register1/admin-register1.component';
import { AdminRegister2Component } from './company-admin-registeration/admin-register/admin-register2/admin-register2.component';
import { CreditCardDetailCompanyComponent } from './company-admin-registeration/credit-card/credit-card-detail-company/credit-card-detail-company.component';
import { ChooseYourPlanComponent } from './choose-plan/choose-your-plan/choose-your-plan.component';
import { InnerfooterComponent } from './sharedlayout/innerfooter/innerfooter.component';
const routes: Routes = [      
    { path: '',component: LoginComponent, canActivate:[LoginGuard] },
    { path: 'login',component: LoginComponent, canActivate:[LoginGuard] },
    { path: 'forgetPassword',component: ForgetPasswordComponent, canActivate:[LoginGuard] },
    { path: 'ConfirmPassword',component: ConfirmPasswordComponent, canActivate:[LoginGuard] },
    { path: 'userRegisteration1',component: Registeration1Component , canActivate:[LoginGuard]},
    { path: 'userRegisteration2',component: Registeration2Component, canActivate:[LoginGuard] },
    { path: 'userRegisteration3',component: Registeration3Component, canActivate:[LoginGuard] },
    { path: 'companyRegisteration1',component: CompanyRegister1Component, canActivate:[DashboardGuard]},
    { path: 'companyRegisteration2',component: CompanyRegister2Component, canActivate:[DashboardGuard]},
    { path: 'adminRegisteration1',component: AdminRegister1Component, canActivate:[DashboardGuard]},
    { path: 'adminRegisteration2',component: AdminRegister2Component, canActivate:[DashboardGuard]},
    { path: 'creditCardDetailCompany',component: CreditCardDetailCompanyComponent, canActivate:[DashboardGuard]},
    { path: 'ChooseYourPlan',component: ChooseYourPlanComponent, canActivate:[DashboardGuard]}  
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SharedRoutingModule { }
  export const routingComponents = [
    LoginComponent,
    ForgetPasswordComponent,
    ConfirmPasswordComponent,
    Registeration1Component,
    Registeration2Component,
    Registeration3Component,
    CompanyRegister1Component,
    CompanyRegister2Component,
    AdminRegister1Component,
    AdminRegister2Component,
    CreditCardDetailCompanyComponent,
    ChooseYourPlanComponent,
    InnerfooterComponent
  ]
  