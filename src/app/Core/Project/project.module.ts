import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectRoutingModule, routingComponents } from './project-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../Shared/material/material.module';
import { TabsModule } from "ngx-tabs";
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    ProjectRoutingModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    MaterialModule,
    TabsModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    routingComponents
  ]
})
export class ProjectModule {


 }
