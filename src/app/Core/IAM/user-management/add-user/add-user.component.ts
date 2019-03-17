import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

export interface User {
  userEmail: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  emailFormControl = new FormControl();
  options: User[] = [];
  filteredOptions: Observable<User[]>;
  userEmail;
  userMsg: string = '';
  user: any = {};
  actionName = "Add";
  button = "Next";
  isValid = true;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getUserNotinCompany();
    this.filteredOptions = this.emailFormControl.valueChanges
      .pipe(
        startWith<string | User>(''),
        map(value => typeof value === 'string' ? value : value.userEmail),
        map(userEmail => userEmail ? this._filter(userEmail) : this.options.slice())
      );
    if (localStorage.getItem("user")) {
      this.userEmail = JSON.parse(localStorage.getItem("user")).email;
      this.userMsg = JSON.parse(localStorage.getItem("user")).mssg;
    }
  }

  displayFn(user?: User): string | undefined {
    return user ? user.userEmail : undefined;
  }

  private _filter(userEmail: string): User[] {
    const filterValue = userEmail.toLowerCase();
    return this.options.filter(option => option.userEmail.toLowerCase().includes(filterValue));
  }
  
  getUserNotinCompany() {
    this.http.post(environment.getUserNotinCompany, {
      "companyId": localStorage.getItem("companyId")
    })
      .subscribe(
        (res: any) => {
          if (res.usernotincompany) {
            this.options = res.usernotincompany;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  checkUserND() {
    if (this.userEmail && this.userMsg.length > 0) {
      if (this.options.indexOf(this.userEmail) > -1) {
        this.user.email = this.userEmail;
        this.user.mssg = this.userMsg;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.router.navigate(["IAM/AttachUserPermission"]);
      } else {
        this.user.email = this.userEmail;
        this.user.mssg = this.userMsg;
        localStorage.setItem("user", JSON.stringify(this.user));
        localStorage.setItem("newUser", JSON.stringify(true));
        this.router.navigate(["IAM/AttachUserPermission"]);
      }
    }
    else {
      this.isValid = false;
    }
  }
}
