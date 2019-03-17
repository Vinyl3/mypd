import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Task {
  subTaskName: string;
}

@Component({
  selector: 'app-tasktime-template',
  templateUrl: './tasktime-template.component.html',
  styleUrls: ['./tasktime-template.component.css']
})
export class TaskTimeTemplateComponent implements OnInit {
  @Input() myForm: FormGroup;
  @Input() editableData: any;
  @Input() options: any;
  stNameOption = new FormControl();
  filteredOptions: Observable<Task[]>;
  stDesc: string = '';
  stDuration: any;
  subTask: any = {};
  subTaskName;
  subTaskDesc;
  subTaskTime;
  subTaskDate;
  //options=[]


  constructor(private formBuilder: FormBuilder) {
   }

  ngOnInit() {
    console.log(this.options);
   if (this.editableData) {
      this.subTaskName = this.editableData.subtask;
      this.subTaskDesc = this.editableData.description;
      this.subTaskTime = this.editableData.duration;
      this.subTaskDate = this.editableData.date;
   }
  //  this.options=this.optionList 
    this.getTask();
    this.filteredOptions = this.stNameOption.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => typeof value === 'string' ? value : value.subTaskName),
        map(subTaskName => subTaskName ? this._filter(subTaskName) : this.options.slice())
      );
  }

  private _filter(subTaskName: string): Task[] {
    const filterValue = subTaskName.toLowerCase();
    return this.options.filter(option => option.subTaskName.toLowerCase().includes(filterValue));
  }

/*  displayFn(task?: Task): string | undefined {
    return task ? task.subTaskName : undefined;
  }*/

  getTask() {
    // this.options = [
    //   { id: 1, projectName: 'Project 1', subTaskName: 'SubTask 1' },
    //   { id: 2, projectName: 'Project 2', subTaskName: 'SubTask 2' }
    // ];
  }

/*  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }*/
}
