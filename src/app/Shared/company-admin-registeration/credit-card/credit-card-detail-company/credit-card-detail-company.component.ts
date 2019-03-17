//import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardValidator } from 'angular-cc-library';
import { environment } from '../../../../../environments/environment';


@Component({
  selector: 'app-credit-card-detail-company',
  templateUrl: './credit-card-detail-company.component.html',
  styleUrls: ['./credit-card-detail-company.component.css']
})
export class CreditCardDetailCompanyComponent implements OnInit {
  company:any;
  userForm: FormGroup;
  submitted = null;
  card: any;
  cardNumber: string;
  expiryDate: string;
  cvvPattern = "^[0-9]{3,4}$";
  cardNamePattern = "^[a-zA-Z][a-zA-Z ]+$";
 
  constructor(
    private fb: FormBuilder, private router: Router, private http: HttpClient,
    // public previousRouteService: PreviousRouteServiceService
  ) {
    this.createForm();
   }
  ngOnInit() {  
    this.company = JSON.parse(localStorage.getItem("company"));
    
  }
  
  FieldsChange(values:any){
    console.log(values.currentTarget.checked)
  if(values.currentTarget.checked==true){
     
      this.userForm = this.fb.group({ 
        
        addBillingBox:[''],
        addr1:[this.company.address.addr1],
        addr2: [this.company.address.addr2],
        state: [this.company.address.state],
        zipCode: [this.company.address.zipCode],
        city: [this.company.address.city],
        country: [this.company.address.country],
        cardName: [this.userForm.value.cardName],
        cardNumber: [this.userForm.value.cardNumber],
        expiryDate: [this.userForm.value.expiryDate],
        cvvNumber: [this.userForm.value.cvvNumber],
        agreeBox: [this.userForm.value.agreeBox, Validators.required]
      
      });
    } 
    if(values.currentTarget.checked==false){
    
      this.userForm = this.fb.group({ 
        addBillingBox:[''],
        addr1:[''],
        addr2: [''],
        state: [''],
        zipCode: [''],
        city: [''],
        country: [''],
        cardName: [this.userForm.value.cardName],
        cardNumber: [this.userForm.value.cardNumber],
        expiryDate: [this.userForm.value.expiryDate],
        cvvNumber: [this.userForm.value.cvvNumber],
        agreeBox: [this.userForm.value.agreeBox, Validators.required]
       
      });
      
    }
         }
  createForm(){
    this.userForm = this.fb.group({ 
      addBillingBox:[''],
      addr1:[''],
      addr2: [''],
      state: [''],
      zipCode: [''],
      city: [''],
      country: [''],
      cardName: ['', [Validators.required, Validators.pattern(this.cardNamePattern)]],
      cardNumber: ['', [Validators.required, CreditCardValidator.validateCCNumber]],
      expiryDate: ['', [Validators.required, CreditCardValidator.validateExpDate]],
      cvvNumber: ['', [Validators.required, Validators.pattern(this.cvvPattern)]],
      agreeBox: ['', Validators.required]
     
    });
  }
  isDisplay = true;
  
  onSubmit() {
    
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }
    //this.router.navigate(["welcome"]);
    
    this.card = {
      cardName: this.userForm.value.cardName,
      cardNumber: this.userForm.value.cardNumber,
      expiryDate: this.userForm.value.expiryDate,
      cvvNumber: this.userForm.value.cvvNumber
    };

    this.card.address = {
      addr1: this.userForm.value.addr1,
      addr2: this.userForm.value.addr2,
      state: this.userForm.value.state,
      city: this.userForm.value.city,
      country: this.userForm.value.country,
      zipCode: this.userForm.value.zipCode
    };
    
    this.http.post( environment.registerCompany, {
      "company": JSON.parse(localStorage.getItem("company")),
      "admin": JSON.parse(localStorage.getItem("admin")),
      "card": this.card,
      "userId":sessionStorage.getItem("userId")
    })
      .subscribe(
        (res:any) => {
          if(res.status == 1){
            this.isDisplay = false;
            //this.router.navigate(["welcome"]);
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
  
  // gotoWelcome(){
  //   console.log("welcome.popupHide");
  //   // this.previousRouteService.isHidden = true;
  //   this.router.navigate(["welcome"]);
  // }
  
  popupHide(){
    this.isDisplay = true;
  }
}
