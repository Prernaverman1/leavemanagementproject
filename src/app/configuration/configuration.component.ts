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
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  employeeUserName: any;
  // ascending: boolean;
  // order: string;
  end: Date;
  last: Date;
  employeeSubdetails: any;
  excelData: any;
  employeeDetails1: any;
  filter:any;
  managerid: any;
  managername: any;
  testObject1: any={};
  employeeDetails: any;
  employeeLeaveDetails: any;
  managerdata: any;
  @ViewChild('closeBtn') closeBtn: ElementRef;
   @ViewChild('closeBtn1') closeBtn1: ElementRef;  
    @ViewChild('closeBtn2') closeBtn2: ElementRef;
     @ViewChild('closeBtn3') closeBtn3: ElementRef;  
    @ViewChild('holidayButton') holidayButton: ElementRef;
    @ViewChild('leaveButton') leaveButton: ElementRef;
      @ViewChild('roleButton') roleButton: ElementRef;
       @ViewChild('policyButton') policyButton: ElementRef;

       date:any = new Date();

       public myMoments1 = [new Date(2018, 1, 12), new Date(2018, 3, 21)];

  employeeId: any;
  roleId: any;
  employeeName: any;
  Event1: any;
  Event: any;
  event2: any;
  event1: any;
  event: any;
  username: any = "";
  policyEnabled: boolean = false;
  policyStatus: string;
  policyList: any;
  value: any;
  // employeeDropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  dropdownSettings1: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  managerDropdownSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  roleSettings: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  selectedItems1: { "id": number; "itemName": string; }[];
  dropdownList1: { "id": number; "itemName": string; }[] =  [];
  managerDropdownList: { "id": number; "itemName": string; }[] = [];
  reqdata: any = {};
  leaveVal: string = "";
  yearVal: string = "";
  nameVal: string = "";
  dropdownSettings2: { singleSelection: boolean; text: string; selectAllText: string; unSelectAllText: string; enableSearchFilter: boolean; classes: string; };
  roleSelected: { "id": number; "itemName": string; }[];
  managerSelected: { "id": number; "itemName": string; }[];
  roleDropdown: { "id": number; "itemName": string; }[] = [];
  reqData: any;
  leaveForm: FormGroup;
  roleForm: FormGroup;
  holidayForm: FormGroup;
  post: any;
  post1: any;
  name: string = "";
  holiday: any;
  myValues: boolean;
  // policyList: any;
  policyData: any;
  checkVal: boolean = false;
  timeLine: String = "Monthly";
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  abcd: any = [];
  first: any;
  leaveEnabled: any;
  managerId: any = 1;

  pendingList: any;
  employeeList: any;
  managerList: any;

  reportingManagerEmployeeId: any;
  exportEmployee: any;
  changepassword: string = "";




  // configure role //

  // employeeSelectedItems: { "id": number; "itemName": string; }[];
  //   employeeDropdownList: { "id": number; "itemName": string; }[];

  //     roleDropdownList = []; 
  //     roleSelectedItems = [];
  //     roleDropdownSettings = {};



  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  public myFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }
  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
  constructor(private share:SharedService,private excelService: ExcelService,public modal: Modal, private fb: FormBuilder, private router: Router, private appService: AppService, public toastr: ToastsManager,private spinnerService: Ng4LoadingSpinnerService) {
    this.leaveForm = fb.group({
      'name': [name, Validators.required],
      'myValues': [false]
    });
    this.roleForm = fb.group({
      'name': [name, Validators.required],
      'myValues': [false]
    });
    this.holidayForm = fb.group({
      'holiday': '',
      'first': '',
      'location': [location, Validators.required],
      'myValues': [false]
    });
  }





  addLeave(post) {
    this.event2 = post;
     this.leaveButton.nativeElement.disabled = true;
    if (this.username == '' || post.name == '') {
      // const dialogRef = this.modal.alert()
      //   .size("sm")
      //   .showClose(true)
      //   .title("Add Leave")
      //   .body(`
      //   <h5 class="text-center">Please make sure that all values are entered</h5>`)
      //   .open();
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "createdBy": this.username,
        "name": post.name
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.addLeave, reqData).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.getLeaveList();
            this.clearData();
          },
          error => { this.toastr.error("error"); this.clearData(); });

      }
    }
  }
  addRole(post) {
    this.Event1 = post;
    this.roleButton.nativeElement.disabled = true;
    if (this.username == '' || post.name == '') {
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "createdBy": this.username,
        "roleType": post.name
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.addRole, reqData).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.getRoleList();
            this.clearData();
          },
          error => { error; this.clearData(); });

      }
    }
  }


  addHoliday(post) {
    debugger;
    this.Event = post
    this.holidayButton.nativeElement.disabled = true;
    if (this.username == '' || post.holiday == '' || post.first == undefined) {
      this.toastr.error("Please make sure that all values are entered")
    }
    
    else {
       
      let reqData = {
        "createdBy": this.username,
        "date": post.first,
        "name": post.holiday
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.addHoliday, reqData).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.getHolidayList();
            this.clearData();
          },
          error => { error; this.clearData(); });

      }
    }
  }

