import { Component, OnInit } from '@angular/core';
import { AuthenticationApiServiceService } from 'src/app/core-services/authentication-api-service.service';
import { Router } from '@angular/router';
import { EnumSuccess } from '../../../../src/hardcoded-Strings/success.enum';
import { EnumFailure, EnumFailureLoginApi } from '../../../../src/hardcoded-Strings/failure.enum';
import { ToasterService } from 'src/app/core-services/toaster.service';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginField } from 'src/app/models/login-model.moel';
import { ToasterField } from 'src/app/models/toaster-model.model';
import { AuthService } from 'src/app/auth.service';
import { ShowingHeaderServiceService } from 'src/app/core-services/showing-header-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationApiServiceService,
    private route: Router,
    public toasterService: ToasterService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private showingHeader : ShowingHeaderServiceService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  failure_Toaster(failureObj) {
    this.toasterService.error(failureObj.title, failureObj.body);
  }

  loginApiCall(loginDetails) {
    this.authenticationService.get_Login(loginDetails).subscribe((res: any) => {
      console.log(res);
      if (res.status === EnumSuccess.statusSuccess) {
        const userId = btoa(res._id);
        this.authService.setAuthDetails(userId);
        //this.showingHeader.showingHeader.next(true);
        this.route.navigate(['/home'], { replaceUrl: true });
      }
    }, err => {
      const apiError = err.error;
      this.apiVallErrorhandler(apiError);
    })
  }

  apiVallErrorhandler(error) {
    if (error.status === EnumFailure.statusFailed) {
      let err;
      switch (error.message) {
        case 'Invalid Password':
          err = EnumFailureLoginApi.InvalidPassword;
          break;
        case 'Bad Request':
          err = EnumFailureLoginApi.BadRequest;
          break;
        case 'User Not Found':
          err = EnumFailureLoginApi.UserNotFound;
          break;
      }
      const toasterMsg = {
        title: "Error",
        body: err
      }
      this.failure_Toaster(toasterMsg);
    }
  }


  on_Login() {
    // now this method can be used for custom manipulatoion in any of the form feild like validation  or any thinhf before makign api call
    let loginDetails = this.loginForm.value;
    // like if u want to trim email before sending to api
    // loginDetails.email = loginDetails.email.trim();
    this.loginApiCall(loginDetails);

  }

}
