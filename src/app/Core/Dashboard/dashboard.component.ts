
import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { CommonUtilService } from '../../services/common-util.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataSource;
  displayedColumns = ['srNo', 'name'];
  userEmail = localStorage.getItem("userEmail");
  userId = sessionStorage.getItem("userId");
  userFName = localStorage.getItem("userFName");
  userLName = localStorage.getItem("userLName");
  userName = this.userFName + " " + this.userLName;
  activeProject = 0;
  activeTask = 0;
  projectArray = [];
  taskArray = [];
  tableProjectArray = [];
  tableTaskArray = [];

  constructor( public CommonUtilService: CommonUtilService, private http: HttpClient,private router: Router, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) 
  {}
  
  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "dashboard";
    console.log("userId : " + this.userId);
    this.getActiveProjects();
    this.getActiveTask();
  }

  getActiveProjects(){
    this.http.post(environment.userhasProjects, {
      "companyId":localStorage.getItem("companyId"),
      "userId":sessionStorage.getItem("userId")
    })
    .subscribe(
      (res:any) => {
        if(res.data){
          this.projectArray = res.data;
          if(this.projectArray.length > 5){
            this.tableProjectArray = this.projectArray.slice(0, 5);
          }else{
            this.tableProjectArray = this.projectArray;
          }
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getActiveTask(){
    this.http.post(environment.userhasTasks, {
      "companyId":localStorage.getItem("companyId"),
      "userId":sessionStorage.getItem("userId"),
      "projectId":3,
    })
    .subscribe(
      (res:any) => {
        if(res.data){
          this.taskArray = res.data;
           if(this.taskArray.length > 5){
            this.tableTaskArray = this.taskArray.slice(0, 5);
          }else{
            this.tableTaskArray = this.taskArray;
          }
        }
      },
      err => {
        console.log("NewError occured");
      }
    );
  }

  createProject(){
    if(this.CommonUtilService.isSuperAdmin()){
      this.router.navigate(["project/AddProject"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  projectDetail(project) {
    this.projectArray = [];
    this.projectArray.push(project);
    localStorage.setItem("prData", JSON.stringify(this.projectArray));
    this.router.navigate(["project/ProjectDetail"]);
  }

}