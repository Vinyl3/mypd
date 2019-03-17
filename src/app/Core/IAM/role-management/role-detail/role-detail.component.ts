import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description','delete'];
  dataSource;
  role = JSON.parse(localStorage.getItem("rData"))[0]; 
  isPopupHidden = true;
  policyId='';

  constructor(private _location: Location, private http: HttpClient,private router: Router,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  ngOnInit() {
    this.roleHasPolicies(environment.roleHasPolicyList); 
  }
  modifyRoleND(){
    localStorage.setItem("rAction", "Edit");
    this.router.navigate(["IAM/AddRole"]);
  }
  backClicked() {
    this._location.back();
  }
  modifyRoleComponents(){
    localStorage.setItem("rAction", "Edit");
    this.router.navigate(["IAM/AttachRolePolicy"]);
  }
  roleHasPolicies(url){
    console.log(url);
    this.http.post(url, {
      "roleId": this.role.id
    })
    .subscribe(
      (res:any) => {
        if(res.rolehasPolicies){
          console.log("rolehasPolicyList = : "+JSON.stringify(res.rolehasPolicies));
          this.dataSource = res.rolehasPolicies;
         
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  removePolicyFromRolePopUp(policyId){
    if (this.isPopupHidden = this.isPopupHidden ? false : true){
      this.renderer.removeClass(this.document.body, 'embedded-body');
    } 
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
    this.policyId = policyId;
  }

  closeRolePopUp(){
    if (this.isPopupHidden = this.isPopupHidden ? false : true){
      this.renderer.removeClass(this.document.body, 'embedded-body');
    } 
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  removePolicyFromRole(){
    this.http.post(environment.RemovePolicyFromRole,{
      "roleId":this.role.id,
      "policyId":this.policyId
      })
    .subscribe(
      (res:any) => {
        if(res.success.length>0){          
          this.roleHasPolicies(environment.roleHasPolicyList);  
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
