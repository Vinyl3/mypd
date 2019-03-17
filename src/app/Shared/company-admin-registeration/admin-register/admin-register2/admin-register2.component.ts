import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {DOCUMENT} from '@angular/common';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-register2',
  templateUrl: './admin-register2.component.html',
  styleUrls: ['./admin-register2.component.css']
})
export class AdminRegister2Component implements OnInit {
  isDisplay = true;
  userForm: FormGroup;
  userEnteredPin: string;
  userPhonePin: string;
  submitted = null;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    this.createForm();
  }
  ngOnInit() {
  }
  createForm() {
    this.userForm = this.fb.group({
      otpPin: ['', Validators.required]
    });
  }

  verifyOtp() {
    this.submitted = true;
    this.userEnteredPin = this.userForm.value.otpPin;
    this.userPhonePin = localStorage.getItem("userPhonePin");

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    if (this.userEnteredPin === this.userPhonePin) {
    }
    else {
      alert("OTP is not matched ... Please Try Again!!");
    }

    
  }
  registerCompany(){
    this.http.post( environment.registerCompany, {
      "company": JSON.parse(localStorage.getItem("company")),
      "admin": JSON.parse(localStorage.getItem("admin")),
      "userId":sessionStorage.getItem("userId")
    })
      .subscribe(
        (res:any) => {
          if(res.status == 1){
            this.isDisplay = false;
            //this.router.navigate(["welcome"]);
            this.renderer.addClass(this.document.body, 'embedded-body');
          }
          else{
            alert("Error: "+res.mssg);
          }
          
        },
        err => {
          console.log("Error occured");
        }
      );
  }

  succesPopupClose(){
      this.isDisplay = true;
      this.renderer.removeClass(this.document.body, 'embedded-body');
      this.router.navigate(["dashboard"]);
  }

}
