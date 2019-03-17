import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CorelayoutComponent } from './corelayout/corelayout.component';
import { DashboardGuard } from '../guard/dashboard.guard';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { IAMModule } from './IAM/iam.module';
import { TimesheetModule } from './Timesheet/timesheet.module';
import { ProjectModule } from './Project/project.module';

const routes: Routes = [               
    {
        path: '',
        component: CorelayoutComponent,
        canActivate:[DashboardGuard],
        children: [          
          {
            path:'dashboard',
            component: DashboardComponent
          },
          {
            path: 'IAM',         
            loadChildren:() =>IAMModule,
          },
          {
            path: 'Timesheet',
            loadChildren:() =>TimesheetModule
          },
          {
            path:'project',
            loadChildren:() =>ProjectModule,
          }
        ]
      }
  ]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CorelayoutRoutingModule { }
  