import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';


@Component({
  selector: 'app-preview-role',
  templateUrl: './preview-role.component.html',
  styleUrls: ['./preview-role.component.css']
})
export class PreviewRoleComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['name', 'action'];
  role = JSON.parse(localStorage.getItem("role"));

  constructor(private _location: Location, private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService) { }
  
  ngOnInit() {
    console.log(this.role);
    this.dataSource = this.role.policyArray;
  }

  backClicked() {
    this._location.back();
  }

  createRole(){
    let policyIds = [];

    for(let x=0;x<this.role.policyArray.length;x++){
        policyIds.push(this.role.policyArray[x].id)
    }

    console.log("policyIds = : "+policyIds);

    let data = { roleName : this.role.roleName,
                 desc : this.role.desc,
                 companyId:localStorage.getItem("companyId"),
                 creatorId:sessionStorage.getItem("userId"),
                 policyIds : policyIds.toString()
                }

    this.http.post(environment.createRole,data)
    .subscribe(
      (res:any) => {
        if(res){
         localStorage.removeItem("role");
         this.router.navigate(["IAM/ManageRole"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
    this.CommonUtilService.greenMsgRibbonIsHidden = false;
    this.CommonUtilService.successMsgGreen = "You have successfully added a Role";  
  }

  
  

}
