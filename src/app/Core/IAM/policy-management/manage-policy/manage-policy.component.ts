import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-manage-policy',
  templateUrl: './manage-policy.component.html',
  styleUrls: ['./manage-policy.component.css']
})
export class ManagePolicyComponent implements OnInit, OnDestroy {

  dataSource;
  displayedColumns = ['select','name', 'description'];
  policyArray = [];
  isPopupHidden = true;
  showDropMenu = false;
  
  constructor(private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService, 
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {  }
  
  ngOnDestroy(){
    this.CommonUtilService.greenMsgRibbonIsHidden = true;
  }
  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "policy";
    this.getAllPolicies();
    localStorage.removeItem("pAction");
    localStorage.removeItem("pData");
    localStorage.removeItem("policy");
  }

  getAllPolicies(){
    this.http.post(environment.getAllPolicies, {
      "companyId":localStorage.getItem("companyId")
    })
    .subscribe(
      (res:any) => {
        if(res.policies){
          this.dataSource = res.policies;
          localStorage.setItem('allPolicies', JSON.stringify(this.dataSource));
          console.log(this.dataSource);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onChange(event, policy) {
    if(event.checked){
      this.policyArray.push(policy);
    }
    else{
      for(let x=0;x<this.policyArray.length;x++){
       if(policy.id == this.policyArray[x].id)
       this.policyArray.splice(x, 1);
      }
    }
  }
  onPolicy(policy){    
    this.policyArray=[];
    this.policyArray.push(policy);
    localStorage.setItem("pData", JSON.stringify(this.policyArray));
    this.router.navigate(["IAM/PolicyDetail"]);
}
  deletePolicy() {
    
    let policyIds = [];
    for(let x=0;x<this.policyArray.length;x++){
      policyIds.push(this.policyArray[x].id)
    }
       
    this.http.post(environment.deletePolicy,{"policyIds":policyIds.toString()})
    .subscribe(
      (res:any) => {
        if(res.success.length>0){
          this.isPopupHidden = true;
          this.policyArray = [];
          this.getAllPolicies();
        }
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully deleted policy/policies";
        this.renderer.removeClass(this.document.body, 'embedded-body');
      },
      err => {
        console.log("Error occured");
      }
    );    
  }

  deletePolicyPopup(){
    if (this.isPopupHidden = this.isPopupHidden ? false : true){
          this.renderer.removeClass(this.document.body, 'embedded-body');
    }
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }
 
  modifyPolicyND(){
    localStorage.setItem("pAction", "Edit");
    localStorage.setItem("pData", JSON.stringify(this.policyArray));
    this.router.navigate(["IAM/AddPolicy"]);
  }

  modifyPolicyComponents(){
    localStorage.setItem("pAction", "Edit");
    localStorage.setItem("pData", JSON.stringify(this.policyArray));
    this.router.navigate(["IAM/AttachComponentsActions"]);
  }

  options(type){
    this.showDropMenu = type=='toggle' ? !this.showDropMenu : false;   
  }

  deleteButton(){
    return this.policyArray.length>=1 ? true : false;
  }

  editButton(){
    return this.policyArray.length==1 ? true : false;
  }

}

