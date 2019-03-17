import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-registeration3',
  templateUrl: './registeration3.component.html',
  styleUrls: ['./registeration3.component.css']
})
export class Registeration3Component implements OnInit {

  userForm: FormGroup;
  submitted = null;
  passwMatch = null;
  passw: string;
  confirmPassw: string;
  passwPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$";
  
  fname: string;
  lname: string;
  email: string;

  constructor(
    private fb: FormBuilder, private router: Router, private http: HttpClient,
    public CommonUtilService: CommonUtilService,
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2
  ) {
    this.createForm();
  }
  ngOnInit() {
  }
  createForm(){
    this.userForm = this.fb.group({
      passw: ['', [Validators.required, Validators.pattern(this.passwPattern)]],
      confirmPassw: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.passwMatch = false;
    this.fname = localStorage.getItem("fname");
    this.lname = localStorage.getItem("lname");
    this.email = localStorage.getItem("email");
    this.passw = this.userForm.value.passw;
    this.confirmPassw = this.userForm.value.confirmPassw;
    
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    
    if (this.passw == this.confirmPassw) {
      this.passwMatch = true;
      if(localStorage.getItem("invitedData")){
        let data  = localStorage.getItem("invitedData");
        let pType  = data.split("&")[1].split("pType=")[1];
        let pIds  = data.split("&")[2].split("pIds=")[1];
        let companyId  = data.split("&")[3].split("companyId=")[1];
        this.userRegisterInvited(pType,pIds,companyId);
      }else{
        this.userRegisterSelf();
      }
    }
    else {
      console.log("passw didn't match");
      this.passwMatch = false;
      this.submitted = false;
    }
  }

  userRegisterSelf(){
    this.http.post(environment.registerUser, {
      "fname": this.fname,
      "lname": this.lname,
      "email": this.email,
      "passw": this.passw
    })
    .subscribe(
      (res:any) => {
        console.log(res);
        if(res.status == 1){
          sessionStorage.setItem('userId', res.userId);
          sessionStorage.setItem('isLogin', 'true');
          this.CommonUtilService.isWelcomePopUpHidden = false;
          this.router.navigate(["dashboard"]);
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

  userRegisterInvited(pType,pIds,companyId){
    this.http.post(environment.registerUserInvited, {
      "fname": this.fname,
      "lname": this.lname,
      "email": this.email,
      "passw": this.passw,
      "pType": pType,
      "pIds": pIds,
      "companyId": companyId
    })
    .subscribe(
      (res:any) => {
        console.log(res);
        if(res.status == 1){
          sessionStorage.setItem('userId', res.userId);
          sessionStorage.setItem('isLogin', 'true');
          this.CommonUtilService.isWelcomePopUpHidden = false;
          this.router.navigate(["dashboard"]);
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
}
