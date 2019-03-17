import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { CommonUtilService } from '../../../services/common-util.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { DOCUMENT } from '@angular/common'; 
import { PdfViewComponent } from '../review-timesheet/pdf-view/pdf-view.component';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-my-timesheet',
  templateUrl: './my-timesheet.component.html',
  styleUrls: ['./my-timesheet.component.css']
})
export class MyTimesheetComponent implements OnInit {

  showVar: boolean = false;
  isPopupHidden=true;
  src:any;
  taskArray = [];
  date: any;
  displayedColumns: string[] = ['timesheet', 'submittedDate','billing', 'status', 'resubmit'];
  dataSource;

  constructor(public dialog: MatDialog, public CommonUtilService: CommonUtilService, @Inject(DOCUMENT) private document: Document,
  private renderer: Renderer2,private http: HttpClient,private router: Router) {
    
  }

  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "mytimesheet";
    this.getUserTimesheets();
  }

  displayDate(data) {
    var dateref = new Date(data);
    var date = moment(dateref).format('DD-MM-YYYY');
    return date.toString();
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

  editTimelog(timesheet){
    localStorage.setItem("timesheet" ,JSON.stringify(timesheet));
    this.router.navigate(["/Timesheet/EditTimesheet"]);
    console.log(timesheet);
  }

  getUserTimesheets() {
    this.http.post(environment.userTimesheets, {
      "userId" : sessionStorage.getItem("userId"),
      "companyId" : localStorage.getItem("companyId")
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



}