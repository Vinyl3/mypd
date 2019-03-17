import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit, OnDestroy {
  dataSource;
  displayedColumns = ['select', 'firstName', 'userEmail'];
  userArray = [];
  isPopupHidden = true;
  showDropMenu = false;
  isButtonVisible =true;

  constructor(private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService,
     @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
  }

  ngOnDestroy(){
    this.CommonUtilService.greenMsgRibbonIsHidden = true;
  }
  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "user";

    this.getAllUsersinCompany();
    localStorage.removeItem("user");
    localStorage.removeItem("Ptype");
    localStorage.removeItem("newUser");
    localStorage.removeItem("uData");    
  }
  
  getAllUsersinCompany(){
    this.http.post(environment.getAllUsersinCompany, {
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.userincompany){
          this.dataSource = res.userincompany;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onChange(event, user) {
    if(event.checked){
      this.userArray.push(user);
    }
    else{
      for(let x=0;x<this.userArray.length;x++){
       if(user.id == this.userArray[x].id)
       this.userArray.splice(x, 1);
      }
    }
  }

  UserDetail(user){
    this.userArray = [];
      this.userArray.push(user);
      localStorage.setItem("uData", JSON.stringify(this.userArray));
      this.router.navigate(["IAM/UserDetail"]);
  }

  deleteUser() {
    let userIds = [];
    for(let x=0;x<this.userArray.length;x++){
      userIds.push(this.userArray[x].id)
    }
    this.http.post(environment.RemoveUserFromCompany,{
      "companyId":localStorage.getItem("companyId"),
      "userIds":userIds.toString()
    })
    .subscribe(
      (res:any) => {
        if(res.success.length>0){
          this.isPopupHidden = true;
          this.userArray = [];
          this.getAllUsersinCompany();
        }
         this.CommonUtilService.greenMsgRibbonIsHidden = false;
         this.CommonUtilService.successMsgGreen = "You have successfully deleted user/users";
        this.renderer.removeClass(this.document.body, 'embedded-body'); 
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  deleteUserPopup(){
    if ( this.isPopupHidden = this.isPopupHidden ? false : true ) {
      this.renderer.removeClass(this.document.body, 'embedded-body');   

  } else {
    this.renderer.addClass(this.document.body, 'embedded-body');
  }  
     //this.CommonUtilService.accessDeniedPop = false;
  }  

  modifyUserPermission(type){
    localStorage.setItem("pType", type);
    localStorage.setItem("uData", JSON.stringify(this.userArray));
    this.router.navigate(["IAM/AttachUserPermission"]);
  }

  options(type){
    this.showDropMenu = type=='toggle' ? !this.showDropMenu : false;   
  } 

  deleteButton(){
    return this.userArray.length>=1 ? true : false;
  }

  editButton(){
    return this.userArray.length==1 ? true : false;
  }

}
