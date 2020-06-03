import { AbstractControl } from '@angular/forms';

export class AgeValidator{
    static validateAge(control : AbstractControl){
        let age = control.get('age').value;
        if(age != null && age != undefined)
        {
            if(age < 10)
            {
                control.get('age').setErrors({ ageError : true })
            }
            else{
                return null;
            }
        }
    }
}