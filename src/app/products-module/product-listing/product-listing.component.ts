import { Component, OnInit } from '@angular/core';
import { ProductsApiServiceService } from 'src/app/core-services/products-api-service.service';
import { EnumSuccess } from 'src/hardcoded-Strings/success.enum';
import { EnumFailure } from 'src/hardcoded-Strings/failure.enum';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  constructor(public products: ProductsApiServiceService) { }

  productList: Array<any>;
  totalProducts : number;
  totalPages : number;
  currentPage : number;
  recordPerPage : number = 3;
  productsOnPageList : Array<any>;
  paginationNumber = [];
  showNextBtn : boolean = false;
  showPreviousBtn : boolean = false;

  ngOnInit() {
    this.getAllProductApiCall();

  }

  getPaginationText(){
    for(var i = 0; i < this.totalPages; i++)
    {
      let object = {
        i : i,
        selected : i + 1 == 1 ? true : false,
        value : i + 1
      };
      this.paginationNumber.push(object);
    }
  }

  getAllProductApiCall() {
    this.products.getAllProducts().subscribe((res: any) => {
      if (res.status === EnumSuccess.statusSuccess) {
        this.productList = res.data;
        this.productList = this.productList.sort((a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice));
        console.log(this.productList);
        this.totalProducts = this.productList.length;
        this.productsOnPageList = this.productList.slice(0,3);
        this.totalPages = Math.round(this.totalProducts/this.recordPerPage);
        if(this.totalPages > 1){
          this.showNextBtn = true;
        }
        this.getPaginationText();
      }
      else if (res.status === EnumFailure.statusFailed) {

      }
    }, (err: any) => {
      if (err.status === EnumFailure.apiFailed) {

      }
    })
  }

  onPageNumClick(object){

    // 1 loop / 2 c / 1 ar / 1slice  

    //Next 1 loop / 1 c /1ar /1slice

    // prev 1 loop /1c /1slice

    //3On + 4n + +2n+ 3On

    // 6 O(n)2  +6n

    //3O(n)2 +4n



    for(var i =0; i < this.paginationNumber.length; i++)
    {
      if(this.paginationNumber[i].selected && this.paginationNumber[i].i != object.i)
      {
        this.paginationNumber[i].selected = false;
      }
      else if(!this.paginationNumber[i].selected && this.paginationNumber[i].i == object.i){
        this.paginationNumber[i].selected = true;
      }
    }
    this.showHidePrevNxtBtn(object);
    this.displayPaginatBsdProduct(object);
  }

  displayPaginatBsdProduct(object){
    let endIndex = object.value * this.recordPerPage;
    let startIndex = endIndex - this.recordPerPage;
    this.productsOnPageList = this.productList.slice(startIndex, endIndex);
  }

  nextBtn()
  {
    for(var i = 0; i < this.paginationNumber.length; i++)
    {
      if(this.paginationNumber[i].selected)
      {
        this.paginationNumber[i].selected = false;
        this.paginationNumber[i + 1].selected = true;
        let object = this.paginationNumber[i + 1];
        this.showHidePrevNxtBtn(object);
        this.displayPaginatBsdProduct(object);
        break;
      }
    }
  }

  prevBtn(){
    for(var i = 0; i < this.paginationNumber.length; i++)
    {
      if(this.paginationNumber[i].selected)
      {
        this.paginationNumber[i].selected = false;
        this.paginationNumber[i - 1].selected = true;
        let object = this.paginationNumber[i - 1];
        this.showHidePrevNxtBtn(object);
        this.displayPaginatBsdProduct(object);
        break;
      }
    }
  }


  showHidePrevNxtBtn(object){
    if(this.paginationNumber.length === object.value)
    {
      this.showNextBtn = false;
      this.showPreviousBtn = true;
    }
    else if(object.value === 1){
      this.showPreviousBtn = false;
      this.showNextBtn = true;
    }
    else if(this.paginationNumber.length !== object.value && object.value !== 1){
      this.showPreviousBtn = true;
      this.showNextBtn = true;
    }
  }


}
