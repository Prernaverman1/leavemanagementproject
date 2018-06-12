import { ModuleWithProviders,NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ConfigurationComponent} from './configuration/configuration.component';
import { LeaveApplicationComponent } from './leave-application/leave-application.component';
import { LeaveComponent } from './leave/leave.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import {AuthGuard} from './auth-guard.service';
import { LoginComponent } from './login/login.component';
 

export const router: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full', data: { title: 'LMS' } },
   //  { path: 'login', component: LoginComponent,canActivate: [AuthGuard], data: { title: 'LMS' }},
     { path: 'comp', component: AppComponent,canActivate: [AuthGuard], data: { title: 'LMS' }},
    { path: 'configuration', component: ConfigurationComponent,canActivate: [AuthGuard], data: { title: 'LMS' }},
    { path: 'leaveReport', component: LeaveReportComponent,canActivate: [AuthGuard], data: { title: 'LMS' }},
    { path: 'leaveApplication', component: LeaveApplicationComponent,canActivate: [AuthGuard], data: { title: 'LMS' }},
    // { path: 'release', component: ReleaseComponent, data: { title: 'GSD-Release'} },
     { path: 'leave', component: LeaveComponent, canActivate: [AuthGuard], data: { title: 'LMS'} },
    // { path: 'workbench', component: WorkbenchComponent, data: { title: 'GSD-Workbench'} },
    // { path: 'dashboard', component: DashboardComponent, data: { title: 'GSD-Dashboard'} }
];

@NgModule({
    imports: [RouterModule.forRoot(router,{useHash:true})],
    exports: [RouterModule]
  })

  export class AppRoutingModule{
      
  }

export const routes: ModuleWithProviders = RouterModule.forRoot(router,{useHash:true});