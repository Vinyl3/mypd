import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';


@Component({
  selector: 'app-attach-role-policy',
  templateUrl: './attach-role-policy.component.html',
  styleUrls: ['./attach-role-policy.component.css']
})
export class AttachRolePolicyComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['select', 'name', 'description'];
  policyArray = [];
  isValidated = true;
  actionName = "Add";
  button = "Next";
  role = JSON.parse(localStorage.getItem("role"));
  
  constructor(private _location: Location, private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService) { }
  
  ngOnInit() {
    this.getAllPolicies();
    if(localStorage.getItem("rAction")){
      this.actionName = "Edit";
      this.button = "Save";
      console.log(" Role Data  = : "+localStorage.getItem("rData"));
      this.roleHasPolicies(JSON.parse(localStorage.getItem("rData"))[0].id);
    }
    else if(Object.keys(JSON.parse(localStorage.getItem("role"))).length>2){
      console.log("policyArray length = : "+this.role.policyArray.length);
      this.policyArray = this.role.policyArray;
    }
  }
  
  getAllPolicies(){
    this.http.post(environment.getAllPolicies, {
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.policies){
          this.dataSource = res.policies;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  roleHasPolicies(roleId){
    console.log(roleId);
    this.http.post(environment.roleHasPolicyList, {
      "roleId": roleId
    })
    .subscribe(
      (res:any) => {
        if(res.rolehasPolicies){
          console.log("rolehasPolicyList = : "+JSON.stringify(res.rolehasPolicies));
          this.policyArray = res.rolehasPolicies;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
    
  backClicked() {
    this._location.back();
  }

  onPolicyChange(event, policy) {
    if(event.checked){
      this.policyArray.push(policy);
    }
    else{
      for(let x=0;x<this.policyArray.length;x++){
       if(policy.id == this.policyArray[x].id)
       this.policyArray.splice(x, 1);
      }
    }
    console.log(" policyIdArray = : "+this.policyArray);
  }

  checkRolePolicies(){
    if(this.policyArray.length > 0){
      if(localStorage.getItem("rAction")){
        let newData = JSON.parse(localStorage.getItem("rData"))[0];
        console.log("Role data  = : "+JSON.stringify(newData));
        let policyIds = [];
        for(let x=0;x<this.policyArray.length;x++){
            policyIds.push(this.policyArray[x].id)
        }
        let data = {roleId : newData.id,policyIds : policyIds.toString()};
        console.log("new edit data  = : "+JSON.stringify(data));
        console.log("policyIds = : "+policyIds);
        this.editRolePolicies(data);
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a role";
      }
      else{
      console.log(" Roles = : "+JSON.stringify(this.role));
      this.role.policyArray = this.policyArray;
      localStorage.setItem("role", JSON.stringify(this.role));
      this.router.navigate(["IAM/PreviewRole"]);
      }
    }
    else{
      this.isValidated = false;
    }
  }

  editRolePolicies(data){
    this.http.post(environment.editRoleComponents,data)
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

  policyChecked(policy){
    for(let i=0;i<this.policyArray.length;i++){
        if(this.policyArray[i].id == policy.id)
          return true;
      }
  }
  
}
  