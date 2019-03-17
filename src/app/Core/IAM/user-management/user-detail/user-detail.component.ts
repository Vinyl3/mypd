import { Component, OnInit, Inject, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'delete'];
  dataSource;
  user = JSON.parse(localStorage.getItem("uData"))[0];
  isPopupHidden = true;
  tabType = "Group";
  pId = '';
 
  constructor(private _location: Location, private http: HttpClient,private router: Router, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  ngOnInit() {
    this.userhasPermisionsData(environment.UserhasGroupsList);
  }
  backClicked() {
    this._location.back();
  }

  permissionType(type){
    this.tabType = type;  
    if(type == 'Group'){
       this.userhasPermisionsData(environment.UserhasGroupsList);
    }else if(type == 'Role'){
       this.userhasPermisionsData(environment.UserhasRolesList);
    }else if(type == 'Policy'){
      this.userhasPermisionsData(environment.UserhasPoliciesList);
    }
  }
  
  modifyUserPermission(type){
    localStorage.setItem("pType", this.tabType);
    this.router.navigate(["IAM/AttachUserPermission"]);
  }

  userhasPermisionsData(url){
    this.http.post(url, {
      "userId": this.user.id,
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.userhasPermisions){
          this.dataSource = res.userhasPermisions;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  removeUserPrivilegesPopUp(tabType,permissionId){
   if (this.isPopupHidden = this.isPopupHidden ? false : true){
        this.renderer.removeClass(this.document.body, 'embedded-body');
   }
   else{
        this.renderer.addClass(this.document.body, 'embedded-body');
   }
    this.tabType = tabType;
    this.pId = permissionId;
  }

  closePopUp(){
   if (this.isPopupHidden = this.isPopupHidden ? false : true){
        this.renderer.removeClass(this.document.body, 'embedded-body');
   }
   else{
        this.renderer.addClass(this.document.body, 'embedded-body');
   }
  }

  removeUserPrivileges(){
    this.http.post(environment.RemoveUserPrivileges,{
      "companyId":localStorage.getItem("companyId"),
      "userId":this.user.id,
      "pId":this.pId,
      "pType":this.tabType
    })
    .subscribe(
      (res:any) => {
        if(res.success.length>0){
        this.permissionType(this.tabType) ;
        }
        this.renderer.removeClass(this.document.body, 'embedded-body');
      },
      err => {
        console.log("Error occured");
      }
    );
    this.isPopupHidden = true;
  }
  
}
