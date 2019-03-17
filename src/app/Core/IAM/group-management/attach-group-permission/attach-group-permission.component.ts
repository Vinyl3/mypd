import { Component, OnInit } from '@angular/core'; 
import { Location } from '@angular/common'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-attach-group-permission',
  templateUrl: './attach-group-permission.component.html',
  styleUrls: ['./attach-group-permission.component.css']
})

export class AttachGroupPermissionComponent implements OnInit {

  dataSource;
  displayedColumns = ['select','name', 'description'];
  group=JSON.parse(localStorage.getItem("group"))
  permissionArray = [];
  actionName = "Add";
  button = "Next";
  isValidated = true;
  active = true;
  isPopupHidden = true;
  permission = "Role";

  constructor(private _location: Location,private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    if(localStorage.getItem("gData")){
      if(localStorage.getItem("pType")== 'Role'){
        this.roleList();
        this.grouphasRoles(JSON.parse(localStorage.getItem("gData"))[0].id);
      }else if(localStorage.getItem("pType")== 'Policy'){
        this.policyList();
        this.grouphasPolicies(JSON.parse(localStorage.getItem("gData"))[0].id);
      }
      this.permission=localStorage.getItem("pType");
      this.actionName = "Edit";
      this.button = "Save";
    }
    else if(Object.keys(JSON.parse(localStorage.getItem("group"))).length>2){
      if((localStorage.getItem("pType")=='Role')){
        this.roleList();
      }else if((localStorage.getItem("pType")=='Policy')){
        this.policyList();
      }
      this.group = JSON.parse(localStorage.getItem("group"));
      this.permission=localStorage.getItem("pType");
      this.permissionArray=this.group.permissionArray;
      } else{
      this.roleList();
    }
  }

  roleList(){
    this.getAllRoles();
    this.active = true;
    this.permission = this.permission;
  }

  policyList(){
    this.getAllPolicies();
    this.permission = this.permission;
    this.active = false;
  }

  okList(){
    if(this.permission == 'Role'){
      this.roleList();
    } else if(this.permission == 'Policy'){
      this.policyList();
    }
    this.isPopupHidden=true;
    this.permissionArray = [];
  }

  cancelList(){
    if(this.permission == 'Role'){
      this.policyList();
      this.permission = 'Policy';
    }else if(this.permission == 'Policy'){
      this.roleList();
      this.permission = 'Role';
    }
    this.isPopupHidden=true;
  }

  permissionType(type){
    this.permission = type;   
    if(type=='Role'){
      if(this.permissionArray.length>0){
        this.isPopupHidden=false;
      }else{
      this.roleList();
      }
    }else if(type=='Policy'){
      if(this.permissionArray.length>0){
        this.isPopupHidden=false;
      }else{
       this.policyList();
      }
    }
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

  grouphasRoles(groupId){
    this.http.post(environment.grouphasRolesList, {
      "groupId": groupId
    })
    .subscribe(
      (res:any) => {
        if(res.grouphasRoles){
          console.log("GrouphasRolesList = : "+JSON.stringify(res.grouphasRoles));
          this.permissionArray = res.grouphasRoles;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  grouphasPolicies(groupId){
    this.http.post(environment.grouphasPoliciesList, {
      "groupId": groupId
    })
    .subscribe(
      (res:any) => {
        if(res.grouphasPolicies){
          console.log("GrouphasPoliciesList = : "+JSON.stringify(res.grouphasPolicies));
          this.permissionArray = res.grouphasPolicies;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  checkPermissions(){
    if(this.permissionArray.length > 0){
      if(localStorage.getItem("gData")){
        let newData = JSON.parse(localStorage.getItem("gData"))[0];

        let pIds = [];
        for(let x=0;x<this.permissionArray.length;x++){
          pIds.push(this.permissionArray[x].id)
        }

        let data = {
          groupId : newData.id,
          pType : localStorage.getItem('pType'), 
          pIds: pIds.toString()
        };
        console.log("new edit data  = : "+JSON.stringify(data));
        this.editGroupPermission(data);
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a Group";    
      }
      else{
        this.group.permissionArray = this.permissionArray;    
        localStorage.setItem("group", JSON.stringify(this.group));
        localStorage.setItem("pType", this.permission);
        this.router.navigate(["IAM/AttachGroupUser"]);
      }
    }else{
      this.isValidated = false;
    }
  }
  
  backClicked() {
    this._location.back();
  }

  editGroupPermission(data){
    this.http.post(environment.editGroupHasPolicyorRole,data)
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

  isDisabled(type){
    if(localStorage.getItem("gData")){
      return true;
    }
    if(this.permission == type){
      return true;
    }else{
      return false;
    }
  }
}