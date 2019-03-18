import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SharedRoutingModule} from './shared-routing.module';
import { CreditCardDirectivesModule } from 'angular-cc-library';
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
import { PhoneNumberFormatDirective } from './company-admin-registeration/admin-register/admin-register1/phone-number-format.directive';

@NgModule({
  imports: [
    SharedRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CreditCardDirectivesModule
  ],  
  declarations:[
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
    InnerfooterComponent,
    ChooseYourPlanComponent,
    PhoneNumberFormatDirective
  ],
  exports: [
    PhoneNumberFormatDirective
  ],
  
})
export class SharedModule { }
