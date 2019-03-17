import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-attach-components-actions',
  templateUrl: './attach-components-actions.component.html',
  styleUrls: ['./attach-components-actions.component.css']
})
export class AttachComponentsActionsComponent implements OnInit {
  selectedComponent: string;
  panelOpenState = false;
  components: string[] = ['Task', 'SubTask', 'User', 'Timesheet'];
  projects ;
  timesheetActions: string[] = ['Approve/Reject'];
  taskActions = ['Create', 'Edit', 'Delete'];
  subTaskActions = ['Create', 'Edit'];
  userActions = ['Add/Remove'];
  policy = JSON.parse(localStorage.getItem("policy"));
  //cnames:string[];
  cactions:string[];
  names = [];
  actions = [];
  isValidated = true;
  isCselected = false;
  actionName = "Add";
  button = "Next";
 
  constructor(private _location: Location,private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }


  ngOnInit() {
    this.getAllProject();
    if(localStorage.getItem("pAction")){
      this.actionName = "Edit";
      this.button = "Save";
      this.selectedComponent = JSON.parse(localStorage.getItem("pData"))[0].ctype;
      this.changeActionsAndNames(this.selectedComponent);
      this.names = JSON.parse(localStorage.getItem("pData"))[0].cnames.split(",");
      this.actions = JSON.parse(localStorage.getItem("pData"))[0].actions.split(",");
    }
    else if(Object.keys(JSON.parse(localStorage.getItem("policy"))).length>2){
      this.selectedComponent = JSON.parse(localStorage.getItem("policy")).ctype;
      this.changeActionsAndNames(this.selectedComponent);
      this.names = JSON.parse(localStorage.getItem("policy")).cnames.split(",");
      this.actions = JSON.parse(localStorage.getItem("policy")).actions.split(",");
    }
  }
  
  backClicked() {
    this._location.back();
  };

  radioChange(event : MatRadioChange){
    this.names = [];
    this.actions = [];
    this.changeActionsAndNames(event.value);
  }

  changeActionsAndNames(value){
    this.isCselected = true;
    console.log("projectList");
    console.log(this.projects);
    switch(value) {
     case "Task": {
        this.cactions = this.taskActions;
        break;
      }
     case "Timesheet": {
        this.cactions = this.timesheetActions;
        break;
      }
     case "SubTask": {
        this.cactions = this.subTaskActions;
        break;
      }
      case "User": {
        this.cactions = this.userActions;
        break;
      }
    }
  }

  onNameChange(event, name){
    if(event.checked){
      this.names.push(name);
    }else{
      for(let x=0;x<this.names.length;x++){
       if(name == this.names[x])
       this.names.splice(x, 1);
      }
    }
  }

  onActionChange(event, action){
    if(event.checked){
      this.actions.push(action);
    }else{
      for(let x=0;x<this.actions.length;x++){
       if(action == this.actions[x])
       this.actions.splice(x, 1);
      }
    }
  }

  checkComponents(){
     if(this.selectedComponent && this.names.length > 0 && this.actions.length > 0 ){
      if(localStorage.getItem("pAction")){
        let newData = JSON.parse(localStorage.getItem("pData"))[0];
        newData.ctype = this.selectedComponent;
        newData.cnames = this.names.toString();
        newData.actions = this.actions.toString();
        this.editPolicyComponents(newData);
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a policy";
      }
      else{
      this.policy.ctype = this.selectedComponent;
      this.policy.cnames = this.names.toString();
      this.policy.actions = this.actions.toString();
      localStorage.setItem("policy", JSON.stringify(this.policy));
      this.router.navigate(["IAM/PreviewPolicy"]);
      }
    }
    else{
      this.isValidated = false;
    }
  }

  actionChecked(action){
    if (this.actions.indexOf(action) > -1)
      return true;
  }

  nameChecked(name){
    if (this.names.indexOf(name) > -1)
      return true;
  }

  editPolicyComponents(data){
    this.http.post(environment.editPolicyComponents,data)
    .subscribe(
      (res:any) => {
        if(res.success){
          this.router.navigate(["IAM/ManagePolicy"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getAllProject() {
    this.http.post(environment.getAllProjects, {
      "companyId" : localStorage.getItem("companyId")
    })
    .subscribe(
      (res: any) => {
        if (res.projects) {
          this.projects = res.projects;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
