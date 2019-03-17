import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';


@Component({
  selector: 'app-preview-policy',
  templateUrl: './preview-policy.component.html',
  styleUrls: ['./preview-policy.component.css']
})
export class PreviewPolicyComponent implements OnInit {

  datasource = [];
  displayedColumns: string[] = ['component', 'componentName', 'action'];
  policy = JSON.parse(localStorage.getItem("policy"));

  constructor(private _location: Location, private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService) { }
  
  ngOnInit() {
    var obj = { ctype:this.policy.ctype,
                cnames:this.policy.cnames,
                actions:this.policy.actions
              };
    this.datasource.push(obj);
  }

  backClicked() {
    this._location.back();
  }

  createPolicy(){
    this.policy.creatorId = sessionStorage.getItem("userId");
    this.policy.companyId = localStorage.getItem("companyId");
    this.http.post(environment.createPolicy,this.policy)
    .subscribe(
      (res:any) => {
       if(res){
          localStorage.removeItem("policy");
          this.router.navigate(["IAM/ManagePolicy"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
    this.CommonUtilService.greenMsgRibbonIsHidden = false;
    this.CommonUtilService.successMsgGreen = "You have successfully added a policy"; 
  }
}
