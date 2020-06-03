import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEndpoints } from '../constants/endPoints';

const service_Url = 'http://53dc57f99e21.ngrok.io/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiServiceService {

 constructor(public http : HttpClient) { }

  get_Login(loginData){
    return this.http.post(`${service_Url}${apiEndpoints.apis.login}`,loginData);
  }

  get_registration(registerData){
    return this.http.post(`${service_Url}${apiEndpoints.apis.registration}`,registerData);
  }

  check_ValidUserName(userName){
    return this.http.post(`${service_Url}${apiEndpoints.apis.userNameVerfy}`,userName);
  }
}
