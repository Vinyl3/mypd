import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAMRoutingModule, routingComponents } from './iam-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../Shared/material/material.module';
import {TabsModule} from "ngx-tabs";


@NgModule({
  imports: [
    IAMRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
    TabsModule,
    RouterModule.forChild([])
  ],
  declarations: [
    routingComponents,
  ]
})
export class IAMModule {
 

 }
