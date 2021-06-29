import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

  addNewProduct(newProduct):Observable<any>{
    console.log("new product",newProduct)
    return this.hc.post("/product/add-product",newProduct)
  }

  getProducts():Observable<any>{
    return this.hc.get("/product/getproducts")
  }
  updateProduct():Observable<any>{
    return this.hc.get("/product/updateproduct")
  }
}
