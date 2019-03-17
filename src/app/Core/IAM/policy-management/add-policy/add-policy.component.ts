import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-add-policy',
  templateUrl: './add-policy.component.html',
  styleUrls: ['./add-policy.component.css']
})
export class AddPolicyComponent implements OnInit {

  policyName:string = '';
  policyDesc:string = '';
  policy:any = {};
  actionName = "Add";
  button = "Next";
  isValid = true;

  constructor(private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }
  
  ngOnInit() {
    if(localStorage.getItem("pAction")){
      this.actionName = "Edit";
      this.button = "Save";
      this.policyName = JSON.parse(localStorage.getItem("pData"))[0].name;
      this.policyDesc = JSON.parse(localStorage.getItem("pData"))[0].description;
    }
    else if(localStorage.getItem("policy")){
      this.policyName = JSON.parse(localStorage.getItem("policy")).policyname;
      this.policyDesc = JSON.parse(localStorage.getItem("policy")).desc;
    }

  }

  checkPolicyND(){
		if(this.policyName.length > 0 && this.policyDesc.length > 0 ){
  		if(localStorage.getItem("pAction") == "Edit"){
        let newData = JSON.parse(localStorage.getItem("pData"))[0];
        newData.name = this.policyName;
        newData.description = this.policyDesc;
        this.editPolicyND(newData); 
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a policy";
      }
      else{
        this.policy.policyname = this.policyName;
        this.policy.desc = this.policyDesc;
    		localStorage.setItem("policy", JSON.stringify(this.policy));
    		this.router.navigate(["IAM/AttachComponentsActions"]);
      }
    }
    else{
      this.isValid = false;
    }
  }

  editPolicyND(data){
    this.http.post(environment.editPolicyND,data)
    .subscribe(
      (res:any) => {
        if(res.success){
          this.router.navigate(["IAM/ManagePolicy"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }


}
