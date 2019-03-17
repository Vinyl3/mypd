import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  hide;
  emailOrPass = true;
  userForm: FormGroup;
  submitted = null;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  // passwPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,32}$";
  
  constructor(
    private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
   }

  ngOnInit() {
  }

  onPassFocus(){
    this.emailOrPass = true;
  }

  createForm(){
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      passw: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
   
    this.http.post(environment.userLogin, {
      "email": this.userForm.value.email,
      "passw": this.userForm.value.passw
    }).subscribe(
        (res:any) => {
          console.log(res);
          if(res.status == 1){
            sessionStorage.clear();
            localStorage.clear();
            sessionStorage.setItem("userId", res.mssg[0].id);
            localStorage.setItem("userEmail", res.mssg[0].userEmail);
            localStorage.setItem("userFName", res.mssg[0].firstName);
            localStorage.setItem("userLName", res.mssg[0].lastName);
            
            for(let i=0;i<res.company.length;i++){
              if(res.company[i].creatorEmail == res.mssg[0].userEmail){
                console.log("Default Company Id = : "+res.company[i].id);
                localStorage.setItem("companyId", res.company[i].id);
                localStorage.setItem("company", JSON.stringify(res.company[i]));
              }
            }
            sessionStorage.setItem('isLogin', 'true');
            this.router.navigate(["dashboard"]);
          }
          else{
            this.emailOrPass = false;
          }
        },
        err => {
          console.log("Error occured");
        }
      );
  }

}
