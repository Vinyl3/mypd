import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilService {
  isWelcomePopUpHidden = true;
  greenMsgRibbonIsHidden = true;
  successMsgGreen = '';
  activeSubPoint = '';
  accessDeniedPop = true;
  //isRegisterBtnHidden = true;
  showVar: boolean = false;
  // taskListData: any = [];

  constructor() { }

  isSuperAdmin(){
    console.log("creator = : "+JSON.parse(localStorage.getItem("company")).creatorId);
    console.log("user = : "+sessionStorage.getItem("userId"));
    if(JSON.parse(localStorage.getItem("company")).creatorId == sessionStorage.getItem("userId")){
      return true;
    }
    else{
      return false;
    }
  }

  isUserAllowed(type,projectName,action){
    console.log("type = : "+type+"  projectName = : "+projectName+"   action = : "+action);
    if(this.isSuperAdmin()){
      console.log("SuperAdmin");
      return true;
    }
    else{
      console.log(" Not SuperAdmin");
      var privileges = JSON.parse(localStorage.getItem("privileges"));
      for(let i = 0; i<privileges.length; i++){
        console.log("privilege type = : "+privileges[i].ctype);
        if(privileges[i].ctype == type){
          console.log("cnames = : "+privileges[i].cnames+"  actions = : "+privileges[i].actions);
          console.log("index cnames = : "+privileges[i].cnames.indexOf(projectName)+"index  actions = : "+privileges[i].actions.indexOf(action));
          if(privileges[i].cnames.indexOf(projectName)>=0 && privileges[i].actions.indexOf(action)>=0){
            return true;
          }
        }
      }
      return false;
    }
  }

  canReviewTimesheet(){
    if(this.isSuperAdmin()){
      console.log("SuperAdmin");
      return true;
    }else{
      console.log(" Not SuperAdmin");
      var privileges = JSON.parse(localStorage.getItem("privileges"));
      for(let i = 0; i<privileges.length; i++){
        console.log(" action   " +privileges[i].actions);
        if(privileges[i].actions == 'Approve/Reject'){
          return true;
        }
      }
      return false;
    }
  }

}
