import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn()
  {
    return this.getToken().toLowerCase() === 'success' ? true : false;
  }

  getToken(){
    //localStorage.setItem('authToken','fail');
    return localStorage.getItem('authToken');
  }
}
