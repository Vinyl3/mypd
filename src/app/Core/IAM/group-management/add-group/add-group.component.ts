import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  groupName:string = '';
  groupDesc:string = '';
  group:any = {};
  actionName = "Add";
  button = "Next";
  isValid = true;

  constructor(private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    if(localStorage.getItem("gData")){
      this.actionName = "Edit";
      this.button = "Save";
      this.groupName = JSON.parse(localStorage.getItem("gData"))[0].name;
      this.groupDesc = JSON.parse(localStorage.getItem("gData"))[0].description;      
    }
    else if(localStorage.getItem("group")){
      this.groupName = JSON.parse(localStorage.getItem("group")).name;
      this.groupDesc = JSON.parse(localStorage.getItem("group")).desc;
    }
  }

  checkGroupND(){
		if(this.groupName.length > 0 && this.groupDesc.length > 0 ){
  		if(localStorage.getItem("gData")){
        let newData = JSON.parse(localStorage.getItem("gData"))[0];
        newData.name = this.groupName;
        newData.description = this.groupDesc;
        this.editGroupND(newData); 
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a Group";
      }
      else{
        this.group.name = this.groupName;
        this.group.desc = this.groupDesc;
        localStorage.setItem("group", JSON.stringify(this.group));  
        this.router.navigate(["IAM/AttachGroupPermission"]);
      }
    }
    else{
      this.isValid = false;
    }
  }
  
  editGroupND(data){
    this.http.post(environment.editGroupND,data)
    .subscribe(
      (res:any) => {
        if(res.success){
          this.router.navigate(["IAM/ManageGroup"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
 }
