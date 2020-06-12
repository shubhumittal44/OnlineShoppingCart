import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ShowingHeaderServiceService } from './core-services/showing-header-service.service';
import { AuthService } from './auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,OnDestroy{
  isHeader : boolean;
  title = 'OnlineShoppingCart';
  $routerSubscribtion: Subscription;

  constructor(private showingHeader : ShowingHeaderServiceService,
    private authService : AuthService, public route : Router){
      
    }


  ngOnDestroy(){
    if(this.$routerSubscribtion){
      this.$routerSubscribtion.unsubscribe();
    }
  }



  ngOnInit(){
    // memory leak

   this.$routerSubscribtion = this.route.events.subscribe((event) =>{
      if(event instanceof NavigationEnd)
      {
        let url = event.url;
        if(url == '/login' || url == '/SignUp')
        {
          this.isHeader = false;
        }
        else{
          this.isHeader = true;
        }
      }
    });
  }

}
