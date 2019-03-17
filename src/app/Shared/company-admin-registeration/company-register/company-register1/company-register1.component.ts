//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-company-register1',
  templateUrl: './company-register1.component.html',
  styleUrls: ['./company-register1.component.css']
})
export class CompanyRegister1Component implements OnInit {
  imageBinary:any;
  userForm: FormGroup;
  submitted = null;
  company: any;
  companyExists = null;
  websiteExists = null;
  companyPattern = "^[a-zA-Z0-9][a-zA-Z0-9 ]+$"; // allow only alphanumerics and spaces.
  //websitePattern = "^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$";
  
  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.createForm();
   }
  ngOnInit() {
  }
  createForm(){
    this.userForm = this.fb.group({
      //cname: ['', [Validators.required, Validators.pattern(this.companyPattern)]],
      cname: ['', [Validators.required]],
      website: ['', [Validators.required]],
      cdetail: [''],
      clogo: ['']

    });
  }

  onSubmit(event) {
    
    this.submitted = true;
     // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    this.submitted = true;

    if(!isUndefined(event.target[3].files[0])){
    var reader = new FileReader();
    reader.readAsDataURL(event.target[3].files[0]);
      reader.onload = () => {
        this.imageBinary = reader.result;
        this.http.post(environment.imageUpload , {
          "binaryImage": this.imageBinary,
          "email": localStorage.getItem("userEmail")
        })
        .subscribe(
          (res:any) => {
            /*if(res.status == 1){
              console.log("Image saved successfully !");
              this.router.navigate(["companyRegisteration2"]);
            }
            else{
              console.log("Error in Image saving !");
            }*/
          },
          err => {
            console.log("Error in Image saving !");
          }
        );        
      };
    }

    this.http.post(environment.checkCompanyValidity, {
      "cname": this.userForm.value.cname,
      "website": this.userForm.value.website
    })
    .subscribe(
      (res:any) => {
        if(res.status == 0){
          if(res.companyStatus == 0){
            this.companyExists = "This Company is already registered.";
          }
          else{
            this.companyExists = "";
          }
          if(res.urlstatus == 0){
            this.websiteExists = "This website does not exist.";
          }
          else if(res.urlstatus == -1){
            this.websiteExists = "This website must be valid. Please include http or https";
          }
          else{
            this.websiteExists = "";
          }
        }
        else if(res.status == 1){
          this.company = {
            "cname": this.userForm.value.cname,
            "cdetail": this.userForm.value.cdetail,
            "website": this.userForm.value.website,
            "clogo": localStorage.getItem("userEmail").split("@")[0]
          };
          localStorage.setItem("company", JSON.stringify(this.company));
          this.router.navigate(["companyRegisteration2"]);
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