historySettings = {
  mode: 'inline',
  columns: {
    id: {
      title: 'ID'
    },
    name: {
      title: 'Full Name'
    },
    username: {
      title: 'User Name'
    },
    email: {
      title: 'Email'
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
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv"
  },
  
  // ... list of items
  
  {
    id: 11,
    name: "Nicholas DuBuque",
    username: "Nicholas.Stanton",
    email: "Rey.Padberg@rosamond.biz"
  }
];


  settingsPolicy = {
    mode: 'inline',
    edit: {
      confirmSave: true,
    },
    columns: {
      policyYear: {
        title: 'Policy Year'
      },
      policyName: {
        title: 'Policy Name'
      },
      leavePolicyType: {
        title: 'Leave Policy Type'
      }
      // totalNoOfDays: {
      //   title: 'Total No Of Days'
      // },
      // leavetypeName: {
      //   title: 'Leave Type Name'
      // },
      // carryForwardAllowed: {
      //   title: 'Carry Forward Allowed'
      // }
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
    }
  };
  DataPolicy = [
    {
      "policyYear": "2018",
      "ploicyName": "new policy -001-2018",
      "roleName": "employee",
      "isChecked": "Y",
      // "createdDate":1519217542,
      // "modifiedDate":1519217542,
      // "createdBy":"name1",
      // "modifiedBy":"name2"
    },
    {
      "policyYear": "2017",
      "ploicyName": "new policy -001-2018",
      "roleName": "employee",
      "isChecked": "N",
      // "createdDate":1519217542,
      // "modifiedDate":1519217542,
      // "createdBy":"name1",
      // "modifiedBy":"name2"
    }
  ];
  onEditingPolicy(value) {
    this.policyList = value.newData;
  }

  ngOnInit() {
     this.last= new Date(this.date.getTime() - (30 * 24 * 60 * 60 * 1000));
    this.end=new Date(this.date.getTime() + (30 * 24 * 60 * 60 * 1000));
    this.myMoments1=[new Date(this.last.getFullYear(),this.last.getMonth(),this.last.getDate()),new Date(this.end.getFullYear(),this.end.getMonth(),this.end.getDate())];
     this.getLeaveStatusByDate1();
     this.getEmployeeDetailsList();
    this.getPolicyList();
    this.getRoleList();
    this.getLeaveList();
    this.getHolidayList();
    // this.getEmployeeList();
    this.getManagerList();
    this.share.currentuserName.subscribe(message=>this.username=message);

    //     this.employeeDropdownList = [
    //                               {"id":1,"itemName":"India"},
    //                               {"id":2,"itemName":"Singapore"},
    //                               {"id":3,"itemName":"Australia"},
    //                               {"id":4,"itemName":"Canada"},
    //                               {"id":5,"itemName":"South Korea"},
    //                               {"id":6,"itemName":"Germany"},
    //                               {"id":7,"itemName":"France"},
    //                               {"id":8,"itemName":"Russia"},
    //                               {"id":9,"itemName":"Italy"},
    //                               {"id":10,"itemName":"Sweden"}
    //                             ];
    // this.employeeSelectedItems = [
    //                                 // {"id":2,"itemName":"Singapore"}

    //                             ];
    //         this.employeeDropdownSettings = { 
    //                                   singleSelection: false, 
    //                                   text:"Select Countries",
    //                                   selectAllText:'Select All',
    //                                   unSelectAllText:'UnSelect All',
    //                                   enableSearchFilter: true,
    //                                   classes:"myclass custom-class"
    //                                 }; 

    //                                 this.roleDropdownList = [
    //                               {"id":1,"itemName":"India"},
    //                               {"id":2,"itemName":"Singapore"},
    //                               {"id":3,"itemName":"Australia"},
    //                               {"id":4,"itemName":"Canada"},
    //                               {"id":5,"itemName":"South Korea"},
    //                               {"id":6,"itemName":"Germany"},
    //                               {"id":7,"itemName":"France"},
    //                               {"id":8,"itemName":"Russia"},
    //                               {"id":9,"itemName":"Italy"},
    //                               {"id":10,"itemName":"Sweden"}
    //                             ];
    // this.roleSelectedItems = [
    //                                 {"id":2,"itemName":"Singapore"},
    //                                 {"id":3,"itemName":"Australia"},
    //                                 {"id":4,"itemName":"Canada"},
    //                                 {"id":5,"itemName":"South Korea"}
    //                             ];
    //         this.roleDropdownSettings = { 
    //                                   singleSelection: true, 
    //                                   text:"Select Countries",
    //                                   selectAllText:'Select All',
    //                                   unSelectAllText:'UnSelect All',
    //                                   enableSearchFilter: true,
    //                                   classes:"myclass custom-class"
    //                                 }; 


    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Role",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.selectedItems1 = [];
    this.managerDropdownSettings = {
      singleSelection: true,
      text: "Select Manager",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };

    this.dropdownSettings1 = {
      singleSelection: false,
      text: "Select Leave Type",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.dropdownSettings2 = {
      singleSelection: false,
      text: "Select Leave Type",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
    this.roleSettings = {
      singleSelection: true,
      text: "Select Leave Type",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: "myclass custom-class"
    };
  }


 

  onItemSelect(item: any) {
  }
  OnItemDeSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  onDeSelectAll(items: any) {
  }
  onItemSelect1(item: any) {
    
    for (var i = 0; i < this.selectedItems1.length; i++) {
      this.selectedItems1[i]["carryForwardAllowed"] = false;
      this.selectedItems1[i]["totalNoOfDays"] = '';
      this.selectedItems1[i]["name"] = this.selectedItems1[i].itemName;

    }
  }
  onManagerSelect(item: any) {
    for (var i = 0; i < this.selectedItems1.length; i++) {
      this.selectedItems1[i]["carryForwardAllowed"] = false;
      this.selectedItems1[i]["totalNoOfDays"] = '';
      this.selectedItems1[i]["name"] = this.selectedItems1[i].itemName;

    }
  }
  settings = {
    mode: 'multi',
    edit: {
      confirmSave: true,
    },
    columns: {
      name: {
        title: 'Name'
      },
      // id: {
      //   title: 'Leave Type Id'
      // },
      enabled: {
        title: 'Enabled',
        type: 'html',
        valuePrepareFunction: (value) => { return value === true ? '<span>Y</span' : '<span>N</span' }
      },
      createdDate: {
        title: 'Created Date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
          return formatted;
        }
      },
      modifiedDate: {
        title: 'Modified Date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
          return formatted;
        }
      },
      createdBy: {
        title: 'Created By'
      },
      modifiedBy: {
        title: 'Modified By'
      },
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
    }
  };
  data = [];

  role = {
    mode: 'inline',
    edit: {
      confirmSave: true,
    },
    columns: {
      roleType: {
        title: 'Role Type'
      },
      createdBy: {
        title: 'Created By'
      },
      enabled: {
        title: 'Enabled',
        valuePrepareFunction: (value) => { return value === true ? 'Y' : 'N' }
      }
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
    }
  };
  data1 = [];

  settings2 = {
    mode: 'inline',
    edit: {
      confirmSave: true,
    },
    columns: {
      // id: {
      //   title: 'Id'
      // },
      name: {
        title: 'Holiday Name'
      },
      date: {
        title: 'Date'
      },
      enabled: {
        title: 'Enabled',
        valuePrepareFunction: (value) => { return value === true ? 'Y' : 'N' }
      },
      createdBy: {
        title: 'Created By'
      },
      createdDate: {
        title: 'Created Date',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = new DatePipe('en-EN').transform(raw, 'dd-MM-yyyy');
          return formatted;
        }
      },
      modifiedBy: {
        title: 'Modified By'
      },
      modifiedDate: {
        title: 'Modified Date'
      }
    },
    actions: {
      position: 'right',
      add: false,
      delete: false,
    }
  };
  data2 = [];


  onRoleEdit(event) {
    this.event2 = event;
    if (event.newData.id == '' || this.username == '' || event.newData.roleType == '') {
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "enabled": event.newData.enabled,
        "id": event.newData.roleId,
        "modifiedBy": this.username,
        "roleType": event.newData.roleType
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.editRole, reqData).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            event.confirm.resolve(event.newData);
            this.getRoleList();
          },
          error => { error });

      }
    }

  };

  onEdit(event) {
    for (var i = 0; i < this.data.length; i++) {
      this.settings.columns.enabled.valuePrepareFunction({
        if(value = 'Y') {
          return '<input type="checkbox" checked>'
        }
      })
      this.settings.columns.enabled.valuePrepareFunction({
        if(value = 'N') {
          return '<input type="checkbox">'
        }
      })
    }
  }

   public changeDate1(myMoments1){
    this.getLeaveStatusByDate1();
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
    this.appService.HttpPost(GlobalVariable.getEmployeeDetails1, reqData).then(
      data => {
        // console.log("all",data.result);
        this.employeeDetails1=[];
            this.exportEmployee = [];
           let exportArrayObject = []; 
           this.exportEmployee = exportArrayObject;
          //  console.log("this.exportEmployee",this.exportEmployee);
          this.employeeLeaveDetails=data.result;
         
          // console.log("export emp",this.employeeDetails);


          this.employeeLeaveDetails.forEach((element,index) => {
            let newLop = 0;
            element.leaveDetailsResponses.forEach((elm,i) => {
              // this.employeeDetails[index].leaveDetailsResponses[i]["available"]=(elm.available < 0) ? 0 : elm.available;
              newLop = (elm.available < 0) ? (newLop + (-1*(elm.available))) : newLop;
            });
            this.employeeLeaveDetails[index]["LOPVal"]=newLop;
           
          });


          this.employeeSubdetails = [];
          this.employeeLeaveDetails[0].leaveDetailsResponses.forEach(element => {
            this.employeeSubdetails.push(element.leaveType)
          });
            
            this.employeeLeaveDetails.forEach(element => {
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
         //  console.log(this.employeeLeaveDetails);


          for(var i=0;i<this.employeeLeaveDetails.length;i++){
            if(this.employeeLeaveDetails[i].emailId!=this.username){
              this.employeeDetails1.push(this.employeeLeaveDetails[i]);
            }
          }
          for(var i=0;i<this.employeeLeaveDetails.length;i++){
            this.testObject1["show_"+i] = true;
            // if(this.employeeList[i].username==this.username){
            //   this.managername=this.employeeList[i].reportingManagerName;
            //   this.managerid=this.employeeList[i].reportingManagerEmployeeId;
            //   this.share.changemangername(this.managername);
            //   this.share.changemanagerid(this.managerid);
            // }
            } 

      },
      error => { error; });

  }
}

  onLeaveEdit(event) {
    this.event1 = event;
    if (event.newData.id == '' || this.username == '' || event.newData.roleType == '') {
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "enabled": event.newData.enabled,
        "id": event.newData.id,
        "modifiedBy": this.username,
        "name": event.newData.name
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.editLeave, reqData).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            event.confirm.resolve(event.newData);
            this.getLeaveList();
          },
          error => { error });

      }
    }

  };


  onHolidayEdit(event) {
    this.event = event;
    if (event.newData.id == '' || this.username == '' || event.newData.roleType == '') {
      this.toastr.error("Please make sure that all values are entered")
    }
    else {
      let reqData = {
        "enabled": event.newData.enabled,
        "id": event.newData.id,
        "modifiedBy": this.username,
        "name": event.newData.name,
        "date": event.newData.date
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.editHoliday, reqData).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            event.confirm.resolve(event.newData);
            this.getHolidayList();
          },
          error => { error });

      }
    }

  };


  public myFilter1 = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
}





  onEditConfirm2(event) {


    this.reqData = event.newData;

  };

  OnItemDeSelect1(item: any) {
    for (var i = 0; i < this.selectedItems1.length; i++) {
      this.selectedItems1[i]["carryForwardAllowed"] = false;
      this.selectedItems1[i]["totalNoOfDays"] = '';
      this.selectedItems1[i]["name"] = this.selectedItems1[i].itemName;

    }
  };
  OnManagerDeSelect(item: any) {
    for (var i = 0; i < this.selectedItems1.length; i++) {
      this.selectedItems1[i]["carryForwardAllowed"] = false;
      this.selectedItems1[i]["totalNoOfDays"] = '';
      this.selectedItems1[i]["name"] = this.selectedItems1[i].itemName;

    }
  };
  onManagerSelectAll(items: any) {
    for (var i = 0; i < this.selectedItems1.length; i++) {
      this.selectedItems1[i]["carryForwardAllowed"] = false;
      this.selectedItems1[i]["totalNoOfDays"] = '';
      this.selectedItems1[i]["name"] = this.selectedItems1[i].itemName;
    };
  }

  public checkboxChange(value, index) {



    this.selectedItems1[index]["carryForwardAllowed"] = !this.selectedItems1[index]["carryForwardAllowed"];
  }


  exportToExcel(event) {
    
    // let excelData1 = JSON.stringify(this.employeeDetails)
    // let excelData = JSON.parse(excelData1);
    // // this.excelData=JSON.parse(this.employeeDetails);
    // this.excelService.exportAsExcelFile(excelData, 'Employee Details');
     this.JSONToCSVConvertor(this.exportEmployee, "Employee Report", true);
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




  public getRoleData(employeeName, employeeId, reportingManagerEmployeeId, reportingManagerName, roleName, roleId, username) {

    this.employeeName = employeeName;
    this.roleId = roleId;
    this.employeeId = employeeId;
    this.reportingManagerEmployeeId = reportingManagerEmployeeId;
    this.employeeUserName = username;
    this.roleSelected = [
      { "id": roleId, "itemName": roleName }

    ];
    this.managerDropdown();
    for(var i=0;i<this.managerDropdownList.length;i++){
      if(employeeId==this.managerDropdownList[i].id ){
        this.managerDropdownList.splice(i,1);
        // for(var i=0;i<this.managerSelected.length;i++){
        // if(employeeId==this.managerDropdownList[i].id){
        //   this.managerSelected.splice(i,1);
        // }
        // }
      }
      this.managerSelected = [
        { "id": reportingManagerEmployeeId, "itemName": reportingManagerName }
  
      ];
    }
  
    // this.roleSelected[0].id=roleId;
    // this.roleSelected[0].itemName=roleName;
  }

  public getRoleList() {
    if (typeof window !== 'undefined') {
      setTimeout(()=>{
        this.appService.HttpGet(GlobalVariable.getRoleList).subscribe(
        data => {
          this.data1 = data.result;
          // this.roleDropdown = [];
          for (var i = 0; i < this.data1.length; i++) {
            this.roleDropdown.push({
              "id": this.data1[i].roleId,
              "itemName": this.data1[i].roleType
            })
          }
          //  for(var i=0;i<this.data1.length;i++){
          //   if(this.data1[i].enabled==true){
          //     this.data1[i].enabled='Y';
          //   }
          //   else if(this.data1[i].enabled==false){
          //       this.data1[i].enabled='N';
          //     }
          //  }
          this.getDropdown();
          // this.roleDropdown.bind(this)
        },
        error => { error });
      },2000)

    }
  }

  public getDropdown() {
    for (var i = 0; i < this.data1.length; i++) {
      this.dropdownList.push({
        "id": this.data1[i].id,
        "itemName": this.data1[i].roleType
      })
    }
  }

  testObject={}; 

  public expand(index){
    for(var i=0;i<this.DataPolicy.length;i++){
      this.testObject["show_"+i] = true;
      } 
    this.testObject["show_"+index]=false;
    for(var i=0;i<this.employeeDetails.length;i++){
      this.testObject1["show_"+i] = true;
      } 
    this.testObject1["show_"+index]=false;
    }
    
    public shrink(index){
      for(var i=0;i<this.DataPolicy.length;i++){
        this.testObject["show_"+i] = true;
        } 
      this.testObject["show_"+index]=true;
      for(var i=0;i<this.employeeDetails.length;i++){
        this.testObject1["show_"+i] = true;
        } 
      this.testObject1["show_"+index]=true;
    }

  public getPolicyList() {
    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getPolicyList).subscribe(
        data => {
          let DataPolicy=[];
          this.DataPolicy = data.result;
          for(var i=0;i<this.DataPolicy.length;i++){
            this.testObject["show_"+i] = true;
            } 

        },
        error => { error });

    }
  }

  public getLeaveList() {
    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getLeaveList).subscribe(
        data => {
          this.data = data.result;
          //  for(var i=0;i<this.data.length;i++){
          //   if(this.data[i].enabled==true){
          //     this.data[i].enabled='Y';
          //   }
          //   else if(this.data[i].enabled==false){
          //       this.data[i].enabled='N';
          //     }
          //  }
          this.getDropdown1();

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

  public getHolidayList() {
    if (typeof window !== 'undefined') {
      this.appService.HttpGet(GlobalVariable.getHolidayList).subscribe(
        data => {
          this.data2 = data.result;
          //  for(var i=0;i<this.data2.length;i++){
          //   if(this.data2[i].enabled==true){
          //     this.data2[i].enabled='Y';
          //   }
          //   else if(this.data2[i].enabled==false){
          //       this.data2[i].enabled='N';
          //     }
          //  }
        },
        error => { error });

    }
  }




  // public getEmployeeList() {
  //   this.share.currentuserName.subscribe(message=>this.username=message);
  //   if (typeof window !== 'undefined') {
  //     this.appService.HttpGet(GlobalVariable.getEmployeeList).subscribe(
  //       data => {
  //         this.employeeList = data.result;
  //         for(var i=0;i<this.employeeList;i++){
  //           if(this.employeeList[i].username==this.username){
  //             this.managername=this.employeeList[i].reportingManagerName;
  //             this.managerid=this.employeeList[i].reportingManagerEmployeeId;
  //             this.share.changemangername(this.managername);
  //             this.share.changemanagerid(this.managerid);
  //           }
  //         }
  //       },
  //       error => { error });

  //   }
  // }

  public getManagerList() {
    if (typeof window !== 'undefined') {
       setTimeout(()=>{
      this.appService.HttpGet(GlobalVariable.getManagerList).subscribe(
        data => {
          this.managerdata = data.result;
           for (var i = 0; i < this.managerdata.length; i++) {
      this.managerDropdownList.push({
        "id": this.managerdata[i].employee.id,
        "itemName": this.managerdata[i].employee.name
      })
    } 
          this.managerDropdown();
        },
        error => { error });
        },2000)
    }
  }

  public managerDropdown() {
   // this.managerDropdownList = [];

    // for (var i = 0; i < this.managerdata.length; i++) {
    //   this.managerDropdownList.push({
    //     "id": this.managerdata[i].employee.id,
    //     "itemName": this.managerdata[i].employee.name
    //   })
    // } 
  }
  public savePolicy() {
      this.policyButton.nativeElement.disabled = true;
    if (this.nameVal == "" || this.yearVal == "") {
      this.toastr.error("Please enter all the fields");
    }
    else {
      for (var i = 0; i < this.selectedItems1.length; i++) {

        delete this.selectedItems1[i]["itemName"];

      }
      let reqdata = {
        "createdBy": this.username,
        "leavePolicyType": this.timeLine.toUpperCase(),
        "name": this.nameVal,
        "policyDetailMasterSaveRequests": this.selectedItems1,
        "year": this.yearVal
      }

      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.addPolicy, reqdata).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.getPolicyList();
            this.getLeaveList();
            this.clearData();

          },
          error => {
            this.toastr.error('error');
            this.clearData();
          });

      }
    }


  }

  public policyDelete(Id){
    let deletePolicyId = Id;

    
      let reqdata = {
         "policyId": deletePolicyId
      }

      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.deletePolicy, reqdata).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.getPolicyList();
          

          },
          error => {
            this.toastr.error('error');
         
          });

      }
   


  }

  public changeRole() {
    if (this.employeeId == "" || this.roleSelected.length == 0) {
      this.toastr.error("Please enter all the fields");
    }
    else {
      let reqdata = {
        "createdBy": this.username,
        "employeeRoleSaveRequests": [
          {
            "employeeId": this.employeeId,
            "roleId": this.roleSelected[0].id
          }
        ]
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.mapRole, reqdata).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.closeModal();
             this.getEmployeeDetailsList();
            //  this.getLeaveStatusByDate1();
            this.getManagerList();

          },
          error => {
            this.toastr.error('error');
          });

      }
    }




  }

  public changeManager() {
    if (this.employeeId == "" || this.roleSelected.length == 0) {
      this.toastr.error("Please enter all the fields");
    }
    else {
      let reqdata = {
        "createdBy": this.username,
        "employeeId": this.employeeId,
        "reportingManagerEmployeeId": this.managerSelected[0].id
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.mapManager, reqdata).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.closeModal();
             this.getEmployeeDetailsList();
            //  this.getLeaveStatusByDate1();

          },
          error => {
            this.toastr.error('error');
          });

      }
    }

  }

  public changePassword() {

    if (this.employeeUserName == "" || this.changepassword == "") {
      this.toastr.error("Please enter all the fields");
    }
    else {
      let reqdata = {
         "password": this.changepassword,
         "username": this.employeeUserName
      }
        
      if (typeof window !== 'undefined') {
         this.spinnerService.show();
        this.appService.HttpPost(GlobalVariable.changePasswordByAdmin, reqdata).then(
          data => {
             this.spinnerService.hide();
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            this.closeModal();
             this.getEmployeeDetailsList();
            //  this.getLeaveStatusByDate1();

          },
          error => {
            this.toastr.error('error');
          });

      }
    }


  }

