import { Component, OnInit, Renderer2, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatDialog } from '@angular/material';
import { AddtaskTimeComponent } from '../add-tasktime/add-tasktime.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CreatePdfComponent } from '../manage-timesheet/create-pdf/create-pdf.component';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.css']
})
export class EditTimesheetComponent implements OnInit {
  dataSource;
  taskArray=[];
  options = [];
  timelogs = [];
  timesheet = JSON.parse(localStorage.getItem("timesheet"));
  timeSheetName= this.timesheet.name;
  projectId = this.timesheet.projectId;
  logIds = this.timesheet.logIds;
  displayedColumns = ['select', 'date', 'task', 'subtask', 'desc', 'duration'];
  constructor( public dialog: MatDialog,private http: HttpClient,private renderer: Renderer2,@Inject(DOCUMENT) private document: Document,private router: Router) { }

  ngOnInit() {
    this.getRejectedTimelogs(this.logIds);
  }

  onTaskSelect(event, task) {
    if (event.checked) {
      this.taskArray.push(task);
      console.log(this.taskArray.length);
    } else {
      for(let x=0;x<this.taskArray.length;x++){
        if(task.id == this.taskArray[x].id)
        this.taskArray.splice(x, 1);
        console.log(this.taskArray.length);
       }
    }
  }

  displayDate(data) {
    var dateref = new Date(data);
    var date = moment(dateref).format('DD-MM-YYYY');
    return date.toString();
  }

  // addTimeLog(): void {
  //   if (this.taskArray.length == 1) {
  //     const dialogRef = this.dialog.open(AddtaskTimeComponent, {
  //       data: {
  //         options: this.options,
  //         task : this.taskArray[0]
  //       }
  //     });

  //     dialogRef.afterClosed().subscribe(result => {
  //       // this.taskArray = [];
  //     });
  //   }
  // }

  editTimeLog() {
    const dialogRef1 = this.dialog.open(AddtaskTimeComponent, {
      data: {
        edit: true,
        subTask: this.taskArray[0],
        options: this.options
      }
    });

    dialogRef1.afterClosed().subscribe(result => {
      this.taskArray = [];
      this.getRejectedTimelogs(this.logIds);
    });
  }

  getRejectedTimelogs(logIds) {
    this.http.post(environment.rejectedTimelogs, {
      "logIds" : logIds
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          console.log(res);
          this.dataSource = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

   reSubmitTimeLog() {
    this.renderer.addClass(this.document.body, 'embedded-body');
    const dialogRef = this.dialog.open(CreatePdfComponent, {
      data:this.dataSource
    });
    dialogRef.afterClosed().subscribe(result => {
      localStorage.removeItem("timesheet");
      this.router.navigate(["/Timesheet/MyTimesheet"]);
    });
  }

}
