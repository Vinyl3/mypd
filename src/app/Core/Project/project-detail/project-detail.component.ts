import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Location } from '@angular/common';
import {DOCUMENT} from '@angular/common';
import { CommonUtilService } from '../../../services/common-util.service';

@Component({
  selector: 'app-projectdetail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectdetailComponent implements OnInit {

  taskColumns: string[] = ['name', 'assignee', 'estimatedTime', 'delete'];
  userColumns: string[] = ['name', 'email', 'delete'];
  sTaskColumns: string[] = ['name', 'creator', 'edit'];
  dataSource;
  tabType = "Task";
  deleteId = '';
  taskDataSource;
  userDataSource;
  subTaskDataSource;
  removePopup = true;
  project = JSON.parse(localStorage.getItem("prData"))[0];

  constructor(private _location: Location, private http: HttpClient,private router: Router,
    @Inject(DOCUMENT) private document : Document, private renderer :Renderer2, public CommonUtilService: CommonUtilService ) { }


  ngOnInit() {
    this.projecthasTask();
   }

  backClicked() {
    this._location.back();
  }

  removePopUp(tabType,id) {
    var action = tabType == 'User'?'Add/Remove':'Delete';
    if(this.CommonUtilService.isUserAllowed(tabType,this.project.name,action)){
      this.removePopup = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
      this.tabType = tabType;
      this.deleteId = id;
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.removePopup = true;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  removePopUpClose(){
    this.renderer.removeClass(this.document.body, 'embedded-body');
    this.removePopup = true;
  }

  removeTaskorUser(){
    console.log("type = : "+this.tabType+"  id = : "+this.deleteId);
    if(this.tabType == 'User'){
      this.removeUserFromProject();
    }
    if(this.tabType == 'Task'){
      this.removeTaskFromProject();
    }
  }

  removeTaskFromProject(){
    this.http.post(environment.removeTaskFromProject, {
      "projectId": this.project.id,
      "taskId": this.deleteId,
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.projecthasTask();
          this.removePopup = this.removePopup ? false : true;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  removeUserFromProject(){
    this.http.post(environment.removeUserFromProject, {
      "projectId": this.project.id,
      "userId": this.deleteId,
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.projecthasUser();
          this.removePopup = this.removePopup ? false : true;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  permissionType(type) {
    this.tabType = type;
    if (type == 'Task') {
      this.projecthasTask();
    } else if (type == 'User') {
      this.projecthasUser();
    }else if (type == 'SubTask') {
      this.projecthasSubTask();
    }
  }

  modifyProjectPermission(type) {
    localStorage.setItem("prType", this.tabType);
    this.router.navigate(["project/AddTask"]);
  }

  modifyProjectND() {
    if(this.CommonUtilService.isSuperAdmin()){
    this.router.navigate(["project/AddProject"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  projecthasTask() {
    this.http.post(environment.projecthasTask, {
      "projectId": this.project.id
    })
      .subscribe(
        (res: any) => {
          if (res.data) {
            this.taskDataSource = res.data;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  projecthasUser() {
    this.http.post(environment.projecthasUser, {
      "projectId": this.project.id
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.userDataSource = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  projecthasSubTask() {
    this.http.post(environment.projecthasSubTask, {
      "projectId": this.project.id
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.subTaskDataSource = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  editSubTask(subtask){
    if(this.CommonUtilService.isUserAllowed('SubTask',this.project.name,'Edit')){
      localStorage.setItem("subtask", JSON.stringify(subtask));
      this.router.navigate(["project/AddSubTask"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  addTask(){
    if(this.CommonUtilService.isUserAllowed('Task',this.project.name,'Create')){
      this.router.navigate(["project/AddTask"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  addSubTask(){
    if(this.CommonUtilService.isUserAllowed('SubTask',this.project.name,'Create')){
      this.router.navigate(["project/AddSubTask"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  addUser(){
    if(this.CommonUtilService.isUserAllowed('User',this.project.name,'Add/Remove')){
      this.router.navigate(["project/ManageUser"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

}
