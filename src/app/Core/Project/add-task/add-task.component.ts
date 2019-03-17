import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

// export interface User {
//   firstName: string;
//   lastName: string;
// }

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddtaskComponent implements OnInit {
  // nameFormControl = new FormControl();
  options = [];
  // filteredOptions: Observable<User[]>;
  taskName = "";
  assignee ;
  estimatedTime ;
  project = JSON.parse(localStorage.getItem("prData"))[0];
  projectName = this.project.name;
  isValid = true;
  imageUrl: string = "";
  assigneEerrorclass = "";

  constructor(private router: Router, private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    this.projecthasUser();
    // this.filteredOptions = this.nameFormControl.valueChanges
    //   .pipe(
    //     startWith<string | User>(''),
    //     map(value => typeof value === 'string' ? value : value.firstName + " " + value.lastName  ),
    //     map(userEmail => userEmail ? this._filter(userEmail) : this.options.slice())
    //   );
  }

  // displayFn(user?: User): string | undefined {
  //   return user ? user.firstName + " " + user.lastName : undefined;
  // }

  // private _filter(userEmail: string): User[] {
  //   const filterValue = userEmail.toLowerCase();
  //   return this.options.filter(option => option.firstName.toLowerCase().includes(filterValue));
  // }

  checkTaskNA(){
    if(this.taskName.length>0 && this.assignee && this.projectName.length>0 && this.estimatedTime){
      this.createTask();
    }
    else{
      this.isValid = false;
    }
  }

  projecthasUser() {
    this.http.post(environment.projecthasUser, {
      "projectId": this.project.id
    })
    .subscribe(
      (res: any) => {
        if (res.data) {
          this.options = res.data.map((i) => { i.fullName = i.firstName + ' ' + i.lastName; return i; });
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  createTask(){
    this.http.post(environment.createTask, {
      "projectId": this.project.id,
      "companyId" : localStorage.getItem("companyId"),
      "creatorId" : sessionStorage.getItem("userId"),
      "taskname": this.taskName,
      "assigneeId": this.assignee.id,
      "estimatedTime" : this.estimatedTime

    })
    
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.CommonUtilService.greenMsgRibbonIsHidden = false;
          this.CommonUtilService.successMsgGreen = "You have successfully created a task";
          this.router.navigate(["project/ProjectDetail"]);
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  userErrorFunction(){
    if(this.assignee){
      this.assigneEerrorclass = "";
    }
    else{
      this.assigneEerrorclass = "assigneEerrorclass";
    }
  }



}
