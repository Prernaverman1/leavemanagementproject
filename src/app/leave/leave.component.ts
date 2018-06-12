import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import * as GlobalVariable from '../app.globals';
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { SharedService } from '../shared.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  employeeExport: any;
  end: Date;
  filter:any;
  min = new Date();
  date:any = new Date();
  last:any;
  public myMoments = [new Date(2018, 1, 12), new Date(2018, 3, 21)];
  public myMoments1 = [new Date(2018, 1, 12), new Date(2018, 3, 21)];
  empid: string;
  testObject1: any={};
  employeeDetails: any=[];
  username: string;
  managerid: any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeBtn1') closeBtn1: ElementRef;
   @ViewChild('approveButton') approveButton: ElementRef;  
    @ViewChild('rejectButton') rejectButton: ElementRef;

  pendingList: any;
  applicationId: any;
  managerId: any;
   comments: any = '';

   applicationId1: any;
  managerId1: any;
   comments1: any = '';
   employeeSubdetails:any;
  

  constructor(private share:SharedService,private appService: AppService,public toastr: ToastsManager,private spinnerService: Ng4LoadingSpinnerService) { }


  public expand(index){
    for(var i=0;i<this.employeeDetails.length;i++){
      this.testObject1["show_"+i] = true;
      } 
    this.testObject1["show_"+index]=false;
    }
    
    public shrink(index){
      for(var i=0;i<this.employeeDetails.length;i++){
        this.testObject1["show_"+i] = true;
        } 
      this.testObject1["show_"+index]=true;
    }

  ngOnInit() {
    this.last= new Date(this.date.getTime() - (30 * 24 * 60 * 60 * 1000));
    this.end=new Date(this.date.getTime() + (30 * 24 * 60 * 60 * 1000));
    this.myMoments=[new Date(this.last.getFullYear(),this.last.getMonth(),this.last.getDate()),new Date(this.end.getFullYear(),this.end.getMonth(),this.end.getDate())];
    this.myMoments1=[new Date(this.last.getFullYear(),this.last.getMonth(),this.last.getDate()),new Date(this.end.getFullYear(),this.end.getMonth(),this.end.getDate())];
    this.getLeaveStatusByDate();
    this.getManagerList();
    
  }

  public changeDate(myMoments){
    this.getLeaveStatusByDate();
  }

  public changeDate1(myMoments1){
    this.getLeaveStatusByDate1();
  }

  // public getLeaveRequests(){
  //   if (typeof window !== 'undefined') {
  //     this.appService.HttpGet("../../assets/json/leaveRequest.json").subscribe(
  //     data => {this.pendingList=data;this.listLeaveRequests(data);},
  //     error => {error});

  //   }
  // }


  historySettings = {
 
  columns: {
    reportingManagerName: {
      title: 'Manager Name'
    },
    userName: {
      title: 'User Name'
    },
    leaveTypeName: {
      title: 'Leave Type'
    },
    noOfDays: {
      title: 'No Of Days'
    },
    startDate: {
      title: 'Start Date'
    },
    endDate: {
       title: 'End Date'
    },
    employeeCommentSubmission: {
      title: 'Comments'
    },
     status: {
      title: 'Status'
    },
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

// historyData = [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz"
//   },
//   {
//     id: 2,
//     name: "Ervin Howell",
//     username: "Antonette",
//     email: "Shanna@melissa.tv"
//   },
  
//   // ... list of items
  
//   {
//     id: 11,
//     name: "Nicholas DuBuque",
//     username: "Nicholas.Stanton",
//     email: "Rey.Padberg@rosamond.biz"
//   }
// ];

public getManagerList() {
  this.share.currentuserName.subscribe(message=>this.username=message);
  if (typeof window !== 'undefined') {
    this.appService.HttpGet(GlobalVariable.getManagerList).subscribe(
      data => {
        for(var i=0;i<data.result.length;i++){
          if(data.result[i].employee.emailId==this.username){
            this.share.changeemployeemanagerId(data.result[i].id);
          }
        }
        this.getHolidayStatus();
        this.getEmployeeDetailsList();
        this.getLeaveStatusByDate();
      },
      error => { error });

  }
}

public getLeaveStatusByDate() {
  let startDate=new Date(this.myMoments[0]);
  let endDate=new Date(this.myMoments[1]);
  this.share.currentemployeemanagerId.subscribe(message=>this.managerid=message);
 // console.log("managerId",this.managerid);
  if (typeof window !== 'undefined') {
    let reqData = {
      "endDate": endDate.getTime(),
      "managerId": this.managerid,
      "startDate": startDate.getTime()

    }
    this.appService.HttpPost(GlobalVariable.getLeaveStatusByDate, reqData).then(
      data => {
        // this.pendingList=[];
        // for(var i=0;i<data.result.length;i++){
        //   if(data.result[i].status=='pending'){
        //     this.pendingList.push(data.result[i]);
        //   }
        // }

        this.historyData = [];
        // console.log("this.historyData",this.historyData);
        for(var i=0;i< data.result.length;i++){
          if(data.result[i].status !== 'pending'){
            this.historyData.push(data.result[i]);
          }
        }
        // for(var i=0;i<data.result.length;i++){
      
            // this.historyData = data.result;
        // }
      },
      error => { error; });

  }
}

public getLeaveStatusByDate1() {
 
  let startDate=new Date(this.myMoments1[0]);
  let endDate=new Date(this.myMoments1[1]);
  this.share.currentemployeemanagerId.subscribe(message=>this.managerid=message);
  if (typeof window !== 'undefined') {
    let reqData = {
      "endDate": endDate.getTime(),
      // "managerId": this.managerid,
      "startDate": startDate.getTime()

    }
    this.appService.HttpPost(GlobalVariable.getEmployeeDetails, reqData).then(
      data => {
        // console.log("all",data.result);
        // this.pendingList=[];
        // for(var i=0;i<data.result.length;i++){
        //   if(data.result[i].status=='pending'){
        //     this.pendingList.push(data.result[i]);
        //   }
        // }

        // this.historyData = [];
        // console.log("this.historyData",this.historyData);
        // for(var i=0;i< data.result.length;i++){
        //   if(data.result[i].status !== 'pending'){
        //     this.historyData.push(data.result[i]);
        //   }
        // }
        // for(var i=0;i<data.result.length;i++){
      
            // this.historyData = data.result;
        // }
      },
      error => { error; });

  }
}


  public getHolidayStatus() {
    this.share.currentemployeemanagerId.subscribe(message=>this.managerid=message);
    if (typeof window !== 'undefined') {
      let reqData = {
        "managerId": this.managerid

      }
      this.appService.HttpPost(GlobalVariable.getLeaveStatus, reqData).then(
        data => {
          this.pendingList=[];
          for(var i=0;i<data.result.length;i++){
            if(data.result[i].status=='pending'){
              this.pendingList.push(data.result[i]);
            }
          }
          

          // this.historyData = [];
          // for(i=0;i< data.result.length;i++){
          //   if(data.result[i].status != 'pending'){
          //     this.historyData.push(data.result[i]);
          //   }
          // }
          // this.historyData = data.result;
        },
        error => { error; });

    }
  }

  public approveLeave() {
    let reqData = {
      "comment": this.comments,
      "leaveApplicationId": this.applicationId,
      "reportingManagerId": this.managerId
    }
    this.approveButton.nativeElement.disabled = true;
    this.spinnerService.show();
    this.appService.HttpPost(GlobalVariable.approveLeave, reqData).then(
      data => {
        this.closeModal1();
        if(data.success==true){
          this.spinnerService.hide();
          this.toastr.success(data.statusMessage);
      }
      else if(data.success==false){
        this.toastr.error(data.statusMessage)
        this.spinnerService.hide();
      }
        this.getHolidayStatus();
      },
      error => { error; });
  }
  ApproveLeave(applicationId,managerId,i) {
    i=applicationId;
    this.applicationId = applicationId.leaveApplicationId;
    this.managerId = managerId;
  }

  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
}

public myFilter1 = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
}



