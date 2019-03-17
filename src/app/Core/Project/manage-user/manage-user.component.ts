import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})

export class ManageUserComponent implements OnInit {
  dataSource;
  displayedColumns = ['select', 'name', 'email'];
  prUserArray = [];
  isPopupHidden = true;
  showDropMenu = false;
  isValidated = true;
  project = JSON.parse(localStorage.getItem("project"));
  constructor(private _location: Location, private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    this.getAllUsersinCompany();
    if(localStorage.getItem("prData")){
      this.projecthasUsers(JSON.parse(localStorage.getItem("prData"))[0].id);
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

  projecthasUsers(projectId){
    this.http.post(environment.projecthasUser, {
      "projectId": projectId
    })
    .subscribe(
      (res:any) => {
        if(res.data){
          this.prUserArray = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  onUserChange(event, user) {
    if (event.checked) {
      this.prUserArray.push(user);
    }
    else {
      for (let a = 0; a < this.prUserArray.length; a++) {
        if (user.id == this.prUserArray[a].id)
          this.prUserArray.splice(a, 1);
      }
    }
  }

  userChecked(user) {
    for (let i = 0; i < this.prUserArray.length; i++) {
      if (this.prUserArray[i].id == user.id)
        return true;
    }
  }

  checkProjectUsers() {
    if (this.prUserArray.length > 0) {
      let newData = JSON.parse(localStorage.getItem("prData"))[0];
      let userIds = [];
      for (let x = 0; x < this.prUserArray.length; x++) {
        userIds.push(this.prUserArray[x].id)
      }
      let data = {
        projectId : newData.id,
        userIds : userIds.toString(),
        companyId :localStorage.getItem("companyId")
      };
      this.editProjectUsers(data);
    } else {
      this.isValidated = false;
    }
  }

  editProjectUsers(data){
    this.http.post(environment.editProjecthasUser,data)
    .subscribe(
      (res:any) => {
        if(res.success){
          this.CommonUtilService.greenMsgRibbonIsHidden = false;
          this.CommonUtilService.successMsgGreen = "You have successfully edited a project";
          this.router.navigate(["project/ManageProject"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
