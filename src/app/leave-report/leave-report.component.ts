import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, Optional } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { AppService } from '../app.service';
import * as GlobalVariable from '../app.globals';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { Router } from '@angular/router';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { ExcelService } from '../excel.service'; 
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  // AbstractControl,
  FormBuilder
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SharedService } from '../shared.service';


@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.css']
})
export class LeaveReportComponent implements OnInit {
  endDate: Date;
  startDate: Date;

       end: Date;
       last: Date;
      date:any = new Date();
    public myMoments1 = [new Date(2018, 1, 12), new Date(2018, 3, 21)];

  constructor(private share:SharedService,private excelService: ExcelService,public modal: Modal, private fb: FormBuilder, private router: Router, private appService: AppService, public toastr: ToastsManager) { }

  ngOnInit() {
     this.last= new Date(this.date.getTime() - (30 * 24 * 60 * 60 * 1000));
    this.end=new Date(this.date.getTime() + (30 * 24 * 60 * 60 * 1000));
    this.myMoments1=[new Date(this.last.getFullYear(),this.last.getMonth(),this.last.getDate()),new Date(this.end.getFullYear(),this.end.getMonth(),this.end.getDate())];
  }

  public myFilter1 = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

   public changeDate1(myMoments1){
     this.startDate=new Date(this.myMoments1[0]);
  this.endDate=new Date(this.myMoments1[1]);
   
   }

   public getLeaveStatusByDate1() {
   
 
    let reqData = {
      "endDate": this.endDate.getTime(),
      "startDate": this.startDate.getTime()

    }
  if (typeof window !== 'undefined') {
  
     
    this.appService.HttpPost(GlobalVariable.exportToExcel,reqData).then(
      data => {
           console.log("alldb",data.statusMessage);
     
    window.open('http://13.127.176.207:8081/rest/employees/download');
   
    
      },
      error => { error; });

  }
}







}
