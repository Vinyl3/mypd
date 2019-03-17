import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-preview-user',
  templateUrl: './preview-user.component.html',
  styleUrls: ['./preview-user.component.css']
})

export class PreviewUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description'];
  dataSource;
  user = JSON.parse(localStorage.getItem("user"));
  permission = localStorage.getItem("pType");
  UserEmailName = true;
  pIds = [];

  constructor(private _location: Location, private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    this.dataSource = this.user.permissionArray;
    if (localStorage.getItem('newUser')) {
      this.UserEmailName = false;
    }
    for (let x = 0; x < this.user.permissionArray.length; x++) {
      this.pIds.push(this.user.permissionArray[x].id)
    }
  }

  backClicked() {
    this._location.back();
  }

  createUser() {

    if (localStorage.getItem('newUser')) {
      var newUserdata = "email=" + this.user.email + "&pType=" + this.permission + "&pIds=" + this.pIds.toString() + "&companyId=" + localStorage.getItem("companyId");
      var encodedString = btoa(newUserdata);
      var addNewUserUrl = "http://" + window.location.host + "/userRegisteration1?data=" + encodedString;

      this.http.post(environment.InviteUsertoRegister, {
        "email": this.user.email,
        "link": addNewUserUrl,
        "mssg": this.user.mssg
      })
        .subscribe(
          (res: any) => {
            if (res) {
              this.router.navigate(["IAM/ManageUser"]);
            }
          },
          err => {
            console.log("Error occured");
          }
        );
      this.CommonUtilService.greenMsgRibbonIsHidden = false;
      this.CommonUtilService.successMsgGreen = "Invitation Email is sent to New User";
    } else {
      var data = {
        companyId: localStorage.getItem("companyId"),
        userId: this.user.email.id,
        pIds: this.pIds.toString(),
        pType: this.permission,
      }

      this.http.post(environment.AddUsertoCompany, data)
        .subscribe(
          (res: any) => {
            if (res) {
              localStorage.removeItem("user");
              this.router.navigate(["IAM/ManageUser"]);
            }
          },
          err => {
            console.log("Error occured");
          }
        );
      this.CommonUtilService.greenMsgRibbonIsHidden = false;
      this.CommonUtilService.successMsgGreen = "You have successfully added a user";
    }
  }


}