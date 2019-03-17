import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardGuard } from '../../guard/dashboard.guard';
import { ManagetimesheetComponent } from './manage-timesheet/manage-timesheet.component';
import { ReviewTimesheetComponent } from './review-timesheet/review-timesheet.component';
import { CreatePdfComponent } from './manage-timesheet/create-pdf/create-pdf.component';
import { PdfViewComponent } from './review-timesheet/pdf-view/pdf-view.component';
import { AddtaskTimeComponent } from './add-tasktime/add-tasktime.component';
import { TaskTimeTemplateComponent } from './add-tasktime/tasktime-template/tasktime-template.component';
import { MyTimesheetComponent } from './my-timesheet/my-timesheet.component';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';

const routes: Routes = [               
  { path: '', component:ManagetimesheetComponent,canActivate:[DashboardGuard] },
  { path: 'ManageTimesheet', component:ManagetimesheetComponent,canActivate:[DashboardGuard] },
  { path: 'AddTaskTime', component:AddtaskTimeComponent,canActivate:[DashboardGuard] },
  { path: 'ReviewTimesheet', component:ReviewTimesheetComponent,canActivate:[DashboardGuard] },
  { path: 'MyTimesheet', component:MyTimesheetComponent,canActivate:[DashboardGuard] },
  { path: 'EditTimesheet', component:EditTimesheetComponent,canActivate:[DashboardGuard] }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    entryComponents: [
      AddtaskTimeComponent,
      CreatePdfComponent,
      PdfViewComponent,
      EditTimesheetComponent
	  ],
    exports: [RouterModule],
    bootstrap:[]
  })
  
  export class TimesheetRoutingModule { }
  export const routingComponents = [
    ManagetimesheetComponent,
    AddtaskTimeComponent,
    TaskTimeTemplateComponent,
    ReviewTimesheetComponent,
    CreatePdfComponent,
    PdfViewComponent,
    MyTimesheetComponent,
    EditTimesheetComponent
   ]
