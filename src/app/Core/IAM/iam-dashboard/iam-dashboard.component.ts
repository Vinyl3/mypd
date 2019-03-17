import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';

@Component({
  selector: 'app-iam-dashboard',
  templateUrl: './iam-dashboard.component.html',
  styleUrls: ['./iam-dashboard.component.css']
})
export class IAMDashboardComponent implements OnInit {

  userCount:any ;
  groupCount:any ;
  roleCount:any ;
  policyCount:any ;
  panelOpenState;

  constructor(private http: HttpClient, public CommonUtilService: CommonUtilService) { }

  ngOnInit() {
    this.getComponentCounts();
    this.CommonUtilService.activeSubPoint = "iamDashboard";
  }

  getComponentCounts(){
    this.http.post(environment.getComponentCounts, {
      "companyId" :localStorage.getItem("companyId")    
    })
    .subscribe(
      (res:any) => {
        if(res){
          this.userCount = res.userCount;
          this.groupCount = res.groupCount;
          this.roleCount = res.roleCount;
          this.policyCount = res.policyCount;
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
