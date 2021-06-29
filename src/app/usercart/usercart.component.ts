import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-usercart',
  templateUrl: './usercart.component.html',
  styleUrls: ['./usercart.component.css']
})
export class UsercartComponent implements OnInit {
userCartObj;
products=[]

  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
    let username=localStorage.getItem("username")
    this.userService.dataObservable.subscribe(
      res=>{
        if (res["message"]==='CART EMPTY!'){
            alert("user cart is empty")
        }
        else{
            
             this.products=res["products"];
           console.log(this.products)
        
             
        }
    },
      err=>{
        console.log("error in reading the cart",err)
        alert("something went wrong in fetching cart item...")
      }

    )

  }

  
}
