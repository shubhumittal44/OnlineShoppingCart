import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public renderer2 :Renderer2) { }

  ngOnInit() {
    this.renderer2.addClass(document.body, 'addPadding');
  }
  ngOnDestroy() {
    this.renderer2.removeClass(document.body, 'addPadding');
  }
  

}
