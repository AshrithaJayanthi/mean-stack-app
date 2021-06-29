import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  userObj;
  count;
  constructor(private hc:HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    //get user data from local storage
    this.userObj=JSON.parse(localStorage.getItem("userObj"))
    // this.userObj=JSON.parse(localStorage.getItem(this.userObj) || '{}')
    //get userCartObj from api
    this.userService.getProductsFromUsercart(this.userObj.username).subscribe(
      res=>{
        if(res.message==='CART EMPTY!'){
              this.userService.updateDataObservable(0)
      }
      else{
        this.userService.updateDataObservable(res.message)
      }

      this.userService.dataObservable.subscribe(prodObj=>{
            
        console.log(prodObj)
        if(prodObj===0){
          
            this.count=0

        }
        //when object exists
        else{
           
            this.count=prodObj.products.length;
            

        }
      })
    },
      err=>{
            console.log("error in adding cart obj",err)
           
            
      }
    )


  }
  //for testing dummy mtd
  getPrivateData(){
    this.hc.get('/user/testing').subscribe(
      res=>{
        alert(res['message'])
      },
      err=>{
        console.log(err)
        alert(err.message)
      }
      )
  }

}
