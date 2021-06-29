import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  file:File
 //for files
 selectFile(event){
this.file=event.target.files[0]
console.log(this.file)
 }


   onSignup(userObj:any){
     //create formdata obj
     let formData= new FormData()
     //add file
     formData.append("photo",this.file,this.file.name)
     //add userObj
     formData.append("userObj",JSON.stringify(userObj))
    this.us.createUser(formData).subscribe(
      res=>{
        if(res.message==="user created successfully"){
          alert("user created")
          //navigate to login component
          this.router.navigateByUrl("/login")
        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err)
        alert("something went wrong in user creation")
      }
    )
  }
}
