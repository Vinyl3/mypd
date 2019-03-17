import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-company-register2',
  templateUrl: './company-register2.component.html',
  styleUrls: ['./company-register2.component.css']
})
export class CompanyRegister2Component implements OnInit {
  
  userForm: FormGroup;
  submitted = null;
  company : any;
  //zipCodePattern = "^[0-9][0-9 ]+$";
  zipCodePattern = "^[A-Z0-9]+$";
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
   }
  ngOnInit() {
  }
  createForm(){
    this.userForm = this.fb.group({
      addr1: [''],
      addr2: [''],
      addr3: [''],
      city: [''],
      state: [''],
      boxNumber: [''],
      zipCode: ['', [Validators.required, Validators.pattern(this.zipCodePattern)]],
      country: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    //this.router.navigate(["adminRegisteration1"]);
    this.company = JSON.parse(localStorage.getItem("company"));
    this.company.address = {
      "addr1": this.userForm.value.addr1,
      "addr2": this.userForm.value.addr2,
      "addr3": this.userForm.value.addr3,
      "city": this.userForm.value.city,
      "country": this.userForm.value.country,
      "zipCode": this.userForm.value.zipCode,
      "boxNumber": this.userForm.value.boxNumber,
      "state": this.userForm.value.state
      
    };
    console.log(JSON.stringify(this.company))
    localStorage.setItem("company", JSON.stringify(this.company));
    this.router.navigate(["adminRegisteration1"]);
  }

}
