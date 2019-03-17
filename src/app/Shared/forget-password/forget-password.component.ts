//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  show:any ;
  fieldShow: any;

  userForm: FormGroup;
  submitted = null;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  logiResp:any;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
   }
  ngOnInit() {
    this.show = false ;
  this.fieldShow = true;
  }
  createForm(){
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }

  onSubmit() {
    this.submitted = false;
    
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    else{
      var href = "email="+this.userForm.value.email+"&timeStamp="+Date.now();
      console.log(encodedString)
      var encodedString = btoa(href); // base64 encode the parameters for password reset
      var psswdResetUrl = "http://"+window.location.host+"/ConfirmPassword?data="+encodedString;
      console.log(psswdResetUrl)
      

      this.http.post(environment.forgotPassword, {
          
          "link" : psswdResetUrl,
          "email" : this.userForm.value.email
        
    })
      .subscribe(
        (res:any) => {
        this.logiResp="Email has been sent to your email address."
       console.log(res);
       this.show = true ;
       this.fieldShow = false;
        }
      );
    }
    this.submitted = true;
   }

}
