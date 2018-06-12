import { Component, OnInit,Input,Output,EventEmitter, ViewContainerRef, ViewChild,HostListener,ElementRef  } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PlatformLocation } from '@angular/common';
import { AppService } from '../app.service';
import * as GlobalVariable from '../app.globals';
import { SharedService } from '../shared.service';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
 export class LoginComponent implements OnInit {


 
  constructor(
    ) {
     
  }
 
  public ngOnInit() {
    
  
    
  }

 
  
   title = 'app';

  

  }
 

  





