import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { AppService } from '../app.service';
import * as GlobalVariable from '../app.globals';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  // AbstractControl,
  FormBuilder
} from '@angular/forms';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import { SharedService } from '../shared.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-leave-application',
  templateUrl: './leave-application.component.html',
  styleUrls: ['./leave-application.component.css']
})
export class LeaveApplicationComponent implements OnInit {
  showLoading: boolean = false;
  showHoliday: boolean = false;
  editNoofDays: any;
  fullHolidayList: any;
  employeeLeaveBalance1: any;
  toDate: any;
  fromDate: any;
  toDate1: any;
  fromDate1: any;
  holiStar: any;
  employeeLeaveBalance: any;
  userLeavesData: any = [];
  noOfLeavesApplied: any;
  filter: any;
  policyYear: any;
  showPolicy: any;
  managerid: any;
  employeeList: any;
  userName: string;
  employeeDetails: any;
  availableDays: any = 0;
  availableDays1: any = 0;
  holidayList1: any;
  leavebalance: any = [];
  employeeid: string;
  DataPolicy: any;
  manager: string;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
  @ViewChild('closeBtn2') closeBtn2: ElementRef;
  @ViewChild('closeBtn3') closeBtn3: ElementRef;
  @ViewChild('closeBtn6') closeBtn6: ElementRef;
  @ViewChild('submitButton') submitButton: ElementRef;
  @ViewChild('submitButton1') submitButton1: ElementRef;
  @ViewChild('submitButton2') submitButton2: ElementRef;
  @ViewChild('submitButton3') submitButton3: ElementRef;
  @ViewChild('submitButton4') submitButton4: ElementRef;
  @ViewChild('submitButton6') submitButton6: ElementRef;
  @ViewChild('editButton') editButton: ElementRef;


  userid: any;
  leaveId: any;
  policyId: string;
  userId: any;
  noOfDays: number = 0;
  noOfDays1: number = 0;
  public selectedMoments = [new Date(), new Date()];
  min = new Date();
  date: any = '';
  comments: any = '';
  comments1: any = '';
  comments2: any = '';
  dropdownSettings1: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  selectedItems1: any= {};
  dropdownList1: { "id": number; "itemName": string; }[] = [];
  public selectedMoment2 = new FormControl(new Date());
  data: any;
  leaveApplyForm: FormGroup;
  leaveRequestList: any = [];
  leaveApprovedList: any;
  public editMoments = [new Date(2018, 1, 12), new Date(2018, 3, 21)];
  public disableDates = new Date(2018, 5, 1);
  holidayList: any;
  username: any;
  managerId: any;
  usernameId: any;
  managername: any;
  leaveSearch: any = '';
  employeeId: any;
  policyMasterId: any;
  counter: any = 0;

  constructor(private share: SharedService, public modal: Modal, private fb: FormBuilder, private appService: AppService, public toastr: ToastsManager, private spinnerService: Ng4LoadingSpinnerService) {
    this.leaveApplyForm = fb.group({
      'leaveType': '',
      "date": '',
      "manager": '',
      "comments": '',
      "File": ''
    });
  }





  public closeModal(): void {
    this.comments1 = '';
    this.comments = '';
    this.closeBtn.nativeElement.click();
  }
  public closeModal1(): void {
    this.comments1 = '';
    this.comments = '';
    this.closeBtn1.nativeElement.click();
  }
  public closeModal2(): void {
    this.closeBtn2.nativeElement.click();
  }

  public closeModal3(): void {
    this.closeBtn3.nativeElement.click();
  }

  public closeModal6(): void {
    this.closeBtn6.nativeElement.click();
  }

 

