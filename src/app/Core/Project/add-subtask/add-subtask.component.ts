import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subtask',
  templateUrl: './add-subtask.component.html',
  styleUrls: ['./add-subtask.component.css']
})
export class AddSubtaskComponent implements OnInit {
  subTaskName = "";
  project = JSON.parse(localStorage.getItem("prData"))[0];
  projectName = this.project.name;
  isValid = true;
  actionName = "Create";

  constructor(private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    if(localStorage.getItem("subtask")){
      this.subTaskName = JSON.parse(localStorage.getItem("subtask")).name;
      this.actionName = "Edit";
    }

  }


  checkSubTask(){
    if(this.subTaskName.length>0 && this.projectName.length>0){
      if(this.actionName == "Create"){
        this.createSubTask();
      }else if(this.actionName == "Edit"){
        this.editSubTask();
      }
    }
    else{
      this.isValid = false;
    }
  }

  createSubTask(){
    this.http.post(environment.createSubTask, {
      "projectId": this.project.id,
      "companyId" : localStorage.getItem("companyId"),
      "creatorId" : sessionStorage.getItem("userId"),
      "subTaskName": this.subTaskName,
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.CommonUtilService.greenMsgRibbonIsHidden = false;
          this.CommonUtilService.successMsgGreen = "You have successfully created a sub-task";
          this.router.navigate(["project/ManageProject"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  editSubTask(){
    this.http.post(environment.editSubTask, {
      "projectId": this.project.id,
      "companyId" : localStorage.getItem("companyId"),
      "subTaskId" : JSON.parse(localStorage.getItem("subtask")).id,
      "subTaskName": this.subTaskName,
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.CommonUtilService.greenMsgRibbonIsHidden = false;
          this.CommonUtilService.successMsgGreen = "You have successfully edited a sub-task";
          this.router.navigate(["project/ManageProject"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
