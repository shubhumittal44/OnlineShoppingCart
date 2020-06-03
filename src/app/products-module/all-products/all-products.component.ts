import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
hi =[];
  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
         this.hi.push(i);
      }
    }, 500);
  }

}
