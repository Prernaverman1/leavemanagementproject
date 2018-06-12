import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { RouterModule, Routes } from '@angular/router';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedService } from './shared.service';
import { ToastModule,ToastOptions } from 'ng2-toastr/ng2-toastr';
import { CustomOption } from './custom-option';
import { routes } from './app.router';
import { FormsModule,ReactiveFormsModule,AbstractControl } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveComponent } from './leave/leave.component';
import {DataTableModule} from "angular2-datatable";
import {AuthGuard} from './auth-guard.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExcelService } from './excel.service'; 
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    
    AppComponent,
    ConfigurationComponent,
    LeaveApplicationComponent,
    LeaveComponent,
    LeaveReportComponent,
    LoginComponent
    
  ],
  imports: [
    AccordionModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    DataTableModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    BrowserModule,
    BrowserAnimationsModule,
    routes,
    ToastModule.forRoot(),
    HttpModule,
     ReactiveFormsModule,
    FormsModule,
    Ng2SmartTableModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    AngularMultiSelectModule,
    OwlDateTimeModule,
     OwlNativeDateTimeModule,
     Ng2SearchPipeModule
  ],
 
  providers: [AuthGuard,ExcelService,SharedService,AppService,{provide: ToastOptions, useClass: CustomOption}],
  bootstrap: [AppComponent]
})

export class AppModule { }
