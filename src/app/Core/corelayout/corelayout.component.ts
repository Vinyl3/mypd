
import { Component,Inject, OnInit, Renderer2 } from '@angular/core';
import {TooltipPosition} from '@angular/material';
import {FormControl} from '@angular/forms';
import { CommonUtilService } from '../../services/common-util.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-corelayout',
  templateUrl: './corelayout.component.html',
  styleUrls: ['./corelayout.component.css']
})
export class CorelayoutComponent implements OnInit {
  logoRightWith = true;
  vRightPannel = false;
  vdropDownList = false;
  firstName = localStorage.getItem("fname");
 
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  showFiller = false;
  panelOpenState = false;
  vDropList = false;
  customCollapsedHeight: string = '37px';
  customExpandedHeight: string = '37px';

  vProjectM = "Project Management";
  vCreateProject = "Create a Project"
  vsheetM = "Sheet Management";
  vTemplates = "Templates";
  vDashboard = "Dashboard";
  vCreateDashboard = "Create Dashboard"
  vTimeSheet = "TimeSheet";
  rvTimeSheet = "Review TimeSheet";
  myTimeSheet = "My TimeSheet";
  viam = "IAM";
  vUser = "User";
  vGroup = "Group";
  vRole = "Role";
  vPolicy = "Policy";
  isHeighLight = false;
  companyList = '';
  userEmail = localStorage.getItem("userEmail");
  
  constructor( public CommonUtilService: CommonUtilService,private location: Location,private http: HttpClient,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2,private router: Router) { }

  ngOnInit() {
    this.getCompanies();
    //this.getUserPrivileges();
    if (window.location.href.indexOf('/login')>0 || window.location.href.indexOf('/dashboard')>0){
      
      this.location.replaceState('');
      
    }
  }
  
  isActiveMenu(subPoint){
    if (subPoint == this.CommonUtilService.activeSubPoint){
      return true;
    }
  }

  logout(){
    sessionStorage.clear();
    localStorage.clear();
  }

  popupHide(){
    this.CommonUtilService.isWelcomePopUpHidden = true;
    this.renderer.removeClass(this.document.body, 'embedded-body');   
  }

  drawertoggle(){
    if(this.showFiller = !this.showFiller){
      this.vRightPannel = true;
      this.logoRightWith = false;
      this.vProjectM = "";
      this.vCreateProject = ""
      this.vsheetM = "";
      this.vTemplates = "";
      this.vDashboard = "";
      this.vCreateDashboard = ""
      this.vTimeSheet = "";
      this.rvTimeSheet = "";
      this.myTimeSheet = "";
      this.viam = "";
      this.vUser = "";
      this.vGroup = "";
      this.vRole = "";
      this.vPolicy = "";
      this.vDropList = true;
      console.log( this.vDropList)
    }
    else{
      this.vRightPannel = false;
      this.logoRightWith = true;
      this.vProjectM = "Project Management";
      this.vCreateProject = "Create a Project"
      this.vsheetM = "Sheet Management";
      this.vTemplates = "Templates";
      this.vDashboard = "Dashboard";
      this.vCreateDashboard = "Create Dashboard"
      this.vTimeSheet = "TimeSheet";
      this.rvTimeSheet = "Review TimeSheet";
      this.myTimeSheet = "My TimeSheet";
      this.viam = "IAM";
      this.vUser = "User";
      this.vGroup = "Group";
      this.vRole = "Role";
      this.vPolicy = "Policy";
      this.vDropList = false;
      console.log( this.vDropList)
    }
  }

  getCompanies(){
    this.http.post(environment.getUserCompanies, {
     "userId": sessionStorage.getItem("userId")
    })
    .subscribe((res:any) => {
      console.log(res);
      if(res.status == 1){
        this.companyList = res.company;
        if(!localStorage.getItem("companyId")){
          console.log("company Id not found");
          for(let i = 0; i<res.company.length; i++){
            if(res.company[i].creatorId == sessionStorage.getItem("userId")){
              localStorage.setItem("companyId", res.company[i].id);
              localStorage.setItem("company", JSON.stringify(res.company[i]));
            }
          }
        }
        this.getUserPrivileges();
      }
      else{
       console.log("Error occured");
      }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onCompanySelect(company){
    if(company.id != localStorage.getItem("companyId")){
      localStorage.setItem("companyId", company.id);
      localStorage.setItem("company", JSON.stringify(company));
      window.location.reload();
    }
  }

  accessDeniedClose(){
    this.CommonUtilService.accessDeniedPop = true;
    this.renderer.removeClass(this.document.body, 'embedded-body');
  }

  manageIAM(path){
    if(this.CommonUtilService.isSuperAdmin()){
    this.router.navigate([path]);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  reviewTimesheet(){
    if(this.CommonUtilService.canReviewTimesheet()){
    this.router.navigate(['/Timesheet/ReviewTimesheet']);
    }else{
      this.CommonUtilService.accessDeniedPop = false;
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  getUserPrivileges(){
    this.http.post(environment.userPrivileges, {
     "userId": sessionStorage.getItem("userId"),
     "companyId" : localStorage.getItem("companyId")
    })
    .subscribe((res:any) => {
      console.log("UserPrivileges");
      console.log(res);
      if(res.data ){
        localStorage.setItem("privileges",JSON.stringify(res.data));
      }
      else{
       console.log("Error occured");
      }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
