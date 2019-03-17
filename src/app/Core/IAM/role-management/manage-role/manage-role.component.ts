import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit, OnDestroy {

  dataSource;
  displayedColumns = ['select', 'name', 'symbol'];
  roleArray = [];
  isPopupHidden = true;
  
  showDropMenu = false;

  constructor(private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService,
     @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }
 
  ngOnDestroy(){
    this.CommonUtilService.greenMsgRibbonIsHidden = true;
  }
  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "role";
    this.getAllRoles();
    localStorage.removeItem("rAction");
    localStorage.removeItem("rData");
    localStorage.removeItem("role");
  }

  getAllRoles(){
    this.http.post(environment.getAllRoles, {
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.roles){
          this.dataSource = res.roles;
          localStorage.setItem('allRoles', JSON.stringify(this.dataSource));
          console.log(this.dataSource);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onChange(event, role) {
    console.log("event = : "+event.checked+"   role = : "+role);
    if(event.checked){
      this.roleArray.push(role);
    }
    else{
      for(let x=0;x<this.roleArray.length;x++){
       if(role.id == this.roleArray[x].id)
       this.roleArray.splice(x, 1);
      }
    }
    console.log("roleArray = : "+this.roleArray);
  }
  onRole(role){    
    this.roleArray=[];
    this.roleArray.push(role);
    localStorage.setItem("rData", JSON.stringify(this.roleArray));
    this.router.navigate(["IAM/RoleDetail"]);
   }
  deleteRolePopup(){
    if(this.isPopupHidden = this.isPopupHidden ? false : true){
      this.renderer.removeClass(this.document.body, 'embedded-body');   
    }
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  deleteRole(){

    let roleIds = [];
    for(let x=0;x<this.roleArray.length;x++){
      roleIds.push(this.roleArray[x].id)
    }
       
    this.http.post(environment.deleteRole,{"roleIds":roleIds.toString()})
    .subscribe(
      (res:any) => {
        if(res.success.length>0){
          this.isPopupHidden = true;
          this.roleArray = [];
          this.getAllRoles();
        }
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
         this.CommonUtilService.successMsgGreen = "You have successfully deleted role/roles";
         this.renderer.removeClass(this.document.body, 'embedded-body');
      },
      err => {
        console.log("Error occured");
      }
    );

  }

  modifyRoleND(){
    localStorage.setItem("rAction", "Edit");
    localStorage.setItem("rData", JSON.stringify(this.roleArray));
    this.router.navigate(["IAM/AddRole"]);
  }

  modifyRoleComponents(){
    localStorage.setItem("rAction", "Edit");
    localStorage.setItem("rData", JSON.stringify(this.roleArray));
    this.router.navigate(["IAM/AttachRolePolicy"]);
  }
  
  options(type){
    this.showDropMenu = type=='toggle' ? !this.showDropMenu : false;   
  }

  deleteButton(){
    return this.roleArray.length>=1 ? true : false;
  }

  editButton(){
    return this.roleArray.length==1 ? true : false;
  }
}
  