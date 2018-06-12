import { Component, Injectable } from '@angular/core';
import { Http, JsonpModule, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/toPromise';
import * as GlobalVariable from "./app.globals";

@Injectable()
export class AppService {

    constructor(private _http: Http) { }
  
    HttpGet(getAPI: string){
        if (getAPI.indexOf('http') == -1) {
            getAPI =  getAPI;
        }
        
        let headers = new Headers({'Content-Type':'application/json'});
        // headers.append("Access-Control-Allow-Origin","*");
        // headers.append('Access-Control-Allow-Credentials', 'true');
        // let options = new RequestOptions({headers:headers});
        // options.withCredentials = true;
        let optionsArgs:RequestOptionsArgs = {headers:headers};
        let options = new RequestOptions(optionsArgs);
        options.withCredentials = true;
        return this._http.get(getAPI, options).map(res => res.json());							
    }	

    HttpPost(api: string, params: any){
        if (typeof Headers !== 'undefined') {
            // var baseURL = GlobalVariable.API_BASE_URL;
            var url = api;
            let headers = new Headers({'Content-Type':'application/json'});
            // let options = new RequestOptions({headers:headers});
            // options.withCredentials = true;
            let optionsArgs:RequestOptionsArgs = {headers:headers};
            let options = new RequestOptions(optionsArgs);
            options.withCredentials = true;
            return this._http.post(url,params,options)
                .toPromise()
                .then(this.parseData)
                .catch(this.handleError);	
      }
    }

    parseData(res: any) {
        let body = res.json();
        return body || { };
    }	
  
    handleError(error: any) {
        let body = error.json();
        if (error.status == 0) {
            error = undefined;
            alert('Please check your internet connection.');
        }
        return Promise.reject(error);
    }
}
