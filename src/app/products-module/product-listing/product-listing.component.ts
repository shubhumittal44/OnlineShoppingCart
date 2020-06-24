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
  totalProducts: number;
  totalPages: number;
  currentPage: number;
  recordPerPage: number = 3;
  productsOnPageList: Array<any>;
  paginationNumber = [];
  showNextBtn: boolean = false;
  showPreviousBtn: boolean = false;
  myPageIndex = 1;

  ngOnInit() {
    this.getAllProductApiCall();
  }

  getPaginationText() {
    for (var i = 0; i < this.totalPages; i++) {
      let object = {
        i: i,
        selected: i + 1 == 1 ? true : false,
        value: i + 1
      };
      this.paginationNumber.push(object);
    }
  }

  setMappingFor() {
    const pageLimit = 4;
    let myMappingVariable = 1;
    for (let i = 0; i < this.productList.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        myMappingVariable++;
      }
      this.productList[i].mappingId = myMappingVariable;
    }
  }

  setCurrentPage(pageNumber) {
    this.productsOnPageList = this.productList.filter(e => e.mappingId == pageNumber);
  }

  nextBtn() {
    const lastIndexValidation = this.paginationNumber[this.paginationNumber.length - 1];
    if (this.myPageIndex != lastIndexValidation.value) {
      this.myPageIndex++;
      this.genericFlushing();
      this.paginationNumber[this.myPageIndex - 1].selected = true;
      this.genericPrevNext();
      this.setCurrentPage(this.myPageIndex);
    }

  }

  prevBtn() {

    if (this.myPageIndex != 1) {
      this.myPageIndex--;
      this.genericFlushing();
      this.paginationNumber[this.myPageIndex - 1].selected = true;
      this.genericPrevNext();
      this.setCurrentPage(this.myPageIndex);
    }

  }

  genericPrevNext() {
 
    const lastIndexValidation = this.paginationNumber[this.paginationNumber.length - 1];

    if (this.myPageIndex == lastIndexValidation.value) {
      this.showNextBtn = false;
    }
    else {
      this.showNextBtn = true;
    }
    if (this.myPageIndex == 1) {
      this.showPreviousBtn = false;
    }
    else {
      this.showPreviousBtn = true;
    }
  }




  genericFlushing() {
 
    this.paginationNumber.forEach(element => {
      element.selected = false;
    });
  }

  onPageNumClick(object) {
    this.myPageIndex = object.value;
    this.genericFlushing();
    object.selected = true;
    this.genericPrevNext();
    this.setCurrentPage(this.myPageIndex);
  }


  getAllProductApiCall() {
    this.products.getAllProducts().subscribe((res: any) => {

      if (res.status === EnumSuccess.statusSuccess) {
        this.productList = res.data;
        this.productList = this.productList.sort((a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice));
        this.totalProducts = this.productList.length;

        // this.productsOnPageList = this.productList.slice(0, 3);
        this.totalPages = Math.round(this.totalProducts / this.recordPerPage);
        if (this.totalPages > 1) {
          this.showNextBtn = true;
        }
        this.getPaginationText();
        this.setMappingFor();
        this.setCurrentPage(this.myPageIndex);
      }
      else if (res.status === EnumFailure.statusFailed) {

      }
    }, (err: any) => {
      if (err.status === EnumFailure.apiFailed) {

      }
    })
  }
  //junk
  // getAllProductApiCall() {
  //   this.products.getAllProducts().subscribe((res: any) => {
  //     if (res.status === EnumSuccess.statusSuccess) {
  //       this.productList = res.data;
  //       this.productList = this.productList.sort((a, b) => parseFloat(a.productPrice) - parseFloat(b.productPrice));
  //       console.log(this.productList);
  //       this.totalProducts = this.productList.length;
  //       this.productsOnPageList = this.productList.slice(0,3);
  //       this.totalPages = Math.round(this.totalProducts/this.recordPerPage);
  //       if(this.totalPages > 1){
  //         this.showNextBtn = true;
  //       }
  //       this.getPaginationText();
  //     }
  //     else if (res.status === EnumFailure.statusFailed) {

  //     }
  //   }, (err: any) => {
  //     if (err.status === EnumFailure.apiFailed) {

  //     }
  //   })
  // }

  //junk
  // onPageNumClick(object) {

  //   // 1 loop / 2 c / 1 ar / 1slice  

  //   //Next 1 loop / 1 c /1ar /1slice

  //   // prev 1 loop /1c /1slice

  //   //3On + 4n + +2n+ 3On

  //   // 6 O(n)2  +6n

  //   //3O(n)2 +4n

  //   for (var i = 0; i < this.paginationNumber.length; i++) {
  //     if (this.paginationNumber[i].selected && this.paginationNumber[i].i != object.i) {
  //       this.paginationNumber[i].selected = false;
  //     }
  //     else if (!this.paginationNumber[i].selected && this.paginationNumber[i].i == object.i) {
  //       this.paginationNumber[i].selected = true;
  //     }
  //   }
  //   this.showHidePrevNxtBtn(object);
  //   this.displayPaginatBsdProduct(object);
  // }

  // displayPaginatBsdProduct(object) {
  //   let endIndex = object.value * this.recordPerPage;
  //   let startIndex = endIndex - this.recordPerPage;
  //   this.productsOnPageList = this.productList.slice(startIndex, endIndex);
  // }

  // nextBtn() {
  //   for (var i = 0; i < this.paginationNumber.length; i++) {
  //     if (this.paginationNumber[i].selected) {
  //       this.paginationNumber[i].selected = false;
  //       this.paginationNumber[i + 1].selected = true;
  //       let object = this.paginationNumber[i + 1];
  //       this.showHidePrevNxtBtn(object);
  //       this.displayPaginatBsdProduct(object);
  //       break;
  //     }
  //   }
  // }

  // prevBtn() {
  //   for (var i = 0; i < this.paginationNumber.length; i++) {
  //     if (this.paginationNumber[i].selected) {
  //       this.paginationNumber[i].selected = false;
  //       this.paginationNumber[i - 1].selected = true;
  //       let object = this.paginationNumber[i - 1];
  //       this.showHidePrevNxtBtn(object);
  //       this.displayPaginatBsdProduct(object);
  //       break;
  //     }
  //   }
  // }


  // showHidePrevNxtBtn(object) {
  //   if (this.paginationNumber.length === object.value) {
  //     this.showNextBtn = false;
  //     this.showPreviousBtn = true;
  //   }
  //   else if (object.value === 1) {
  //     this.showPreviousBtn = false;
  //     this.showNextBtn = true;
  //   }
  //   else if (this.paginationNumber.length !== object.value && object.value !== 1) {
  //     this.showPreviousBtn = true;
  //     this.showNextBtn = true;
  //   }
  // }


}
