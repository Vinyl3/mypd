import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetRoutingModule, routingComponents } from './timesheet-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../Shared/material/material.module';
import { SidebarModule } from 'ng-sidebar';
import { TabsModule} from 'ngx-tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDialogModule, MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TabsModule,
    SidebarModule.forRoot(),
    TimesheetRoutingModule,
    RouterModule.forChild([]),
    PdfViewerModule,
    MatDialogModule
  ],
  declarations: [routingComponents]
})
export class TimesheetModule {}
