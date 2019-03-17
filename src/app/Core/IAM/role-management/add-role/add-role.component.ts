import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  roleName:string = '';
  roleDesc:string = '';
  role:any = {};
  isDataValid = true;
  actionName = "Add";
  button = "Next";

  constructor(private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    if(localStorage.getItem("rAction")){
      this.actionName = "Edit";
      this.button = "Save";
      this.roleName = JSON.parse(localStorage.getItem("rData"))[0].name;
      this.roleDesc = JSON.parse(localStorage.getItem("rData"))[0].description;
    }
    else if(localStorage.getItem("role")){
      this.roleName = JSON.parse(localStorage.getItem("role")).roleName;
      this.roleDesc = JSON.parse(localStorage.getItem("role")).desc;
    }
  	
  }

  checkRoleND(){
	if(this.roleName.length > 0 && this.roleDesc.length > 0 ){
    if(localStorage.getItem("rAction") == "Edit"){
        let newData = JSON.parse(localStorage.getItem("rData"))[0];
        console.log("rData = : "+JSON.stringify(newData));
        newData.name = this.roleName;
        newData.description = this.roleDesc;
        console.log("newData = : "+JSON.stringify(newData));
        this.editRoleND(newData); 
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a role";
      }
      else{
        this.role.roleName = this.roleName;
        this.role.desc = this.roleDesc;
        localStorage.setItem("role", JSON.stringify(this.role));
        this.router.navigate(["IAM/AttachRolePolicy"]);
      }
		   
    }
    else{
      this.isDataValid = false;
    }
  }

  editRoleND(data){
    this.http.post(environment.editRoleND,data)
    .subscribe(
      (res:any) => {
        if(res.success){
          this.router.navigate(["IAM/ManageRole"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
