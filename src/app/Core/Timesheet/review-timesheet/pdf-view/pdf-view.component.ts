import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { CommonUtilService } from '../../../../services/common-util.service';
import { DOCUMENT } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.css']
})

export class PdfViewComponent implements OnInit {
  show: boolean = false;
  src = environment.timesheet;

  constructor(public CommonUtilService: CommonUtilService, @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, public dialogRef: MatDialogRef<PdfViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.src = this.src + this.data.timesheetName;
  }
  onLoad() {
    this.show = true;
  }
  closePdf() {
    this.dialogRef.close();
    this.renderer.removeClass(this.document.body, 'embedded-body');
  }

}
