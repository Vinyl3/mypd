import { Component, OnInit, Inject, ElementRef, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { CommonUtilService } from '../../../services/common-util.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddtaskTimeComponent } from '../add-tasktime/add-tasktime.component';
import * as moment from 'moment';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { CreatePdfComponent } from './create-pdf/create-pdf.component';

@Component({
  selector: 'app-manage-timesheet',
  templateUrl: './manage-timesheet.component.html',
  styleUrls: ['./manage-timesheet.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ManagetimesheetComponent implements OnInit {
  timelogs = [];
  options = [];
  //showVar = false;
  isPopupHidden = true;
  panelOpenState = false;
  isDisabled = true;
  taskArray = [];
  subtaskArray = [];
  date: any;
  projectList = [];
  displayedColumns = ['select', 'plusminusicon', 'task', 'subtask', 'date', 'duration'];
  subTaskColumn = ['select', 'blank1', 'blank2', 'subtask', 'duration', 'date'];
  sectionList = [];
  currentIndex;
  currentSubTaskIndex;
  allTasks;
  taskIndex = -1;
  stIndex = [];
  
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public CommonUtilService: CommonUtilService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private changeDetectorRefs: ChangeDetectorRef) {
    this.date = new Date();
  }

  ngOnDestroy(){
    this.CommonUtilService.greenMsgRibbonIsHidden = true;
  }

  ngOnInit() {
    this.getAllProject();
    this.CommonUtilService.activeSubPoint = 'timesheet';
  }

  getAllProject() {
    this.http.post(environment.userhasProjects, {
      "companyId" : localStorage.getItem("companyId"),
      "userId" : sessionStorage.getItem("userId"),
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

  getTaskSubTaskList(project){
    localStorage.setItem("projectId",project.id);
    localStorage.setItem("currentProject",JSON.stringify(project));
    this.getTaskList(project);
    this.getSubTaskList(project);
    this.getUserTimelogs(project.id);
  }

  getTaskList(project) {
    this.http.post(environment.userhasTasks, {
      "projectId" : project.id,
      "userId" : sessionStorage.getItem("userId")
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.allTasks = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getSubTaskList(project) {
    this.http.post(environment.projecthasSubTask, {
      "projectId" : project.id      
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.options = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getUserTimelogs(projectId) {
    this.http.post(environment.userTimeLogs, {
      "projectId" : projectId,
      "userId" : sessionStorage.getItem("userId")   
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.timelogs = res.data;
          console.log(this.timelogs);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onTaskSelect(event, task, index) {
    this.subtaskArray = [];
    this.stIndex = [];
    this.taskArray = [];
    if (event.checked) {
      this.taskIndex = index;
      this.taskArray.push(task);
    } else {
      this.taskArray = [];
      this.taskIndex = -1;
    }
  }

  onSubTaskSelect(event, subtask,stIndex,tIndex) {
    this.taskArray = [];
    this.taskIndex = -1;
    if (event.checked) {
      this.stIndex.push(stIndex);
      this.subtaskArray.push(subtask);
    } else {
      for (let x = 0; x < this.subtaskArray.length; x++) {
        if (subtask.id === this.subtaskArray[x].id) {
          this.subtaskArray.splice(x, 1);
        }
      }
      for (let x = 0; x < this.stIndex.length; x++) {
        if (stIndex === this.stIndex[x]) {
          this.stIndex.splice(x, 1);
        }
      }
    }
  }

  deleteTimelogs() {
    let logIds = []
    for (let x = 0; x < this.subtaskArray.length; x++) {
        logIds.push(this.subtaskArray[x].id);
      }
    this.http.post(environment.deleteTimelogs, {
      "ids" : logIds.toString(),
      "userId" : sessionStorage.getItem("userId")   
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.isPopupHidden = true;
          this.subtaskArray = [];
          this.stIndex = [];
          this.getUserTimelogs(localStorage.getItem("projectId"));
        }
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "Timelog / Timelogs deleted successfully";
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  cancelDelete() {
     this.isPopupHidden = this.isPopupHidden ? false : true;
  }

  submitTimeLog() {
    // this.renderer.addClass(this.document.body, 'embedded-body');
    const dialogRef = this.dialog.open(CreatePdfComponent, {
      data:this.timelogs
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserTimelogs(localStorage.getItem("projectId"));
    });
  }

  addTimeLog(): void {
    if (this.taskArray.length == 1) {
      const dialogRef = this.dialog.open(AddtaskTimeComponent, {
        data: {
          options: this.options,
          task : this.taskArray[0]
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.taskArray = [];
        this.taskIndex = -1;
        this.getUserTimelogs(localStorage.getItem("projectId"));
        this.getSubTaskList(JSON.parse(localStorage.getItem("currentProject")));
      });
    }
  }

  editTimeLog() {
    const dialogRef1 = this.dialog.open(AddtaskTimeComponent, {
      data: {
        edit: true,
        subTask: this.subtaskArray[0],
        options: this.options
      }
    });

    dialogRef1.afterClosed().subscribe(result => {
      this.subtaskArray = [];
      this.stIndex = [];
      this.getUserTimelogs(localStorage.getItem("projectId"));
      this.getSubTaskList(JSON.parse(localStorage.getItem("currentProject")));
    });
  }

  displayDate(data) {
    var dateref = new Date(data);
    var date = moment(dateref).format('DD-MM-YYYY');
    return date.toString();
  }

}
