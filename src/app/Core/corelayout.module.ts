import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';
import { CorelayoutComponent } from './corelayout/corelayout.component';
import { MaterialModule } from '../Shared/material/material.module';
import { CorelayoutRoutingModule } from './corelayout-routing.module';
import { DashboardComponent } from './Dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,
    SidebarModule.forRoot(),
    MaterialModule,
    CorelayoutRoutingModule
  ],
  declarations: [
    CorelayoutComponent,
    DashboardComponent
  ]
})
export class CoreLayoutModule { }
