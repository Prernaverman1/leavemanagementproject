import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
    private userId=new BehaviorSubject<string>('');
    currentuserId=this.userId.asObservable();

    private userName=new BehaviorSubject<string>('');
    currentuserName=this.userName.asObservable();

    private token=new BehaviorSubject<string>('');
    currenttoken=this.token.asObservable();

    private mangername=new BehaviorSubject<string>('');
    currentmangername=this.mangername.asObservable();

    private rolename=new BehaviorSubject<string>('');
    currentrolename=this.rolename.asObservable();

    private mangerid=new BehaviorSubject<string>('');
    currentmangerid=this.mangerid.asObservable();

    private employeeid=new BehaviorSubject<string>('');
    currentemployeeid=this.employeeid.asObservable();

    private employeemanagerId=new BehaviorSubject<string>('');
    currentemployeemanagerId=this.employeemanagerId.asObservable();

    private leavebalance=new BehaviorSubject<any>([]);
    currentleavebalance=this.leavebalance.asObservable();

    changemanagerid(mangerid:string){
        this.mangerid.next(mangerid);
      }

      changemangername(mangername:string){
        this.mangername.next(mangername);
      }

  changetoken(Token:string){
    this.token.next(Token);
  }

  changeuserId(UserId:string){
    this.userId.next(UserId);
  }
  changeleavebalance(leavebalance:any){
    this.leavebalance.next(leavebalance);
  }

  changeuserName(UserName:string){
    this.userName.next(UserName);
  }

  changerolename(Rolename:string){
    this.rolename.next(Rolename);
  }
  
  changeemployeeid(employeeid:string){
    this.employeeid.next(employeeid);
  }

  changeemployeemanagerId(employeemanagerId:string){
    this.employeemanagerId.next(employeemanagerId);
  }
}
