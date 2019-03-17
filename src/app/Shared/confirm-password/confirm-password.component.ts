//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-confirm-password',
  templateUrl: './confirm-password.component.html',
  styleUrls: ['./confirm-password.component.css']
})
export class ConfirmPasswordComponent implements OnInit {
  time:any;
  timeDiffHrs:any;
  date:any;
  userForm: FormGroup;
  submitted = null;
  resetResp : any;
  linkExpire:any;
  data:any; 
  public linkExp = false;
  public linkValid = false;
  dataurl:any;
  email:any;  
  dataurl1:any;
  email1:any;
  time1:any;
  passwPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$";
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
    
   }
  ngOnInit() {
 
    this.dataurl1= window.location.href;
    this.dataurl = this.dataurl1.split("data=");
    this.dataurl=this.dataurl[1].toString().split("%3D")
    this.data = atob(this.dataurl[0]).toString().split("&");
    this.data=this.data.toString().split("&");
    this.data=this.data.toString().split(",");
    this.email1=this.data[0].toString().split("=");
    this.time1=this.data[1].toString().split("=");
    this.email =this.email1[1];
    this.time=this.time1[1];
    this.date=new Date().getTime();
    this.timeDiffHrs = (this.date - this.time)/(1000*60*60);
     if (this.timeDiffHrs>24) {       
           this.linkExp = true;
         return;     
     }
     else{    
      this.linkValid=true;
     }
  }
  createForm(){
    this.userForm = this.fb.group({
      confirmPass1: ['', [Validators.required, Validators.pattern(this.passwPattern)]],
      confirmpass2:['', [Validators.required]]
    });
  }

  onSubmit() {
  
   this.submitted = false;

      this.http.post(environment.resetPassword, {

          "email" : this.email,
          "passw" : this.userForm.value.confirmpass2
        
    })
          .subscribe(
        (res:any) => {
          if(res.status == 1){
            this.resetResp="your password has been reset. "
            this.router.navigate(["login"]);          
          }
          else{
            alert("Error: "+res.mssg);
          }         
        },
      );
  }
}