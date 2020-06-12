import { Component, OnInit } from '@angular/core';
import { ShowingHeaderServiceService } from '../core-services/showing-header-service.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private  showingHeader :ShowingHeaderServiceService, public route : Router) { }

  ngOnInit() {
  }

}
