import { AbstractControl } from '@angular/forms';

export class NoWhiteSpaceValidator{
    static spaceValidation(control : AbstractControl)
    {
        let value = control.get('gender').value;
        if(value != null && value != undefined)
        {
            if(value.trim().length === 0)
            {
                control.get('gender').setErrors({whiteSpace : true});
            }
            else{
                return null;
            }
        }
    }
}