exportToExcelsheet(event) {
    
    // let excelData1 = JSON.stringify(this.employeeDetails)
    // let excelData = JSON.parse(excelData1);
    // // this.excelData=JSON.parse(this.employeeDetails);
    // this.excelService.exportAsExcelFile(excelData, 'Employee Details');
     this.JSONToCSVConvertor(this.employeeExport, "Employee Report", true);
    } 

    public JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += arrData[i][index] + ',';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link:any = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
    link.download = fileName + ".xlsx";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



  public rejectLeave() {
    let reqData = {
      "comment": this.comments1,
      "leaveApplicationId": this.applicationId1,
      "reportingManagerId": this.managerId1
    }
      this.rejectButton.nativeElement.disabled = true;
    this.spinnerService.show();
    this.appService.HttpPost(GlobalVariable.rejectLeave, reqData).then(
      data => {
        this.closeModal();
        if(data.success==true){
          this.spinnerService.hide();
          this.toastr.success(data.statusMessage);
      }
      else if(data.success==false){
        this.spinnerService.hide();
        this.toastr.error(data.statusMessage)
      }
      this.getHolidayStatus();
      },
      error => { error; });
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
    this.comments1='';
  }
  private closeModal1(): void {
    this.closeBtn1.nativeElement.click();
    this.comments='';
  }
  RejectLeave(applicationId,managerId,i) {
    i=applicationId;
    this.applicationId1 = applicationId.leaveApplicationId;
    this.managerId1 = managerId;
  }
  public getEmployeeDetailsList() {
    let reportingManagerId;
    this.share.currentemployeemanagerId.subscribe(message=>reportingManagerId=message);
    let reqData={
      "reportingManagerId": reportingManagerId
    }

    if (typeof window !== 'undefined') {
      this.appService.HttpPost(GlobalVariable.getemployeelistByManager,reqData).then(
        data => {
          
  this.employeeDetails=data.result;
  this.employeeExport = [];
    let exportArrayObject = []; 
    this.employeeExport = exportArrayObject;


          this.employeeDetails.forEach((element,index) => {
            let newLop = 0;
            element.leaveDetailsResponses.forEach((elm,i) => {
              // this.employeeDetails[index].leaveDetailsResponses[i]["available"]=(elm.available < 0) ? 0 : elm.available;
              newLop = (elm.available < 0) ? (newLop + (-1*(elm.available))) : newLop;
            });
            this.employeeDetails[index]["LOPVal"]=newLop;
           
          });

  this.employeeDetails.forEach(element => {
              let newObj = {};
              // exportArrayObject.push({"Employee_Id":element.employeeId})
              newObj["Employee_Id"]=element.employeeId;
              newObj["Badge_Number"]=element.badgeNumber;
              newObj["Employee_Name"]= element.employeeName;
              newObj["Role_Name"] = element.roleName;
              let lopcount = 0;
              element.leaveDetailsResponses.forEach(elm => {
                let obj = elm.leaveType.replace(/\s/g,"_")
                Object.keys(elm).forEach(_xObject=>{
                  if(_xObject !== 'leaveTypeId' && _xObject !== 'leaveType'){
                    let keyObj = obj+"_"+_xObject;
                    newObj[keyObj] = (elm[_xObject] < 0) ? 0 : elm[_xObject];
                    // newObj[keyObj] = elm[_xObject];
                  }                  
                });
                if(elm["available"] < 0 && elm["available"] != null){
                  lopcount = lopcount+(-1*(elm["available"]));
                }
                newObj["LOP"] = lopcount;
              });
              exportArrayObject.push(newObj);
            });
            // console.log(exportArrayObject);


     this.employeeSubdetails = [];
          this.employeeDetails[0].leaveDetailsResponses.forEach(element => {
            this.employeeSubdetails.push(element.leaveType)
          });


        // for(i=0;i< this.employeeDetails[0].leaveDetailsResponses.length;i++){
        // //    console.log("header",this.employeeDetails[i].leaveDetailsResponses);
        //     this.employeeSubdetails.push(leaveDetailsResponses);
        // }
          
          for(var i=0;i<this.employeeDetails.length;i++){
            this.testObject1["show_"+i] = true;
            } 

        },
        error => {
          this.toastr.error('error');
        });

    }




}








}
