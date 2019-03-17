import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { CommonUtilService } from '../../../services/common-util.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer'; 
import { DOCUMENT } from '@angular/common';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-review-timesheet',
  templateUrl: './review-timesheet.component.html',
  styleUrls: ['./review-timesheet.component.css']
})

export class ReviewTimesheetComponent implements OnInit {
  showVar: boolean = false;
  isPopupHidden=true;
  src:any;
  timesheetArray = [];
  date: any;
  projectList;
  displayedColumns: string[] = ['select', 'timesheet', 'submittedDate', 'status'];
  dataSource ;

  constructor(public dialog: MatDialog, public CommonUtilService: CommonUtilService, @Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2,private http: HttpClient) {
    this.date = new Date();
  }


  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "reviewtimesheet";
    this.getAllProject();
  }

  getTimesheets(project){
    localStorage.setItem("projectId",project.id);
    this.getProjectTimesheets(project.id);
  }

  openPDF(name) {
    this.renderer.addClass(this.document.body, 'embedded-body');
    const dialogRef = this.dialog.open(PdfViewComponent, {
      data : {
        timesheetName :name 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onChange(event, timesheet) {
    if (event.checked) {
      this.timesheetArray.push(timesheet);
    }
    else {
      for (let x = 0; x < this.timesheetArray.length; x++) {
        if (timesheet.id == this.timesheetArray[x].id)
          this.timesheetArray.splice(x, 1);
      }
    }
  }

  getAllProject() {
    this.http.post(environment.userhasProjects, {
      "companyId" : localStorage.getItem("companyId"),
      "userId" : sessionStorage.getItem("userId")
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.projectList = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getProjectTimesheets(projectId) {
    this.http.post(environment.projectTimesheets, {
      "userId" : sessionStorage.getItem("userId"),
      "companyId" : localStorage.getItem("companyId"),
      "projectId" : projectId
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.dataSource = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  approve(){
    let approveIds = [];
    for (let x = 0; x < this.timesheetArray.length; x++) {
    approveIds.push(this.timesheetArray[x].id);
    }
 console.log("projectId = : "+localStorage.getItem("projectId"));
    this.http.post(environment.approveTimesheets, {
      "userId" : sessionStorage.getItem("userId"),
      "approveIds" : approveIds.toString()
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.getProjectTimesheets(localStorage.getItem("projectId"));
        }
      },
      err => {
        console.log("Error occured");
      }
    );

  }

  reject(){
    let rejectIds = [];
    for (let x = 0; x < this.timesheetArray.length; x++) {
    rejectIds.push(this.timesheetArray[x].id);
    }
console.log("projectId = : "+localStorage.getItem("projectId"));
    this.http.post(environment.rejectTimesheets, {
      "userId" : sessionStorage.getItem("userId"),
      "rejectIds" : rejectIds.toString()
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.getProjectTimesheets(localStorage.getItem("projectId"));
        }
      },
      err => {
        console.log("Error occured");
      }
    );

  }

  displayDate(data) {
    var dateref = new Date(data);
    var date = moment(dateref).format('DD-MM-YYYY');
    return date.toString();
  }

}
