import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registeration1',
  templateUrl: './registeration1.component.html',
  styleUrls: ['./registeration1.component.css']
})
export class Registeration1Component implements OnInit {
  userForm: FormGroup;
  submitted = null;
  invitedData = '';
  invitedEmail = '';
  fnamePattern = "^[a-zA-Z]*$";
  lnamePattern = "^[a-zA-Z]*$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
   }
  ngOnInit() {

    let register1URL = window.location.href;
    if(register1URL.includes("data=")){
      localStorage.clear();
      console.log(" user is Invited ");
      let data = atob(register1URL.split("data=")[1].split("%3D")[0]);
      this.invitedData = data;
      console.log("data = : "+data);
      this.invitedEmail = data.split("&")[0].split("=")[1];
    }
    else{
      console.log(" user is self ");
    }

  }

  createForm(){
    this.userForm = this.fb.group({
      fname: ['', [Validators.required, Validators.pattern(this.fnamePattern)]],
      lname: ['', [Validators.required, Validators.pattern(this.lnamePattern)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  onSubmit() {
    this.submitted = true;
   
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    if(this.invitedData.length>0 && this.userForm.value.email != this.invitedData.split("&")[0].split("=")[1]){
      alert("OOPs! Email doesn't match the invited Email address");
      return;
    }
    this.http.post(environment.emailVerificationUserRegistration, {
      "fname": this.userForm.value.fname,
      "email": this.userForm.value.email,
      "invitedEmail":this.invitedData.length
    })
    .subscribe(
      (res:any) => {
        console.log(res);
        if(res.status == 1){
          localStorage.setItem("userEmailPin", res.mssg);
          localStorage.setItem("fname", this.userForm.value.fname);
          localStorage.setItem("lname", this.userForm.value.lname);
          localStorage.setItem("email", this.userForm.value.email);
          if(this.invitedData.length>0){
            localStorage.setItem("invitedData", this.invitedData);
            this.router.navigate(["userRegisteration3"]);
          }else{
            this.router.navigate(["userRegisteration2"]);
          }
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
