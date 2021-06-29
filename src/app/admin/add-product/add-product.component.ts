import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private adminservice:AdminService) { }

  ngOnInit(): void {
  }
  file:File
  selectFile(event){
  this.file=  event.target.files[0]

  }
  onAddProduct(prodObj){
 //create FOrmData obj
    // console.log("prod obj",prodObj)
   let formData=new FormData()
   //adding file
   formData.append("photo",this.file,this.file.name)
   //adding userObj
   formData.append("prodObj",JSON.stringify(prodObj))
   this.adminservice.addNewProduct(formData).subscribe(
     res=>{
        if(res.message==="product created successfully")
        { 
          console.log("formdata is: ",formData)
          alert("new product added")
          //navigate to view products
        }
        else{
          console.log("error is: ",res.err)
          alert(res.message)
        }
     },
     err=>{
    console.log("err in adding product",err)
    alert("error in adding product")
     }
   )
  }

}
