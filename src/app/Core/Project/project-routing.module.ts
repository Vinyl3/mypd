import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from '../../guard/dashboard.guard';
import { ManageprojectComponent } from './manage-project/manage-project.component';
import { AddprojectComponent } from './add-project/add-project.component';
import { ProjectdetailComponent } from './project-detail/project-detail.component';
import { AddtaskComponent } from './add-task/add-task.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AddSubtaskComponent } from './add-subtask/add-subtask.component';

const routes: Routes = [  
  {path: '', component:ManageprojectComponent,canActivate:[DashboardGuard]},
  {path:'ManageProject', component: ManageprojectComponent,canActivate: [DashboardGuard]},
  {path:'AddProject', component: AddprojectComponent,canActivate: [DashboardGuard]},
  {path:'ProjectDetail', component: ProjectdetailComponent,canActivate: [DashboardGuard]},
  {path:'AddTask', component: AddtaskComponent,canActivate: [DashboardGuard]},
  {path:'AddSubTask', component: AddSubtaskComponent,canActivate: [DashboardGuard]},
  {path:'ManageUser', component: ManageUserComponent,canActivate: [DashboardGuard]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class ProjectRoutingModule { }
  
  export const routingComponents = [
    ManageprojectComponent,
    AddprojectComponent,
    ProjectdetailComponent,
    AddtaskComponent,
    ManageUserComponent,
    AddSubtaskComponent,
  ]
  