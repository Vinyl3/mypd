import { Component, OnInit, Input, ElementRef, ViewChild, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.css'],
})
export class CreatePdfComponent implements OnInit {

  // @Input() showMePartially: boolean;
  show: boolean = true;
  panelOpenState = false;
  isDisabled = true;
  taskArray = [];
  subtaskArray = [];
  date: any;
  dataSource;
  displayedColumns = ['date', 'task', 'subtask', 'description', 'duration'];
  billingPeriod;
  submittedOn;
  userName;
  timesheetName; 

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public CommonUtilService: CommonUtilService,
    public dialogRef: MatDialogRef<CreatePdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dataSource = this.data;
    if(localStorage.getItem("timesheet")){
      let timesheet = JSON.parse(localStorage.getItem("timesheet"));
      this.timesheetName = timesheet.name;
      this.billingPeriod = timesheet.billingTime
      this.submittedOn = moment(new Date()).format('DD-MM-YYYY').toString();
      this.userName = localStorage.getItem("userFName") + " " + localStorage.getItem("userLName");
    }else{
      this.billingPeriod = moment(new Date()).format('MMMM-YYYY').toString();
      this.submittedOn = moment(new Date()).format('DD-MM-YYYY').toString();
      this.userName = localStorage.getItem("userFName") + " " + localStorage.getItem("userLName");
      this.timesheetName = localStorage.getItem("userFName") + localStorage.getItem("userLName") + "_" + JSON.parse(localStorage.getItem("currentProject")).name + "_" + moment(new Date()).format().slice(0, 19).replace('T', ' ');
    }
  }

  public captureScreen() {
    this.show = false;
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');

      // -------------------- Start Code to create the PDF------------------------------
      let pdf = new jspdf('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      // pdf.save('MYPdf.pdf');
      var file = pdf.output('datauristring');// convert to base 64
      this.savePDF(file);
      // --------------------End Code to create the PDF------------------------------
    });
  }

  getTotalTime() {
    return this.dataSource.map(t => t.duration).reduce((acc, value) => acc + value, 0);
  }

  agreeButton(event) {
    if (event.checked) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  displayDate(data) {
    var dateref = new Date(data);
    var date = moment(dateref).format('DD-MM-YYYY');
    return date.toString();
  }

  closePdf() {
    this.renderer.removeClass(this.document.body, 'embedded-body');
    this.dialogRef.close();
  }

  savePDF(data) {
    this.http.post(environment.timesheetPDFUpload, {
    'pdf': data,
    'fileName': this.timesheetName
    })
    .subscribe(
      (res: any) => {
        if (res.status == 1) {
          if(localStorage.getItem("timesheet")){
            this.reSubmitTimesheet();
          }else{
            this.timesheetEntryinDB();
          }
          console.log("Timesheet PDF uploaded successfully !")
        }
      },
      err => {
        console.log("Error in PDF saving !");
      }
    );
  }

  timesheetEntryinDB() {
    let logIds = [];
    for (let x = 0; x < this.dataSource.length; x++) {
      logIds.push(this.dataSource[x].id);
    }
    this.http.post(environment.submitTimesheet, {
      "data": {
        "name": this.timesheetName,
        "submittedOn": moment(new Date()).format().slice(0, 19).replace('T', ' '),
        "billingTime": this.billingPeriod,
        "companyId": localStorage.getItem("companyId"),
        "userId": sessionStorage.getItem("userId"),
        "projectId": JSON.parse(localStorage.getItem("currentProject")).id,
        "status": "submitted",
        "logIds": logIds.toString()
      }
    })
   .subscribe(
      (res: any) => {
        if (res.success) {
          this.show = true;
          this.dialogRef.close();
          console.log("Timesheet saved successfully !");
        }
      },
    err => {
      console.log("Error in Timesheet saving !");
    }
  );
  }

  reSubmitTimesheet() {
    this.http.post(environment.reSubmitTimesheet, {
    'logId': JSON.parse(localStorage.getItem("timesheet")).id,
    })
    .subscribe(
      (res: any) => {
        if (res.status == 1) {
          this.dialogRef.close();
          console.log("Timesheet ReSubmitted successfully !")
        }
      },
      err => {
        console.log("Error in Timesheet ReSubmission !");
      }
    );
  }
  
}

