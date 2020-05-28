import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AuthenticationApiServiceService } from 'src/app/core-services/authentication-api-service.service';
import { ToasterService } from 'src/app/core-services/toaster.service';
import { EnumFailureRegisterationApi } from 'src/hardcoded-Strings/failure.enum';
import { EnumSuccessRegistrationApi } from 'src/hardcoded-Strings/success.enum';
import { EnumWarningRegistrationApi } from 'src/hardcoded-Strings/warning.enum';
import { PasswordValidation } from 'src/app/custom-validation/PasswordValidation';
import { RegistrationApiFields } from 'src/app/models/registration-model.model';
import { NoWhiteSpaceValidator } from 'src/app/custom-validation/SpaceValidation';
import { AgeValidator } from 'src/app/custom-validation/AgeValidation';

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

  constructor(public formBuilder: FormBuilder, public authenticateService: AuthenticationApiServiceService, public tosterService: ToasterService) { }


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
    //value 0 for warning 
    // value 1 for error
    if (value == 0) {
      return EnumWarningRegistrationApi.title
    }
    else {
      return EnumFailureRegisterationApi.title;

    }
  }

  userNameAuthApiCall(userData) {

    // naming convention
    //separete method for api 

    if (userData.userName !== this.suggestUserNameStr) {
      this.suggestUserNameStr = userData.userName;
      if (userData.userName != null) {
        this.authenticateService.check_ValidUserName(userData).subscribe((res: any) => {
          if (res.status == 'success') {
            let successObj = {
              title: EnumSuccessRegistrationApi.title,
              body: EnumSuccessRegistrationApi.userNameVerified
            }
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
      else {
        let obj = {
          title: this.getTitle(1),
          body: EnumFailureRegisterationApi.enterUserName
        }
        this.errorToaster(obj);
      }
    }
    else {
      let warningObj = {
        title: this.getTitle(0),
        body: EnumWarningRegistrationApi.sameUserName
      }

      this.warningToaster(warningObj);
    }
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


  // getErrorPayload(title, body) {

  //   let errorObj = {
  //     title: this.getTitle(title),
  //     body: this.getBody(body)
  //     EnumFailureRegisterationApi.alreadyExist
  //   }
  //   return errorObj;
  // }


  // getBody(key) {
  //   switch (key) {
  //     case 'aleradyEsit':
  //       return EnumFailureRegisterationApi.alreadyExist
  //     case value:

  //       break;
  //     case value:

  //       break;
  //     case value:

  //       break;

  //     default:
  //       break;
  //   }
  // }



  verifyUserApiCallErrorHandler(error) {
    if (error.message.toLowerCase == EnumFailureRegisterationApi.alreadyExist.toLowerCase) {
      let errorObj = {
        title: this.getTitle(1),
        body: EnumFailureRegisterationApi.alreadyExist
      }
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
      let errorObj = {
        title: this.getTitle(1),
        body: EnumFailureRegisterationApi.apiFailed
      }
      this.errorToaster(errorObj);
    }
  }

  showUserNameSuggestions(formValue) {
    if (formValue.username != '' && formValue.username != undefined) {
      this.createUserName(formValue.username);
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
      username: value.suggestedName
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

  registerApiCall(registrationData) {
    this.authenticateService.get_registration(registrationData).subscribe((res: any) => {
      if (res.status == "success") {
        let successObj = {
          title: EnumSuccessRegistrationApi.title,
          body: EnumSuccessRegistrationApi.registered
        }
        this.successToaster(successObj);

        //remove//
        this.registrationForm.reset();
        this.showEditBtn = false;
        this.isUserNameVerified = false;
        this.isUserNameVerfyingBtn = true;
        this.suggestUserNameStr = "";
        this.count = 1;
        this.toggleUserNameFeild(true);
        //rmove//
      }
      if (res.status == "error") {
        if (res.message.name = "ValidationError") {
          let validationErrorObj = {
            title: this.getTitle(1),
            body: EnumFailureRegisterationApi.validationError
          }
          this.errorToaster(validationErrorObj);
        }
      }
    }, (err: any) => {
      let errorObj = {
        title: this.getTitle(1),
        body: EnumFailureRegisterationApi.apiFailed
      }
      this.errorToaster(errorObj);
    });
  }

  on_Register() {

    const singUpValue = this.registrationForm.getRawValue();
    delete singUpValue.cpassword;
    this.registerApiCall(singUpValue);
  }

}
