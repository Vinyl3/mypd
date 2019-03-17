import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'delete'];
  dataSource;
  group = JSON.parse(localStorage.getItem("gData"))[0];
  tabType = "Role";
  removeFGroupPopup = true;
  pId = '';


  constructor(private _location: Location, private http: HttpClient,private router: Router,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }


  ngOnInit() {
    this.grouphasRoles(environment.grouphasRolesList); 

  }
  backClicked() {
    this._location.back();
  }
  permissionType(type) {
    this.tabType = type;  
    if (type == 'Role') {
      this.grouphasRoles(environment.grouphasRolesList);
    } else if (type == 'Policy') {
      this.grouphasPolicies(environment.grouphasPoliciesList);
    } else if (type == 'User') {
      this.grouphasUsers(environment.grouphasUsersList);
    }
  }

  modifyGroupND() {
    this.router.navigate(["IAM/AddGroup"]);
  }

  modifyGroupPermission(type) {
    localStorage.setItem("pType", this.tabType);
    this.router.navigate(["IAM/AttachGroupPermission"]);
  }

  modifyGroupUser() {
    this.router.navigate(["IAM/AttachGroupUser"]);
  }

  grouphasRoles(url) {
    this.http.post(url, {
      "groupId": this.group.id
    })
      .subscribe(
        (res: any) => {
          if (res.grouphasRoles) {
            this.dataSource = res.grouphasRoles;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  grouphasPolicies(url) {
    this.http.post(url, {
      "groupId": this.group.id
    })
      .subscribe(
        (res: any) => {
          if (res.grouphasPolicies) {
            this.dataSource = res.grouphasPolicies;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  grouphasUsers(url) {
    this.http.post(url, {
      "groupId": this.group.id
    })
      .subscribe(
        (res: any) => {
          if (res.grouphasUsers) {
           this.dataSource = res.grouphasUsers;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  removeFromGroupPopup(tabType, id) {
    if (this.removeFGroupPopup = this.removeFGroupPopup ? false : true){
        this.renderer.removeClass(this.document.body, 'embedded-body');
    }
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
    this.tabType = tabType;
    this.pId = id;
    console.log(" remove popup called for " + tabType + " pId = : " + id);
  }

  closeGroupPopup() {
    if (this.removeFGroupPopup = this.removeFGroupPopup ? false : true){
        this.renderer.removeClass(this.document.body, 'embedded-body');
    }
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  removePrivilege() {
    if (this.tabType == 'Role' || this.tabType == 'Policy') {
      this.removePolicyorRoleFromGroup();
    }
    else if (this.tabType == 'User') {
      this.removeUserPrivileges();
    }
    this.removeFGroupPopup = true;
  }

  removePolicyorRoleFromGroup() {
    this.http.post(environment.removePolicyorRoleFromGroup, {
      "groupId": this.group.id,
      "pType": this.tabType,
      "pId": this.pId
    })
      .subscribe(
        (res: any) => {
          if (res) {
            this.permissionType(this.tabType);
          }
          this.renderer.removeClass(this.document.body, 'embedded-body');
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  removeUserPrivileges() {
    this.http.post(environment.RemoveUserPrivileges, {
      "pId": this.group.id,
      "pType": 'Group',
      "userId": this.pId,
      "companyId": localStorage.getItem("companyId")
    })
      .subscribe(
        (res: any) => {
          if (res) {
            this.permissionType(this.tabType);
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