  public myFilter = (date): any => {
    let disableddates = ["1-15-2018", "1-26-2018","5-1-2018","8-15-2018","9-13-2018","10-2-2018","10-19-2018","11-1-2018","11-7-2018","12-25-2018"];
     var m = date.getMonth();
 var da = date.getDate();
 var y = date.getFullYear();
    const day = date.getDay();
    var currentdate = (m + 1) + '-' + da + '-' + y ;
    
  
  
    var disval = true;
    for (let i = 0; i < disableddates.length; i++) {
     
      if(disableddates[i] == currentdate) {
        disval = false;
         return;
    
      }  
    }
 return disval && day !== 0 && day !== 6;
  
  }


 

  
 
  // public myFilter = (d: Date): boolean => {
  //   const day = d.getDay();
  //    const m = d.getMonth();
    

  //   // const holiDay = this.disableDates.getDay();
  //   // const holiMonth = this.disableDates.getMonth()+1;
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }
  


  historySettings = {
    mode: 'inline',
    columns: {
      // userId: {
      //   title: 'userId'
      // },
      leaveTypeName: {
        title: 'Leave Type'
      },
      noOfDays: {
        title: 'No Of Days'
      },
      employeeCommentSubmission: {
        title: 'Comments'
      },
      status: {
        title: 'Status'
      }
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
      edit: false,
    }
  };


  historyData = [
  ];




  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
  onItemSelect1(item: any) {
    // debugger;
    // this.availableDays = ''
    // let availableday = 0;
    // for (var i = 0; i < this.employeeLeaveBalance1.length; i++) {
    //   if (this.employeeLeaveBalance1[i].leaveType == this.selectedItems1.itemName) {
    //     this.availableDays = this.employeeLeaveBalance1[i].available;
    //     if (this.availableDays < availableday) {
    //       this.availableDays = availableday;
    //     } else {
    //       this.availableDays = this.availableDays;
    //     }
    //   }
    // }

  }
  onItemSelect2(item: any) {
    this.availableDays1 = ''
    for (var i = 0; i < this.employeeLeaveBalance1.length; i++) {
      if (this.employeeLeaveBalance1[i].leaveType == this.selectedItems1.itemName) {
        this.availableDays1 = this.employeeLeaveBalance1[i].available;
      }
    }

  }
  
  public changeLeaveType(){
     this.availableDays = ''
    let availableday = 0;
    for (var i = 0; i < this.employeeLeaveBalance1.length; i++) {
      if (this.employeeLeaveBalance1[i].leaveType == this.selectedItems1.itemName) {
        this.availableDays = this.employeeLeaveBalance1[i].available;
        if (this.availableDays < availableday) {
          this.availableDays = availableday;
        } else {
          this.availableDays = this.availableDays;
        }
      }
    }
  }

  ngOnInit() {
   
    this.getEmployeeDetailsList();







    this.getPolicyList();




  }


  public getbyoneemployeedetail() {
    this.share.currentemployeeid.subscribe(message => this.employeeid = message);
    let reqparam = {
      "employeeId": this.employeeid
    }
    this.appService.HttpPost(GlobalVariable.getoneemployee, reqparam).then(
      data => {
        this.share.changemangername(data.result[0].reportingManagerName);
        this.share.changemanagerid(data.result[0].reportingManagerId);
        this.getData(data);

      },
      error => { error; });
  }

  public getEmployeeList() {
    this.share.currentuserName.subscribe(message => this.userName = message);
    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getEmployeeList).subscribe(
        data => {
          this.employeeList = data.result;
          // for(var i=0;i<this.employeeList;i++){
          //   if(this.employeeList[i].username==this.userName){
          //     this.managername=this.employeeList[i].reportingManagerName;
          //     this.managerid=this.employeeList[i].reportingManagerEmployeeId;
          //     this.share.changemangername(this.managername);
          //     this.share.changemanagerid(this.managerid);
          //   }
          // }
          this.share.currentleavebalance.subscribe(message => this.leavebalance = message);
          this.share.currentuserName.subscribe(message => this.username = message);
          this.share.currentuserId.subscribe(message => this.usernameId = message);
          this.share.currentmangerid.subscribe(message => this.managerId = message);
          this.share.currentmangername.subscribe(message => this.manager = message);
          this.getEmployeeLeaveList();
        },
        error => { error });

    }
  }

  public getData(data) {
    this.leavebalance = data.result[0].leaveBalanceResponses;
    // console.log("this.leavebalance",this.leavebalance);
    this.share.changeleavebalance(this.leavebalance);
    this.employeeLeaveBalance = data.result;
    this.employeeLeaveBalance1 = data.result[0].leaveDetailsResponses;
    // console.log("this.employeeLeaveBalance", this.employeeLeaveBalance);

    this.employeeLeaveBalance.forEach((element, index) => {
      let newLop = 0;
      element.leaveDetailsResponses.forEach((elm, i) => {
        // this.employeeDetails[index].leaveDetailsResponses[i]["available"]=(elm.available < 0) ? 0 : elm.available;
        newLop = (elm.available < 0) ? (newLop + (-1 * (elm.available))) : newLop;
      });
      this.employeeLeaveBalance[index]["LOPVal"] = newLop;

    });

  }

  public getEmployeeDetailsList() {
    this.share.currentuserId.subscribe(message => this.usernameId = message);
    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getEmployeeDetails).subscribe(
        data => {

          this.employeeDetails = data.result;
          for (var i = 0; i < this.employeeDetails.length; i++) {
            if (this.usernameId == this.employeeDetails[i].userId) {
              this.employeeid = this.employeeDetails[i].employeeId;
              this.share.changeemployeeid(this.employeeid);
              this.getbyoneemployeedetail();
            }
          }

          this.getEmployeeList();

        },
        error => {
          this.toastr.error('error');
        });

    }




  }

  

  public getPolicyList() {
    // let currentDate=new Date();
    // let getYear;
    // if(currentDate.getMonth()>=2){
    //   getYear=currentDate.getFullYear()-1;
    // }
    // else{
    //   getYear=currentDate.getFullYear();
    // }
    this.showPolicy = {};

    if (typeof window !== 'undefined') {

      this.appService.HttpGet(GlobalVariable.getPolicyList).subscribe(
        data => {
          this.DataPolicy = data.result;
          for (var i = 0; i < this.DataPolicy.length; i++) {
            if (this.DataPolicy[i].enabled == true) {
              this.showPolicy = this.DataPolicy[i];
              this.policyMasterId = this.DataPolicy[i].policyId;
              this.policyYear = this.DataPolicy[i].policyYear;
              this.policyId = this.DataPolicy[i].policyId
            }
          }
          this.getHolidayList();
          this.getUserLeaves();
        },
        error => { error });

    }
  }

  public getUserLeaves() {
    this.share.currentemployeeid.subscribe(message => this.employeeid = message);

    let reqData = {
      "policyMasterId": this.policyMasterId,
      "userId": this.employeeid
    }
    this.appService.HttpPost(GlobalVariable.getUserLeaves, reqData).then(
      data => {
      //  this.userLeavesData = data.result.leaveDetailResponses;
        // console.log("this.userLeavesData", this.userLeavesData);
      },
      error => { error; });





  }


  public editLeave() {
    let startDate = new Date(this.editMoments[0]);
    let endDate = new Date(this.editMoments[1]);
  //  this.submitButton2.nativeElement.disabled = true;
    let noDays = 0;
    if (this.showHoliday == false) {
      noDays = this.noOfDays;
    } else {
      noDays = this.noOfDays - this.holidayList1.length;
    }

    if (this.comments == '' || this.leaveId == '' || this.userid == '') {
      // const dialogRef = this.modal.alert()
      //     .size("sm")
      //     .showClose(true)
      //     .title("edit Leave")
      //     .body(`
      //     <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //     .open();
      this.toastr.error("Please make sure that all values are entered")
    }

    else {
      // if (this.noOfDays1 > 3) {
      //   //  this.toastr.error("Since your leave count is zero,Please apply LOP")
      // }
      // else {
         if (this.availableDays1 < this.noOfDays) {
        // this.toastr.error("Since your leave count is zero,Please apply LOP")
      }
      else {
        let reqData = {
          "comment": this.comments,
          "leaveApplicationId": this.leaveId,
          "noOfDays": noDays,
          "endDate": endDate.toLocaleDateString(),
          "leaveTypeId": this.selectedItems1.id,
          "modifiedBy": this.username,
          "policyMasterId": this.policyId,
          "reportingManagerId": this.managerId,
          "startDate": startDate.toLocaleDateString(),
          "userId": this.employeeId
        }
          this.spinnerService.show();
          this.appService.HttpPost(GlobalVariable.editLeaveApplied, reqData).then(
            data => {
              this.closeModal2();
              this.clearData();
              if (data.success == true) {
                this.spinnerService.hide();
                this.toastr.success(data.statusMessage);
              }
              else if (data.success == false) {
                this.spinnerService.hide();
                this.toastr.error(data.statusMessage)
              }
              this.getEmployeeLeaveList();
              this.getbyoneemployeedetail();

            },
            error => { 
                this.spinnerService.hide();
              error; });
      }
     }
  }

  public editLeave1() {
    let startDate = new Date(this.editMoments[0]);
    let endDate = new Date(this.editMoments[1]);

     let noDays = 0;
    if (this.showHoliday == false) {
      noDays = this.noOfDays;
    } else {
      noDays = this.noOfDays - this.holidayList1.length;
    }

    if (this.comments == '' || this.leaveId == '' || this.userid == '') {
      // const dialogRef = this.modal.alert()
      //     .size("sm")
      //     .showClose(true)
      //     .title("edit Leave")
      //     .body(`
      //     <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //     .open();
      this.toastr.error("Please make sure that all values are entered")
    }

    else {
      // if(this.availableDays1<this.noOfDays1){
      //   // this.toastr.error("Since your leave count is zero,Please apply LOP")
      // }
      // else{
      let reqData = {
        "comment": this.comments,
        "leaveApplicationId": this.leaveId,
        "noOfDays": noDays,
        "endDate": endDate.toLocaleDateString(),
        "leaveTypeId": this.selectedItems1.id,
        "modifiedBy": this.username,
        "policyMasterId": this.policyId,
        "reportingManagerId": this.managerId,
        "startDate": startDate.toLocaleDateString(),
        "userId": this.employeeId
      }
     this.spinnerService.show();
      this.appService.HttpPost(GlobalVariable.editLeaveApplied, reqData).then(

        data => {
          this.closeModal2();
          this.closeModal3();
          this.clearData();
          if (data.success == true) {

            this.toastr.success(data.statusMessage);
            this.spinnerService.hide();

          }
          else if (data.success == false) {
            this.toastr.error(data.statusMessage);
            this.spinnerService.hide();
          }
          this.getEmployeeLeaveList();
          this.getbyoneemployeedetail();
        },
        error => {
          error;
          this.spinnerService.hide();
        });
    }
    // }
  }


  public cancelLeave() {
    this.submitButton3.nativeElement.disabled = true;
    if (this.comments1 == '' || this.leaveId == '' || this.userid == '') {
      // const dialogRef = this.modal.alert()
      //     .size("sm")
      //     .showClose(true)
      //     .title("Apply Leave")
      //     .body(`
      //     <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //     .open();
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "comment": this.comments1,
        "leaveApplicationId": this.leaveId,
        "reportingManagerId": this.managerId
      }
      this.spinnerService.show();
      //  this.showLoading=true;
      this.appService.HttpPost(GlobalVariable.cancelLeave, reqData).then(

        data => {
          //  this.showLoading=false;
          this.closeModal1();
          this.submitButton3.nativeElement.disabled = false;
          if (data.success == true) {
            this.spinnerService.hide();
            this.toastr.success(data.statusMessage);
          }
          else if (data.success == false) {
            this.spinnerService.hide();
            this.toastr.error(data.statusMessage);
          }
          this.getEmployeeLeaveList();
          this.getbyoneemployeedetail();
        },
        error => { error; });
    }
  }

  public withdrawLeave() {
    this.submitButton4.nativeElement.disabled = true;
    if (this.comments2 == '' || this.leaveId == '') {
      // const dialogRef = this.modal.alert()
      //     .size("sm")
      //     .showClose(true)
      //     .title("Apply Leave")
      //     .body(`
      //     <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //     .open();
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "withdrawalComment": this.comments2,
        "leaveApplicationId": this.leaveId,
      }
      this.spinnerService.show();
      this.appService.HttpPost(GlobalVariable.withDrawLeave, reqData).then(
        data => {
          this.closeModal6();
          if (data.success == true) {
            this.spinnerService.hide();
            this.toastr.success(data.statusMessage);
          }
          else if (data.success == false) {
            this.toastr.error(data.statusMessage)
            this.spinnerService.hide();
          }
          this.getEmployeeLeaveList();
          this.getbyoneemployeedetail();
        },
        error => { error; });
    }
  }

  getLeaveData(leaveId, startDate, endDate, employeeCommentSubmission, leaveTypeName, noOfLeavesApplied, userId) {
    this.noOfLeavesApplied = noOfLeavesApplied;
    this.leaveId = leaveId;
    let date = new Date(startDate);
    this.selectedItems1 = {};
    this.employeeId = userId;
    this.noOfDays = noOfLeavesApplied;
    this.editMoments = [new Date(startDate), new Date(endDate)];

    for (var i = 0; i < this.dropdownList1.length; i++) {
      if (leaveTypeName == this.dropdownList1[i].itemName) {
        this.selectedItems1=this.dropdownList1[i];
        break;
      }
    }
    this.onItemSelect2(this.selectedItems1);
    this.comments = employeeCommentSubmission;
    var sd = new Date(startDate);
    var ed = new Date(endDate);
    this.editMoments = [new Date(sd.getFullYear(), sd.getMonth(), sd.getDate()), new Date(ed.getFullYear(), ed.getMonth(), ed.getDate())];
    // this.selectedMoment2.value[0]=startDate;
    // this.selectedMoment2.value[1]=endDate;
    this.dateDifference(sd, ed);
    
  }
  public getEmployeeLeaveList() {

    if (typeof window !== 'undefined') {
      let reqData = {
        "id": this.employeeid

      }
      this.appService.HttpPost(GlobalVariable.getEmployeeLeaveList, reqData).then(
        data => {
          // this.leaveRequestList = data.result;
          this.leaveRequestList = [];
          // console.log("this.leaveRequestList", this.leaveRequestList);
          for (let i = 0; i < data.result.length; i++) {
            // if(((data.result[i].status == 'pending') || (data.result[i].status == 'approved') || (data.result[i].status == 'consumption started')) && data.result[i].startDate> this.min){
            if ((data.result[i].status == 'pending') || (data.result[i].status == 'approved') || (data.result[i].status == 'consumption started')) {
              this.leaveRequestList.push(data.result[i]);
            }
          }
          this.historyData = [];
          for (let i = 0; i < data.result.length; i++) {
            if (data.result[i].status !== 'pending' && data.result[i].status !== 'approved' && data.result[i].status !== 'consumption started') {
              this.historyData.push(data.result[i]);
            }
          }
        },
        error => { error; });

    }
    this.getLeaveList();
    this.selectedItems1 = {};
    this.dropdownSettings1 = {
      singleSelection: true,
      text: "Select Leave Type",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      classes: "myclass custom-class"
    };


  }





  public getLeaveList() {
    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getLeaveList).subscribe(
        data => {
          this.data = data.result;
          this.getDropdown1();


        },
        error => { error });

    }
  }



  public getHolidayList() {
    this.fromDate = Date.parse(this.selectedMoment2.value[0]);
    this.toDate = Date.parse(this.selectedMoment2.value[1]);

    this.fromDate1 = new Date(this.editMoments[0]);
    this.toDate1 = new Date(this.editMoments[1]);



    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getHolidayList).subscribe(
        data => {
          let holidayList = [];
          this.holidayList = [];
          this.holidayList1 = [];
          this.fullHolidayList = data.result;
         
          holidayList = data.result;



          for (var i = 0; i < holidayList.length; i++) {
            let date = new Date(holidayList[i].date);
            let date1 = Date.parse(holidayList[i].date);

            if ((this.counter == 0) && (date.getFullYear() == this.policyYear)) {
              for (var i = 0; i < holidayList.length; i++) {
                this.holidayList.push(holidayList[i]);
              }
              this.counter = 1;
            }
            else if (date.getFullYear() == this.policyYear && this.fromDate < date1 && this.toDate > date1) {
              this.holidayList.push(holidayList[i]);

            }
          }
          for (var i = 0; i < holidayList.length; i++) {
            let date = new Date(holidayList[i].date);
            let date1 = Date.parse(holidayList[i].date);

            if ((this.counter == 0) && (date.getFullYear() == this.policyYear)) {
              for (var i = 0; i < holidayList.length; i++) {
                this.holidayList.push(holidayList[i]);
              }
              this.counter = 1;
            }
            else if (date.getFullYear() == this.policyYear && this.fromDate1 < date1 && this.toDate1 > date1) {
              this.holidayList1.push(holidayList[i]);

            }
          }
        },
        error => { error });

    }
  }

  public getDropdown1() {
    this.dropdownList1 = [];
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].enabled == true) {
        this.dropdownList1.push({
          "id": this.data[i].id,
          "itemName": this.data[i].name
        })
      }
    }
  }
  public dateDifference(start, end) {
  

    // Copy date objects so don't modify originals
    var s: any = new Date(+start);
    var e: any = new Date(+end);

    // Set time to midday to avoid dalight saving and browser quirks
    s.setHours(12, 0, 0, 0);
    e.setHours(12, 0, 0, 0);

    // Get the difference in whole days
    var totalDays = Math.round((e - s) / 8.64e7);

    // Get the difference in whole weeks
    var wholeWeeks = totalDays / 7 | 0;
    // Estimate business days as number of whole weeks * 5
    this.noOfDays = wholeWeeks * 5;

    // If not even number of weeks, calc remaining weekend days
    if (totalDays % 7) {
      s.setDate(s.getDate() + wholeWeeks * 7);

      while (s < e) {
        s.setDate(s.getDate() + 1);

        // If day isn't a Sunday or Saturday, add to business days
        if (s.getDay() != 0 && s.getDay() != 6) {
          ++this.noOfDays;
        }
      }
    }
    for (var i = s; i <= e; s.setDate(s.getDate() + 1)) {
      for (var j = 0; j < this.fullHolidayList.length; j++) {
        let h = new Date(this.fullHolidayList[j].date)
        if (s.getDate() == h.getDate() && s.getMonth() == h.getMonth() && s.getFullYear() == h.getFullYear()) {
          this.noOfDays = this.noOfDays - 1;
        }
      }
    }
    this.noOfDays = this.noOfDays + 1;
    this.noOfDays1 = this.noOfDays;
    return this.noOfDays;

  }
  public changeDate(date) {
    var dt1 = new Date(date.value[0]);
    var dt2 = new Date(date.value[1]);




    // if (date.value[1] != null) {
    //   this.noOfDays = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    //   if (this.noOfDays == 0) {
    //     this.noOfDays = 1;
    //   }
    // }
    // else if (date.value[1] == null) {
    //   this.noOfDays = 1;
    // }
    this.dateDifference(dt1, dt2);
    this.getHolidayList();
  }
  public changeDate1(date) {

    var dt3 = new Date(date[0]);
    var dt4 = new Date(date[1]);
    this.showHoliday = true;

    this.dateDifference(dt3, dt4);
    this.getHolidayList();
  }

  public applyLeave() {

    let startDate = new Date(this.selectedMoment2.value[0]);
    let endDate = new Date(this.selectedMoment2.value[1]);

    let numberOf = this.noOfDays - this.holidayList.length;
    // console.log("hfbfbghjr",numberOf);

    //   this.submitButton6.nativeElement.disabled = true;


    // this.holiStar = new Date(this.selectedMoment2.value[0]);

    if (this.comments == '' || this.selectedMoments[0] == null || this.policyId == '' || this.userId == '' || this.selectedItems1.length == 0) {
      // const dialogRef = this.modal.alert()
      //     .size("sm")
      //     .showClose(true)
      //     .title("Add Leave")
      //     .body(`
      //     <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //     .open();
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      if (this.availableDays == 0 || this.availableDays < this.noOfDays) {
        // this.toastr.error("Since your leave count is zero,Please apply LOP")
      }
      else {
        let reqparam = {
          "endDate": endDate.getTime(),
          "leaveTypeId": this.selectedItems1.id,
          "policyMasterId": this.policyId,
          "startDate": startDate.getTime(),
          "employeeCommentSubmission": this.comments,
          "reportingManagerId": this.managerId,
          "userId": this.usernameId,
          "noOfDays": numberOf,
          "createdBy": this.username
        }

        if (typeof window !== 'undefined') {
          this.spinnerService.show();
          this.appService.HttpPost(GlobalVariable.applyLeave, reqparam).then(
            data => {
              if (data.success == true) {
                this.toastr.success(data.statusMessage);
                this.spinnerService.hide();
              }
              else if (data.success == false) {
                this.toastr.error(data.statusMessage);
                this.spinnerService.hide();
              }
              this.clearData();
              this.getEmployeeLeaveList();
              this.getbyoneemployeedetail();
              this.getUserLeaves();

            },
            error => {
              this.spinnerService.hide();
              this.toastr.error('error');
              this.clearData();
            });

         }
      }
    }
  }

  public applyLeave1() {


    let startDate = new Date(this.selectedMoment2.value[0]);
    let endDate = new Date(this.selectedMoment2.value[1]);
    let numberOf = this.noOfDays - this.holidayList.length;
    this.submitButton.nativeElement.disabled = true;


    if (this.comments == '' || this.selectedMoments[0] == null || this.policyId == '' || this.userId == '' || this.selectedItems1.length == 0) {
      // const dialogRef = this.modal.alert()
      //     .size("sm")
      //     .showClose(true)
      //     .title("Add Leave")
      //     .body(`
      //     <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //     .open();
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      if (this.availableDays > this.noOfDays) {
        // this.toastr.error("Since your leave count is zero,Please apply LOP")
      }
      else {
        let reqparam = {
          "endDate": endDate.getTime(),
          "leaveTypeId": this.selectedItems1.id,
          "policyMasterId": this.policyId,
          "startDate": startDate.getTime(),
          "employeeCommentSubmission": this.comments,
          "reportingManagerId": this.managerId,
          "userId": this.usernameId,
          "noOfDays": numberOf,
          "createdBy": this.username
        }

        if (typeof window !== 'undefined') {
          this.spinnerService.show();
          this.appService.HttpPost(GlobalVariable.applyLeave, reqparam).then(
            data => {

              if (data.success == true) {
                this.spinnerService.hide();
                this.toastr.success(data.statusMessage);
              }
              else if (data.success == false) {
                this.spinnerService.hide();
                this.toastr.error(data.statusMessage)
              }
              this.clearData();
              this.closeModal();
              this.getEmployeeLeaveList();
              this.getbyoneemployeedetail();

            },
            error => {
              this.toastr.error('error');
              this.clearData();
            });

        }
      }
    }
  }

  public clearData() {
    this.comments = '';
    this.selectedItems1 = {};
    this.selectedMoment2 = new FormControl(new Date());;
    this.noOfDays = 0;
    this.availableDays = 0;
    this.selectedMoment2.value[0] = new Date();
    this.selectedMoment2.value[1] = new Date();


  }
  public modalClose() {
    this.comments1 = '';
  }


}
