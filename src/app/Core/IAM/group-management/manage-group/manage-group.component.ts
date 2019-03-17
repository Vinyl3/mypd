import { Component, OnInit, OnDestroy, Inject, Renderer2  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { CommonUtilService } from '../../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.css']
})
export class ManageGroupComponent implements OnInit ,OnDestroy{
  dataSource;
  displayedColumns = ['select', 'name', 'description'];
  groupArray = [];
  isPopupHidden = true;
  showDropMenu = false;

  constructor(private http: HttpClient, private router: Router, public CommonUtilService: CommonUtilService,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) { }

  ngOnDestroy(){
    this.CommonUtilService.greenMsgRibbonIsHidden = true;
  }

  ngOnInit() {
    this.CommonUtilService.activeSubPoint = "group";
    this.getAllGroups();
    localStorage.removeItem("pType");
    localStorage.removeItem("gData");
    localStorage.removeItem("group");
  }

  getAllGroups() {
    this.http.post(environment.getAllGroups, {
      "companyId": localStorage.getItem("companyId")
    })
      .subscribe(
        (res: any) => {
          if (res.groups) {
            this.dataSource = res.groups;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  onChange(event, group) {
    if (event.checked) {
      this.groupArray.push(group);
    }
    else {
      for (let x = 0; x < this.groupArray.length; x++) {
        if (group.id == this.groupArray[x].id)
          this.groupArray.splice(x, 1);
      }
    }
  }

  groupDetail(group) {
    this.groupArray = [];
    this.groupArray.push(group);
    localStorage.setItem("gData", JSON.stringify(this.groupArray));
    this.router.navigate(["IAM/GroupDetail"]);
  }

  deleteGroup() {
    let groupIds = [];
    for (let x = 0; x < this.groupArray.length; x++) {
      groupIds.push(this.groupArray[x].id)
    }

    this.http.post(environment.deleteGroups, { 
      "groupIds": groupIds.toString() 
    })
      .subscribe(
        (res: any) => {
          if (res.success.length > 0) {
            this.isPopupHidden = true;
            this.groupArray = [];
            this.getAllGroups();
          }
          this.CommonUtilService.greenMsgRibbonIsHidden = false;
          this.CommonUtilService.successMsgGreen = "You have successfully deleted group/groups";
          this.renderer.removeClass(this.document.body, 'embedded-body');
        },
        err => {
          console.log("Error occured");
        }
      );
      
  }

  deleteGroupPopup() {
    if (this.isPopupHidden = this.isPopupHidden ? false : true) {
      this.renderer.removeClass(this.document.body, 'embedded-body');
    }
    else{
      this.renderer.addClass(this.document.body, 'embedded-body');
    }
  }

  modifyGroupND() {
    localStorage.setItem("gData", JSON.stringify(this.groupArray));
    this.router.navigate(["IAM/AddGroup"]);
  }

  modifyGroupPermission(type) {
    localStorage.setItem("pType", type);
    localStorage.setItem("gData", JSON.stringify(this.groupArray));
    this.router.navigate(["IAM/AttachGroupPermission"]);
  }

  modifyGroupUser() {
    localStorage.setItem("gData", JSON.stringify(this.groupArray));
    this.router.navigate(["IAM/AttachGroupUser"]);
  }

  options(type) {
    this.showDropMenu = type == 'toggle' ? !this.showDropMenu : false;
  }

  deleteButton(){
    return this.groupArray.length>=1 ? true : false;
  }

  editButton(){
    return this.groupArray.length==1 ? true : false;
  }

}