getLopData(lopCur,avail){
  return lopCur+avail;
}
  public getEmployeeDetailsList() {
      if (typeof window !== 'undefined') {
        this.appService.HttpGet(GlobalVariable.getEmployeeDetails).subscribe(
          data => {
            this.employeeDetails1=[];
          //  console.log("this.employeeDetails1",this.employeeDetails1);
            this.exportEmployee = [];
           let exportArrayObject = []; 
           this.exportEmployee = exportArrayObject;
          //  console.log("this.exportEmployee",this.exportEmployee);
          this.employeeDetails=data.result;
          // console.log("export emp",this.employeeDetails);


          this.employeeDetails.forEach((element,index) => {
            let newLop = 0;
            element.leaveDetailsResponses.forEach((elm,i) => {
              // this.employeeDetails[index].leaveDetailsResponses[i]["available"]=(elm.available < 0) ? 0 : elm.available;
              newLop = (elm.available < 0) ? (newLop + (-1*(elm.available))) : newLop;
            });
            this.employeeDetails[index]["LOPVal"]=newLop;
           
          });


          this.employeeSubdetails = [];
          this.employeeDetails[0].leaveDetailsResponses.forEach(element => {
            this.employeeSubdetails.push(element.leaveType)
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


          for(var i=0;i<this.employeeDetails.length;i++){
            if(this.employeeDetails[i].emailId!=this.username){
              this.employeeDetails1.push(this.employeeDetails[i]);
            }
          }
          for(var i=0;i<this.employeeDetails.length;i++){
            this.testObject1["show_"+i] = true;
            // if(this.employeeList[i].username==this.username){
            //   this.managername=this.employeeList[i].reportingManagerName;
            //   this.managerid=this.employeeList[i].reportingManagerEmployeeId;
            //   this.share.changemangername(this.managername);
            //   this.share.changemanagerid(this.managerid);
            // }
            } 

          },
          error => {
            this.toastr.error('error');
          });

      }




  }

  public enableDisableButton(){
 

  
      let reqdata = {
         "employeeId": this.employeeId
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.disableEmployee, reqdata).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            
             this.getEmployeeDetailsList();
               this.closeModal();
            //  this.getLeaveStatusByDate1();

          },
          error => {
            this.toastr.error('error');
          });

      }
   


  }

  public clearData() {
    this.selectedItems = [];
    this.selectedItems1 = [];
    this.policyEnabled = false;
    this.timeLine = 'Monthly';
    this.nameVal = '';
    this.yearVal = '';
    this.leaveForm.reset();
    this.roleForm.reset();
    this.holidayForm.reset();
  }

  private closeModal(): void {
    this.roleSelected = [];
    this.closeBtn.nativeElement.click();
    this.closeBtn1.nativeElement.click();
    this.closeBtn2.nativeElement.click();
     this.closeBtn3.nativeElement.click();
  }


}
