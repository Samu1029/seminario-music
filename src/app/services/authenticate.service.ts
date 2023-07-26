import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { NULL } from 'sass';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};

  urlServer = "https://musicback.fly.dev";

  constructor(
    private storage: Storage,
    private http: HttpClient) { }

  loginUser(credentials:any){
    return new Promise((accept, reject) => {
      let params = {
        "user": credentials  
      }
      return this.http.post(`${this.urlServer}/login`, params, this.httpHeaders).subscribe(
        (data: any) => {
          if (data.id != null){
            accept(data);
          }else{
            reject(data.errors)
          }
        }
      );
    })
  }

  registerUser(userData:any){
   // userData.password = btoa(userData.password);
   // return this.storage.set("user", userData);
   let params = {
    "user": userData
   }
   return this.http.post(`${this.urlServer}/signup`, params, this.httpHeaders);
   
  }
}
