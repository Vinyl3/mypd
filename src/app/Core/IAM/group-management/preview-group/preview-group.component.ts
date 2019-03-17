import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-preview-group',
  templateUrl: './preview-group.component.html',
  styleUrls: ['./preview-group.component.css']
})
export class PreviewGroupComponent implements OnInit {
  dataSource = [];
  dataSource1 = [];
  group = JSON.parse(localStorage.getItem("group"));
  displayedColumns: string[] = ['name', 'description'];
  displayedColumns1: string[] = ['firstName', 'userEmail'];
  permission = localStorage.getItem("pType");

  constructor(private _location: Location, private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService) { }
  ngOnInit() {
    this.dataSource = this.group.permissionArray;
    this.dataSource1 = this.group.userArray;
  }
  createGroup() {
    let pIds = [];
    let userIds = [];

    for (let x = 0; x < this.group.permissionArray.length; x++) {
      pIds.push(this.group.permissionArray[x].id)
    }
    for (let x = 0; x < this.group.userArray.length; x++) {
      userIds.push(this.group.userArray[x].id)
    }
    let data = {
      groupName: this.group.name,
      desc: this.group.desc,
      companyId: localStorage.getItem("companyId"),
      creatorId: sessionStorage.getItem("userId"),
      pType: this.permission,
      pIds: pIds.toString(),
      userIds: userIds.toString()
    }

    this.http.post(environment.createGroup, data)
      .subscribe(
        (res: any) => {
          if (res) {
            localStorage.removeItem("group");
            this.router.navigate(["IAM/ManageGroup"]);
          }
        },
        err => {
          console.log("Error occured");
        }
      );
      this.CommonUtilService.greenMsgRibbonIsHidden = false;
      this.CommonUtilService.successMsgGreen = "You have successfully added a group"; 
  
  }
  backClicked() {
    this._location.back();
  }
}
