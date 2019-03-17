import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';


@Component({
  selector: 'app-attach-user-permission',
  templateUrl: './attach-user-permission.component.html',
  styleUrls: ['./attach-user-permission.component.css']
})
export class AttachUserPermissionComponent implements OnInit {

  dataSource;
  displayedColumns = ['select','name', 'description'];
  user=JSON.parse(localStorage.getItem("user"))
  permissionArray = [];
  actionName = "Add";
  button = "Next";
  isValidated = true;
  gActive=true; pActive=false;  rActive=false;
  isPopupHidden = true;
  permission = "Group";

  constructor(private _location: Location,private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    if(localStorage.getItem("uData")){
      if(localStorage.getItem("pType")== 'Group'){
      this.groupList();
      this.userhasGroups(JSON.parse(localStorage.getItem("uData"))[0].id);
      }else if(localStorage.getItem("pType")== 'Role'){
        this.roleList();
        this.userhasRoles(JSON.parse(localStorage.getItem("uData"))[0].id);
      }else if(localStorage.getItem("pType")== 'Policy'){
        this.policyList();
        this.userhasPolicies(JSON.parse(localStorage.getItem("uData"))[0].id);        
      }
      this.permission = localStorage.getItem("pType");  
      this.actionName = "Edit";
      this.button = "Save";
    }
    else if(Object.keys(JSON.parse(localStorage.getItem("user"))).length>2){
      if((localStorage.getItem("pType")== 'Role')){
        this.roleList();
      }else if((localStorage.getItem("pType")== 'Policy')){
        this.policyList();
      }else if((localStorage.getItem("pType")== 'Group')){
        this.groupList();
      }
      this.user = JSON.parse(localStorage.getItem("user"));
      this.permission=localStorage.getItem("pType");
      this.permissionArray=this.user.permissionArray; 
    } else{
      this.groupList();         
    }
  }

  groupList(){
    this.getAllGroups();
    this.permission = this.permission;
    this.gActive=true;
    this.pActive=false;
    this.rActive=false;    
  }

  roleList(){
    this.getAllRoles();
    this.permission = this.permission;   
    this.gActive=false;
    this.rActive=true;
    this.pActive=false;    
  }

  policyList(){
    this.getAllPolicies();
    this.permission = this.permission;
    this.gActive=false;
    this.rActive=false;
    this.pActive=true;
  }

  getAllRoles(){
    this.http.post(environment.getAllRoles, {
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.roles){
          this.dataSource = res.roles;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  getAllGroups(){
    this.http.post(environment.getAllGroups, {
      "companyId" :localStorage.getItem("companyId")    
    })
    .subscribe(
      (res:any) => {
        if(res.groups){
          this.dataSource = res.groups;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
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

  okList(){
    if(this.permission == 'Group'){
      this.groupList();
    } else if(this.permission == 'Role'){
      this.roleList();
    }else if(this.permission == 'Policy'){
       this.policyList();
    }
    this.isPopupHidden=true;
    this.permissionArray = [];
  }

  cancelList(){
    this.isPopupHidden=true;
  }

  permissionType(type){
    this.permission = type;
    if(type=='Group'){
      if(this.permissionArray.length>0){
        this.isPopupHidden=false;
      }else{
      this.permission = type;
      this.groupList();
      }
    }else if(type=='Role'){
      if(this.permissionArray.length>0){
        this.isPopupHidden=false;
      }else{
        this.permission = type;
       this.roleList();
      }
    }else if(type=='Policy'){
      if(this.permissionArray.length>0){
        this.isPopupHidden=false;
      }else{
        this.permission = type;
       this.policyList();
      }
    }
  }

  onPermissionChange(event, uPermitName) {
    if(event.checked){
      this.permissionArray.push(uPermitName);
    }
    else{ 
      for(let a = 0; a < this.permissionArray.length; a++){
       if(uPermitName.id == this.permissionArray[a].id)
       this.permissionArray.splice(a, 1);
      }
    }
  }

  permissionChecked(uPermitName){
    for(let i=0;i<this.permissionArray.length;i++){
      if(this.permissionArray[i].id == uPermitName.id)
        return true;
    }
  }

  checkPermissions(){
    if(this.permissionArray.length > 0){
      if(localStorage.getItem("uData")){
        let newData = JSON.parse(localStorage.getItem("uData"))[0];
        
        let pIds = [];
        for(let x=0;x<this.permissionArray.length;x++){
          pIds.push(this.permissionArray[x].id)
        }

        let data = {
          companyId:localStorage.getItem("companyId"),
          userId : newData.id,
          pType : localStorage.getItem("pType"), 
          pIds: pIds.toString()
        };
        this.editUserPrivileges(data);
        localStorage.setItem('successfullyEditedMsg', JSON.stringify(false));
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a user";
      }
      else{
        this.user.permissionArray = this.permissionArray;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("pType", this.permission);
        this.router.navigate(["IAM/PreviewUser"]);
      }
    }else{
      this.isValidated = false;
    }
  }
  editUserPrivileges(data){
    this.http.post(environment.EditUserPrivileges,data)
    .subscribe(
      (res:any) => {
        if(res.success){
          this.router.navigate(["IAM/ManageUser"]);
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
  isDisabled(type){
    if(localStorage.getItem("uData")){
      return true;
    }
    if(this.permission == type){
      return true;
    }else{
      return false;
    }
  }
  userhasPolicies(userId){
    this.http.post(environment.UserhasPoliciesList, {
      "userId": userId,
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.userhasPermisions){
          this.permissionArray = res.userhasPermisions;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  userhasGroups(userId){
    this.http.post(environment.UserhasGroupsList, {
      "userId": userId,
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.userhasPermisions){
          this.permissionArray = res.userhasPermisions;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
  userhasRoles(userId){
    this.http.post(environment.UserhasRolesList, {
      "userId": userId,
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.userhasPermisions){
          this.permissionArray = res.userhasPermisions;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }
}
  