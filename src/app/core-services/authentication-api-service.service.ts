import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEndpoints } from '../constants/endPoints';

//const service_Url = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiServiceService {

 constructor(public http : HttpClient) { }

  get_Login(loginData){
    return this.http.post(`${apiEndpoints.apiUrl.url}${apiEndpoints.apis.login}`,loginData);
  }

  get_registration(registerData){
    return this.http.post(`${apiEndpoints.apiUrl.url}${apiEndpoints.apis.registration}`,registerData);
  }

  check_ValidUserName(userName){
    return this.http.post(`${apiEndpoints.apiUrl.url}${apiEndpoints.apis.userNameVerfy}`,userName);
  }
}
