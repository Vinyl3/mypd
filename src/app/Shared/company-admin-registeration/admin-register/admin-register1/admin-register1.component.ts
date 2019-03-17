//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';



@Component({
  selector: 'app-admin-register1',
  templateUrl: './admin-register1.component.html',
  styleUrls: ['./admin-register1.component.css']
})
export class AdminRegister1Component implements OnInit {

  userForm: FormGroup;
  submitted = false;
  admin: any;
  mobilePattern = "^[+0-9]+$";
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
    // this.form=fb.group({
    //   phone:['']
    // })
   }

  

  ngOnInit() {
  }
  createForm(){
    this.userForm = this.fb.group({
      officeNumber:[''],
      cellNumber:['']
      // desig: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    this.router.navigate(["adminRegisteration2"]);
    this.http.post(environment.verifyMobile, {
      "cellNumber": environment.extension+this.userForm.value.cellNumber.replace(/\D/g, '').substring(0, 10)
    })
      .subscribe(
        (res:any) => {
          console.log(res);
          this.admin = {
            "officeNumber": this.userForm.value.officeNumber,
            "cellNumber": this.userForm.value.cellNumber
          };
          if(res.status == 1){
            localStorage.setItem("admin", JSON.stringify(this.admin));
            localStorage.setItem("userPhonePin", res.mssg);
            this.router.navigate(["adminRegisteration2"]);
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
