import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//creating behaviour source

  dataSource=new BehaviorSubject<any>(0)
  dataObservable =this.dataSource.asObservable();

  updateDataObservable(data){
    this.dataSource.next(data)  
  }







 userLoginStatus=false;
  constructor(private hc:HttpClient) { 
    if(localStorage.getItem('username')!==null){
      this.userLoginStatus=true;
    }
  }

createUser(userObj:any):Observable<any>{
return this.hc.post("/user/createuser",userObj)
  }
getUser(username:any):Observable<any>
  {
    return this.hc.get(`/user/getuser/${username}`,username)
  }
  loginUser(credentials:any):Observable<any>{
  return this.hc.post("/user/login",credentials)
  }

deleteUser(){

}
updateUser(){

}
//usercart
sendProductToUserCart(userProductObject):Observable<any>{
  return this.hc.post("/user/add-to-cart",userProductObject)

}
//get products from usercart
getProductsFromUsercart(username):Observable<any>{
 return this.hc.get(`/user/getproducts/${username}`)
}
//admin
createAdmin(adminObj:any):Observable<any>{
  return this.hc.post("/user/createadmin",adminObj)
    }
  getAdmin(username:any):Observable<any>
    {
      return this.hc.get("/admin/getadmin/${username}",username)
    }
    loginAdmin(credentials:any):Observable<any>{
    return this.hc.post("/admin/login",credentials)
    }
  

}
