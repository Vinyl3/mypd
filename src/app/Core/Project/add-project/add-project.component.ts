import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddprojectComponent implements OnInit {
  projectName:string = '';
  projectDesc:string = '';
  projectAssignTo:string = '';
  isValid = true;
  actionName = 'Add';

  constructor(private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {

    if(localStorage.getItem("prData")){
      this.actionName = "Edit";
      this.projectName = JSON.parse(localStorage.getItem("prData"))[0].name;
      this.projectDesc = JSON.parse(localStorage.getItem("prData"))[0].description;
    }

  }

  checkProjectND(){
	if(this.projectName.length > 0 && this.projectDesc.length > 0){
  		if(localStorage.getItem("prData")){
	        let newData = JSON.parse(localStorage.getItem("prData"))[0];
	        newData.name = this.projectName;
	        newData.description = this.projectDesc;
	        this.editProject(newData); 
        }
       	else{
        	this.createProject();
        }
    }
    else{
      this.isValid = false;
    }
  }

  createProject(){
	this.http.post(environment.createProject,{
		"companyId":localStorage.getItem("companyId"),
		"creatorId":sessionStorage.getItem("userId"),
		"projectname":this.projectName,
		"desc":this.projectDesc
	})
	.subscribe(
	  (res:any) => {
	    if(res.success){
	      this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully created a project";
	      this.router.navigate(["project/ManageProject"]);
	    }
	  },
	  err => {
	    console.log("Error occured");
	  }
	);
  }

  editProject(data){
    this.http.post(environment.editProject,data)
    .subscribe(
      (res:any) => {
        if(res.success){
    	this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a project";
          this.router.navigate(["project/ManageProject"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
}
