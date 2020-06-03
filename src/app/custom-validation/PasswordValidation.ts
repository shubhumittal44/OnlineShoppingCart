import { AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        //debugger;
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('cpassword').value; // to get value in input tag
        if (password != confirmPassword) {
     //       console.log('false');
            AC.get('cpassword').setErrors({ MatchPassword: true });
        } else {
      //      console.log('true');
            return null;   
        }    
    }       
}  