import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export class LoginAuthGuard implements CanActivate{
    constructor(private authService : AuthService, public route : Router){

    }

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) :
    Observable<boolean> | Promise<boolean> | boolean{
        if(this.authService.loggedIn())
        {
            this.route.navigate(['home']);
        }
        else{
            return true;
        }
    }
}