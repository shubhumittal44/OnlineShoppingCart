import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AuthenticationApiServiceService } from 'src/app/core-services/authentication-api-service.service';
import { ToasterService } from 'src/app/core-services/toaster.service';
import { EnumFailureRegisterationApi, EnumFailure, EnumFailureLoginApi } from 'src/hardcoded-Strings/failure.enum';
import { EnumSuccessRegistrationApi, EnumSuccess } from 'src/hardcoded-Strings/success.enum';
import { EnumWarningRegistrationApi } from 'src/hardcoded-Strings/warning.enum';
import { PasswordValidation } from 'src/app/custom-validation/PasswordValidation';
import { RegistrationApiFields } from 'src/app/models/registration-model.model';
import { NoWhiteSpaceValidator } from 'src/app/custom-validation/SpaceValidation';
import { AgeValidator } from 'src/app/custom-validation/AgeValidation';
import { ShowingHeaderServiceService } from 'src/app/core-services/showing-header-service.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // @ViewChild('userName',{static:true}) userNameRef:ElementRef;
  userNameConfirmed = true;
  isUserNameVerified: boolean = false;
  isUserNameVerfyingBtn: boolean = true;
  showSuggestedUserName: boolean = false;
  showEditIcon: boolean = false
  registrationForm: FormGroup;
  count: number = 0;
  suggestUserNameStr: string;
  suggestUserNameArray = [];
  userName: string;
  showEditBtn: boolean = false;
  //registrationData : RegistrationApiFields;
  usernameDisabled: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public authenticateService: AuthenticationApiServiceService, 
    public tosterService: ToasterService,
    private showingHeader : ShowingHeaderServiceService,
    private route : Router,
    private authService : AuthService) { }


  ngOnInit(): void {
    this.initializeForm();
    this.count = 1;
  }

  initializeForm() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]]
    }, {
        validator: [PasswordValidation.MatchPassword, NoWhiteSpaceValidator.spaceValidation, AgeValidator.validateAge]
      })
  }

  successToaster(success) {
    this.tosterService.success(success.title, success.body);
  }

  errorToaster(error) {
    this.tosterService.error(error.title, error.body);
  }

  warningToaster(warning) {
    this.tosterService.warning(warning.title, warning.body);
  }

  getTitle(value) {
    if (value == 0) {
      return EnumWarningRegistrationApi.title //value 0 for warning 
    }
    else if(value == 1) {
      return EnumFailureRegisterationApi.title; // value 1 for error
    }
    else{
      return EnumSuccessRegistrationApi.title; //value 2 for Success
    }
  }

  userNameAuthApiCall(userData) {

    if (userData.userName !== this.suggestUserNameStr) {
      this.suggestUserNameStr = userData.userName;
      if (userData.userName != null) {
        this.userNameVerificationApiCall(userData);
      }
      else {
        const obj = this.getErrorPayload(1, 'enterUserName');
        this.errorToaster(obj);
      }
    }
    else {
      const warningObj = this.getErrorPayload(0, 'sameUserName')
      this.warningToaster(warningObj);
    }
  }

  userNameVerificationApiCall(userData){
    this.authenticateService.check_ValidUserName(userData).subscribe((res: any) => {
      if (res.status == 'success') {
        const successObj = this.getErrorPayload(2, 'userNameVerified')
        this.successToaster(successObj);
        this.isUserNameVerified = true;
        this.isUserNameVerfyingBtn = false;
        //this.showSuggestionBtn = false;
        this.showSuggestedUserName = false;
        //this.userNameRef.nativeElement.disabled =true;
        this.toggleUserNameFeild(false);
        this.showEditBtn = true;
      }
    }, (err: any) => {

      this.verifyUserApiCallErrorHandler(err.error)
    })
  }

  getUserName() {
    return this.registrationForm.get('userName').value;
  }

  verifyUserName() {
    let userData = {
      userName: this.getUserName()
    };
    this.userNameAuthApiCall(userData);
  }


  getErrorPayload(title, body) {
    let errorObj = {
      title: this.getTitle(title),
      body: this.getBody(body)
    }
    return errorObj;
  }


  getBody(key) {
    switch (key) {
      case 'alreadyExist':
        return EnumFailureRegisterationApi.alreadyExist;
      case 'apiFailed':
        return EnumFailureRegisterationApi.apiFailed;
      case 'validationError':
        return EnumFailureRegisterationApi.validationError;
      case 'enterUserName':
        return EnumFailureRegisterationApi.enterUserName;
      case 'userNameVerified' :
        return EnumSuccessRegistrationApi.userNameVerified;
      case 'sameUserName':
        return EnumWarningRegistrationApi.sameUserName;
      case 'registered':
        return EnumSuccessRegistrationApi.registered;
      default:
        break;
    }
  }



  verifyUserApiCallErrorHandler(error) {
    if (error.message.toLowerCase == this.getBody('alreadyExist').toLowerCase) {
      const errorObj = this.getErrorPayload(1, 'alreadyExist')
      this.errorToaster(errorObj);
      if (this.count > 0) {
        if (this.count >= 3) {
          //this.showSuggestionBtn = true;
          this.showUserNameSuggestions(this.registrationForm.value);
          this.suggestUserNameStr = this.getUserName();
        }
        this.count++;
      }
    }
    else {
      const errorObj = this.getErrorPayload(1, 'apiFailed')
      this.errorToaster(errorObj);
    }
  }

  showUserNameSuggestions(formValue) {
    if (formValue.userName != '' && formValue.userName != undefined) {
      this.createUserName(formValue.userName);
    }
    else {
      this.createUserName(this.suggestUserNameStr);
    }
  }

  createUserName(text) {
    let n = 3;
    for (let i = 0; i < n; i++) {
      let object = {
        id: i,
        selected: false,
        suggestedName: `${text.substring(0, i + 2)}${Math.floor(Math.random() * 6 + 121)}`
      }
      this.suggestUserNameArray.push(object);
    }
    this.showSuggestedUserName = true;

  }

  bindInputWithSuggestedUserName(value) {

    this.suggestUserNameArray.forEach(e => {
      e.selected = false;
    })
    value.selected = true;

    this.registrationForm.patchValue({
      userName: value.suggestedName
    })
  }


  toggleUserNameFeild(value) {

    if (value) {
      this.registrationForm.controls['userName'].enable();
    }
    else {
      this.registrationForm.controls['userName'].disable();
    }

  }

  on_EditUserName() {
    this.toggleUserNameFeild(true);    //this.usernameDisabled = false;
    this.showEditBtn = false;
    this.isUserNameVerified = false;
    this.isUserNameVerfyingBtn = true;
    this.suggestUserNameStr = "";
  }

  deleteUnWantedField(data){
    const refactorData = data;
    delete refactorData.email;
    delete refactorData.gender;
    delete refactorData.age;
    return refactorData;
  }

  registerApiCall(registrationData) {
    this.authenticateService.get_registration(registrationData).subscribe((res: any) => {
      if (res.status == "success") {
        // const successObj = this.getErrorPayload(2, 'registered')
        // this.successToaster(successObj);
        const loginData = this.deleteUnWantedField(registrationData);
        this.loginApiCall(loginData);
        //this.showingHeader.showingHeader.next(true);
        //remove//
        // this.registrationForm.reset();
        // this.showEditBtn = false;
        // this.isUserNameVerified = false;
        // this.isUserNameVerfyingBtn = true;
        // this.suggestUserNameStr = "";
        // this.count = 1;
        // this.toggleUserNameFeild(true);
        //rmove//
      }
      if (res.status == "error") {
        if (res.message.name = "ValidationError") {
          const validationErrorObj = this.getErrorPayload(1, 'validationError')
          this.errorToaster(validationErrorObj);
        }
      }
    }, (err: any) => {
      const errorObj = this.getErrorPayload(1, 'apiFailed')
      this.errorToaster(errorObj);
    });
  }

  on_Register() {
    const singUpValue = this.registrationForm.getRawValue();
    delete singUpValue.cpassword;
    this.registerApiCall(singUpValue);
  }

  loginApiCall(loginDetails) {
    this.authenticateService.get_Login(loginDetails).subscribe((res: any) => {
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
      this.errorToaster(toasterMsg);
    }
  }

}
