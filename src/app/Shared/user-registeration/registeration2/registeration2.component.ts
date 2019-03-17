import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration2',
  templateUrl: './registeration2.component.html',
  styleUrls: ['./registeration2.component.css']
})
export class Registeration2Component implements OnInit {

  userForm: FormGroup;
  userEnteredPin: string;
  userEmailPin: string;
  submitted = null;
  constructor(private fb: FormBuilder, private router: Router) {
    this.createForm();
  }
  ngOnInit() {
  }
  createForm() {
    this.userForm = this.fb.group({
      otpPin: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.userEnteredPin = this.userForm.value.otpPin;
    this.userEmailPin = localStorage.getItem("userEmailPin");

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    else if (this.userEnteredPin === this.userEmailPin) {
      this.router.navigate(["userRegisteration3"]);
    }
    else {
      alert("OTP is not matched ... Please Try Again!!");
    }
  }

}
