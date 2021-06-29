import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {
  products=[];
  currentUser;
  constructor(private adminService:AdminService , private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser=localStorage.getItem("username")
    this.adminService.getProducts().subscribe(
      res=>{
        
        this.products=res.message;
        console.log(res.message)
      },
      err=>{
        console.log("err in reading products ",err)
        console.log("Something went wrong in reading products")
      }
    )
  }

  //product selected by user
  onProductSelect(productObject){
    // console.log(productObject)
    let username=localStorage.getItem("username")
    //merging both username product object
    let newUserProductObject={username,productObject}
    console.log(newUserProductObject)


this.userService.sendProductToUserCart(newUserProductObject).subscribe(
  res=>{
    alert(res['message'])
    //updating latest cart object
     this.userService.updateDataObservable(res.latestCartObj)
    
  },
  err=>{
console.log("err in posting the product to the cart",err)
alert("error in adding to cart")
  }
)
  }
}
