import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';

@Component({
  selector: 'app-attach-group-user',
  templateUrl: './attach-group-user.component.html',
  styleUrls: ['./attach-group-user.component.css']
})
export class AttachGroupUserComponent implements OnInit {

  dataSource;
  displayedColumns = ['select', 'firstName', 'userEmail'];
  group = JSON.parse(localStorage.getItem("group"));
  userArray = [];
  actionName = "Add";
  button = "Next";
  isValidated = true;

  constructor(private _location: Location, private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    this.getAllUsersinCompany();
    if (localStorage.getItem("gData")) {
      this.actionName = "Edit";
      this.button = "Save";
      this.grouphasUsers(JSON.parse(localStorage.getItem("gData"))[0].id);
    }
    else if (Object.keys(JSON.parse(localStorage.getItem("group"))).length > 3) {
      this.group = JSON.parse(localStorage.getItem("group"));
      this.userArray = this.group.userArray;
    }
  }

  backClicked() {
    this._location.back();
  }

  getAllUsersinCompany() {
    this.http.post(environment.getAllUsersinCompany, {
      "companyId": localStorage.getItem("companyId")
    })
      .subscribe(
        (res: any) => {
          if (res.userincompany) {
            this.dataSource = res.userincompany;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  onUserChange(event, user) {
    if (event.checked) {
      this.userArray.push(user);
    }
    else {
      for (let a = 0; a < this.userArray.length; a++) {
        if (user.id == this.userArray[a].id)
          this.userArray.splice(a, 1);
      }
    }
  }

  userChecked(user) {
    for (let i = 0; i < this.userArray.length; i++) {
      if (this.userArray[i].id == user.id)
        return true;
    }
  }

  grouphasUsers(groupId) {
    console.log(groupId);
    this.http.post(environment.grouphasUsersList, {
      "groupId": groupId
    })
      .subscribe(
        (res: any) => {
          if (res.grouphasUsers) {
            this.userArray = res.grouphasUsers;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  checkUsers() {
    if (this.userArray.length > 0) {
      if (localStorage.getItem("gData")) {
        let newData = JSON.parse(localStorage.getItem("gData"))[0];
        console.log("User data  = : " + JSON.stringify(newData));
        let userIds = [];
        for (let x = 0; x < this.userArray.length; x++) {
          userIds.push(this.userArray[x].id)
        }
        let data = {
          groupId: newData.id,
          userIds: userIds.toString(),
          companyId: localStorage.getItem("companyId")
        };
        this.editGroupUsers(data);
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "You have successfully edited a Group";

      }
      else {
        this.group.userArray = this.userArray;
        localStorage.setItem("group", JSON.stringify(this.group));
        this.router.navigate(["IAM/PreviewGroup"]);
      }
    } else {
      this.isValidated = false;
    }
  }

  editGroupUsers(data) {
    this.http.post(environment.editGroupHasUsers, data)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(["IAM/ManageGroup"]);
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }
}
