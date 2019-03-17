import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Location } from '@angular/common';
@Component({
  selector: 'app-policy-detail',
  templateUrl: './policy-detail.component.html',
  styleUrls: ['./policy-detail.component.css']
})
export class PolicyDetailComponent implements OnInit {
  displayedColumns: string[] = ['ctype', 'cnames','actions'];
  dataSource;
  policy= JSON.parse(localStorage.getItem("pData"))[0]; 

  constructor(private _location: Location, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.dataSource=JSON.parse(localStorage.getItem("pData"));
  }
  backClicked() {
    this._location.back();
  }
   modifyPolicyND(){
    localStorage.setItem("pAction", "Edit");
    this.router.navigate(["IAM/AddPolicy"]);
  }

  modifyPolicyComponents(){
    localStorage.setItem("pAction", "Edit");
    this.router.navigate(["IAM/AttachComponentsActions"]);
  }
  
}
