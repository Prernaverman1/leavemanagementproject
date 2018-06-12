
import { TabsetComponent } from 'ngx-bootstrap';
import { Component, OnInit,Input,Output,EventEmitter, ViewContainerRef, ViewChild,HostListener,ElementRef  } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PlatformLocation } from '@angular/common';
import { AppService } from './app.service';
import * as GlobalVariable from './app.globals';
import { SharedService } from './shared.service';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: any;
  userAvailable: Boolean = false;
  feedbackCm = ''
  fbObj={}
  user: any;
  managerid: any;
  managername: any;
  employeeList: any;
  leavebalance: any;
  employeeid: any;
  employeeDetails: any;
  rolename: any='';
  userId: any='';
  userName: any='';
  token='';
  name:string='';
  password:string='';
  pathname:any;
   @ViewChild('closeBtn1') closeBtn1:ElementRef;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public toastr: ToastsManager, vRef: ViewContainerRef,
    private appService:AppService,private share:SharedService,overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,location: PlatformLocation) {
      location.onPopState(() => {
        // this.pathname=window.location.pathname;
        //  this.router.navigate(this.pathname);
      });
     
      this.toastr.setRootViewContainerRef(vRef);
  }
  //  @ViewChild('staticTabs') staticTabs: TabsetComponent;
 
  // selectTab(tab_id: number) {
  //   this.staticTabs.tabs[tab_id].active = true;
  // }
 
  // disableEnable() {
  //   this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  // }

  // public getbyoneemployeedetail(){
  //   this.share.currentemployeeid.subscribe(message=>this.employeeid=message);
  //   let reqparam={
  //     "employeeId": this.employeeid
  //   }
  //   this.appService.HttpPost(GlobalVariable.getoneemployee, reqparam).then(
  //     data => {
  //   this.getData(data);
  //     },
  //     error => { error; });
  // }

  // public getEmployeeList() {
  //   this.share.currentuserName.subscribe(message=>this.userName=message);
  //   if (typeof window !== 'undefined') {
  //     this.appService.HttpGet(GlobalVariable.getEmployeeList).subscribe(
  //       data => {
  //         this.employeeList = data.result;
  //         for(var i=0;i<this.employeeList;i++){
  //           if(this.employeeList[i].username==this.userName){
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

  // public getData(data){
  //   this.leavebalance=data.result[0].leaveBalanceResponses;
  //   this.share.changeleavebalance(this.leavebalance);
  // }

//   public getEmployeeDetailsList() {
//     if (typeof window !== 'undefined') {
//       this.appService.HttpGet(GlobalVariable.getEmployeeDetails).subscribe(
//         data => {
          
//         this.employeeDetails=data.result;
//         for(var i=0;i<this.employeeDetails.length;i++){
//           if(this.userId==this.employeeDetails[i].userId){
//             this.employeeid=this.employeeDetails[i].employeeId;
//             this.share.changeemployeeid(this.employeeid);
//             this.getbyoneemployeedetail();
//             this.getEmployeeList();
//           }
//           } 

//         },
//         error => {
//           this.toastr.error('error');
//         });

//     }




// }

  public ngOnInit() {
    
   // this.share.currenttoken.subscribe(message=>this.token=message);
  //  localStorage.removeItem('currentUser');
  //  this.user ='';
  //  this.userName = this.user.userName;

    if(localStorage.getItem('currentUser') != null){
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.userAvailable = true;
       this.userName = this.user.userName;
     //  this.username = this.user.userName;
       this.userId = this.user.userId;
       this.rolename = this.user.rolename;
         this.share.changeuserId(this.userId);
          this.share.changerolename(this.rolename);
            this.share.changeuserName(this.userName);
     
       
       
    }
   
    
  
    
  }

 
  
  public logout(){
    localStorage.removeItem('currentUser');
    this.userAvailable = false;
    this.router.navigateByUrl('/');
     this.clearData();
    // document.getElementById("logout").style.display="none";
    // document.getElementById("login").style.display="block";
    // document.getElementById("login1").style.display="block";
  
  }

  public forgotPassword(name){
    let usermail = name;
  
    if ( usermail == "") {
      this.toastr.error("Please enter all the fields");
    }
    else {
      
      let reqdata = {
       "username": usermail
      }

      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.changePasswordMail, reqdata).then(
          data => {
            if (data.success == true) {
              this.toastr.success(data.statusMessage);
            }
            else if (data.success == false) {
              this.toastr.error(data.statusMessage)
            }
            // this.getPolicyList();
            // this.getLeaveList();
            // this.clearData();

          },
          error => {
            this.toastr.error('error');
            // this.clearData();
          });

      }
    }


  }

  public clearData() {
    //  this.name = '';
     this.password = '';
  }

  public login() {
   
    if (this.name == "" || this.password == '') {
      this.toastr.error("Please enter all the fields");
    }
    else {
      let reqdata =  {
        "password": this.password,
        "username": this.name
      }
      if (typeof window !== 'undefined') {
        this.appService.HttpPost(GlobalVariable.login, reqdata).then(
          data => {
            if (data.success == true) {
              this.userAvailable = true;
              this.toastr.success(data.statusMessage);
              this.rolename =data.role[0].authority.substring(data.role[0].authority.indexOf("_")+1).toLowerCase();
              // this.rolename=this.rolename.slice(data.role[0].authority.indexOf("_"),1).toLowerCase();
              this.token=data.token;
              this.userId=data.userid;
              this.userName=data.username;
              this.share.changetoken(this.token);
              this.share.changeuserId(this.userId);
              this.share.changeuserName(this.userName);
              this.share.changerolename(this.rolename);
              // this.getEmployeeDetailsList();
             localStorage.setItem('currentUser', JSON.stringify({userName:this.userName, token: this.token, userId:this.userId,rolename:this.rolename }));
            
              this.user = JSON.parse(localStorage.getItem('currentUser'));
              this.router.navigateByUrl("/leaveApplication");
              // document.getElementById("login").style.display="none";
              //  document.getElementById("login1").style.display= "none";
              // document.getElementById("logout").style.display="block";
             
             
              
             
             
            }
            else if (data.status == 'failure') {
              this.toastr.error("Invalid Username or Password",data.statusMessage)
            }

          },
          error => {
            this.postFailure(error);
              this.toastr.error("Login Failed");
          });

      }

      
    }

    




  }
  title = 'app';

  public postFailure(error){
    let failure=error.json()
    this.toastr.error(failure.error.debugMessage);
  }

  public closeModalFB(): void {
    this.feedbackCm = '';
    this.closeBtn1.nativeElement.click();
  }
  feedback(){
    this.fbObj["emailId"] =this.userName
    this.fbObj["feedback"] =this.feedbackCm
    if( this.feedbackCm == ''){
      this.toastr.info("Please Enter the Comment");
    }else{
    
    this.appService.HttpPost(GlobalVariable.feedBack, this.fbObj).then(
      data => {
        this.feedbackCm = '';
        if (data.success == true) {
          this.toastr.success(data.statusMessage);
        }
        else if (data.success == false) {
          this.toastr.error(data.statusMessage);
        }
      

      },
      error => {
        this.feedbackCm = '';
        this.toastr.error('error');
      });
    }
       this.closeModalFB();
  }

}
