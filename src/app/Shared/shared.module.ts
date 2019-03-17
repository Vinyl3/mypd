import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgControl } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { SharedRoutingModule, routingComponents } from './shared-routing.module';
import { CreditCardDirectivesModule } from 'angular-cc-library';

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
    routingComponents,
    PhoneNumberFormatDirective

  ],
  exports: [
    PhoneNumberFormatDirective
  ],
  
})
export class SharedModule { }
