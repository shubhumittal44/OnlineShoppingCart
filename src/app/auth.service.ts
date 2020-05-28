import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn() {
    return this.checkUserId().toLowerCase() !== null ? true : false;
  }

  checkUserId() {
    //localStorage.setItem('authToken','fail');
    return localStorage.getItem('userId');
  }

  getUserId() {
    let userId = localStorage.getItem('userId');
    return atob(userId);
  }

  setAuthDetails(userId) {
    localStorage.setItem('userId', userId);
  }

  logoutUser(){
    localStorage.clear();
  }
}
