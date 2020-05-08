import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate{

    constructor(private authService : AuthService, private route: Router ){

    }

    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) 
    : Observable<boolean> | Promise<boolean> | boolean{

        if(this.authService.loggedIn())
        {
            return true;
        }
        else{
            this.route.navigate(['/']);
        }
    }
}