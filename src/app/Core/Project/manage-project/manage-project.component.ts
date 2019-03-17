import { Component, OnInit, Inject, Renderer2, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})

export class ManageprojectComponent implements OnInit, OnDestroy{

  dataSource;
  displayedColumns = ['select', 'name', 'description'];
  projectArray = [];
  isPopupHidden = true;
  showDropMenu = false;
  

  constructor(private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "project";
    if(this.CommonUtilService.isSuperAdmin()){
    this.getAllProjects();
    }else{
      this.getUserAllProject();
    }
    localStorage.removeItem("prData");
    localStorage.removeItem("subtask");
  }

  ngOnDestroy(){
    this.CommonUtilService.greenMsgRibbonIsHidden = true;
  }
  
  getAllProjects(){
    this.http.post(environment.getAllProjects, {
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.projects){
          this.dataSource = res.projects;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getUserAllProject() {
    this.http.post(environment.userhasProjects, {
      "companyId" : localStorage.getItem("companyId"),
      "userId" : sessionStorage.getItem("userId"),
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
  
  onChange(event, project) {
    if (event.checked) {
      this.projectArray.push(project);
    }
    else {
      for (let x = 0; x < this.projectArray.length; x++) {
        if (project.id == this.projectArray[x].id)
          this.projectArray.splice(x, 1);
      }
    }
  }

  projectDetail(project) {
    this.projectArray = [];
    this.projectArray.push(project);
    localStorage.setItem("prData", JSON.stringify(this.projectArray));
    this.router.navigate(["project/ProjectDetail"]);
  }

  addProject(){
    if(this.CommonUtilService.isSuperAdmin()){
      this.router.navigate(["project/AddProject"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  deleteProjectPopup() {
    if(this.CommonUtilService.isSuperAdmin()){
      if (this.isPopupHidden = this.isPopupHidden ? false : true){
        this.renderer.removeClass(this.document.body, 'embedded-body');
      }
      else{
        this.renderer.addClass(this.document.body, 'embedded-body');
      }
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  deleteProject() {
    let projectIds = [];
    for (let x = 0; x < this.projectArray.length; x++) {
      projectIds.push(this.projectArray[x].id)
    }

    this.http.post(environment.deleteProjects, {
      "projectIds": projectIds.toString() 
    })
    .subscribe(
      (res: any) => {
        if (res.success.length > 0) {
          this.isPopupHidden = true;
          this.projectArray = [];
          this.getAllProjects();
          this.CommonUtilService.greenMsgRibbonIsHidden = false;
          this.CommonUtilService.successMsgGreen = "You have successfully deleted project/projects";
        }
        this.renderer.removeClass(this.document.body, 'embedded-body'); 
       },
      err => {
        console.log("Error occured");
      }
    );
  }

  modifyProjectND(){
    if(this.CommonUtilService.isSuperAdmin()){
    localStorage.setItem("prData", JSON.stringify(this.projectArray));
    this.router.navigate(["project/AddProject"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  modifyProjectUser(){
    if(this.CommonUtilService.isUserAllowed('User',this.projectArray[0].name,'Add/Remove')){
    localStorage.setItem("prData", JSON.stringify(this.projectArray));
    this.router.navigate(["project/ManageUser"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  modifyProjectTask(){
    if(this.CommonUtilService.isUserAllowed('Task',this.projectArray[0].name,'Edit')){
    localStorage.setItem("prData", JSON.stringify(this.projectArray));
    this.router.navigate(["project/AddTask"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  modifyProjectstTask(){
    if(this.CommonUtilService.isUserAllowed('SubTask',this.projectArray[0].name,'Edit')){
    localStorage.setItem("prData", JSON.stringify(this.projectArray));
    this.router.navigate(["project/AddSubTask"]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  options(type) {
    this.showDropMenu = type == 'toggle' ? !this.showDropMenu : false;
  }

  deleteButton(){
    return this.projectArray.length>=1 ? true : false;
  }

  editButton(){
    return this.projectArray.length==1 ? true : false;
  }

}
