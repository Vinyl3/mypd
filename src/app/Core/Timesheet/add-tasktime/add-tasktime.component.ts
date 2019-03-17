import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { CommonUtilService } from '../../../services/common-util.service';

@Component({
  selector: 'app-add-tasktime',
  templateUrl: './add-tasktime.component.html',
  styleUrls: ['./add-tasktime.component.css']
})

export class AddtaskTimeComponent implements OnInit {

  stName;
  stDesc: string = '';
  stEntryDate: any;
  stDuration: any;
  subTask: any = {};
  subTaskDate;
  date: any = new Date();
  @Input() inputArray = [];
  myForm: FormGroup;
  editFlag;
  editableDataValue;
  //addsubTaskPopUpHide: any;
  options;
  taskId;
  taskName;

  constructor(
    private http: HttpClient,
    private router: Router,
    public CommonUtilService: CommonUtilService,
    public dialogRef: MatDialogRef<AddtaskTimeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
    ) {
      this.options = this.data.options;
      if (this.data && this.data.edit) {
       this.editFlag = true;
       this.editableDataValue = this.data.subTask;
       this.subTaskDate = new Date(this.editableDataValue.date);
       this.taskName = this.editableDataValue.task;
       this.taskId = this.editableDataValue.taskId;
      console.log(this.subTaskDate);
     } else {
        this.editFlag = false;
        this.taskId = this.data.task.id;
        this.taskName = this.data.task.name;
     }
  }

  ngOnInit() {
    const newForm = this.fb.group({
      stEntryDate: ['',Validators.required],
      formArray: this.fb.array([])
    });
    this.myForm = newForm;
    this.addInput();
  }

 getControls() {
  return (<FormArray>this.myForm.get('formArray')).controls;
}

  addInput(): void {
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    const newGroup = this.fb.group({
      stName: [''],
      stDesc: [''],
      stDuration: ['', [Validators.min(1), Validators.max(99)]]
    });
    arrayControl.push(newGroup);
  }

  editInput(data): void {
    const arrayControl = <FormArray>this.myForm.controls['formArray'];
    const newGroup = this.fb.group({
      stName: [data.subtask, [Validators.required]],
      stDesc: [data.description, [Validators.required]],
      stDuration: [data.duration],
    });
    arrayControl.push(newGroup);
  }

  closeTaskTime() {
    this.dialogRef.close();
  }

 //this.dialogRef.close({data: this.myForm.value.formArray, date: this.subTaskDate});
   
  addEditTimeLog() {
    console.log(this.myForm.value);
    var data  = this.prepareDataToSave();
    console.log('prepared Data');
    console.log(data);
    if(this.editFlag){
      console.log('editTimeLog');
      this.editTimeLog(data);
    }else{
      console.log('addTimeLog');
      this.addTimeLog(data);
    }
  }

  prepareDataToSave(){
    let timelog = [];
    for(let j = 0; j < this.myForm.value.formArray.length; j++){
      let logObj : any = {};
      logObj.task = this.taskName;
      logObj.taskId = this.taskId;
      logObj.description = this.myForm.value.formArray[j].stDesc;
      logObj.duration = this.myForm.value.formArray[j].stDuration;
      logObj.date = moment(this.subTaskDate).format().slice(0,10);
      logObj.status = 0;
      logObj.userId = sessionStorage.getItem("userId");
      logObj.projectId = localStorage.getItem("projectId");

      if(this.options && this.options.length > 0){
        for (let i = 0; i < this.options.length; i++) {
          if(this.options[i].name == this.myForm.value.formArray[j].stName){
            logObj.subtask = this.options[i].name;
            logObj.subtaskId = this.options[i].id;
            break;
          }
          else {
            logObj.subtask = this.myForm.value.formArray[j].stName;
            logObj.subtaskId = '';
          }
        }
      }else{
        logObj.subtask = this.myForm.value.formArray[j].stName;
        logObj.subtaskId = '';
      }

      timelog.push(logObj);
    }
    return timelog;
  }

  addTimeLog(data) {
    this.http.post(environment.saveTimeLog, {
      "companyId" : localStorage.getItem("companyId"),
      "timelogData" : data
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.dialogRef.close();
        }
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "Timelog added successfully";
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  editTimeLog(data) {
    this.http.post(environment.editTimeLog, {
      "companyId" : localStorage.getItem("companyId"),
      "editId" : this.editableDataValue.id,
      "timelogData" : data
    })
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.dialogRef.close();
        }
        this.CommonUtilService.greenMsgRibbonIsHidden = false;
        this.CommonUtilService.successMsgGreen = "Timelog edited successfully";
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}

/*function DateValidator(format = 'MM/dd/YYYY'): any {
  return (control: FormControl): { [key: string]: any } => {
    const val = moment(control.value, format, true);

    if (!val.isValid()) {
      return { invalidDate: true };
    }

    return null;
  };
}*/
