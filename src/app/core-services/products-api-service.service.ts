import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {apiEndpoints} from 'src/app/constants/endPoints';


@Injectable({
  providedIn: 'root'
})
export class ProductsApiServiceService {

  constructor(public http : HttpClient) { }

  getAllProducts(){
    return this.http.get(`${apiEndpoints.apiUrl.url}${apiEndpoints.apis.getAllProducts}`);
  }


}
