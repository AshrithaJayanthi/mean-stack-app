import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }

onLogin(userCredentials:any){
  this.us.loginUser(userCredentials).subscribe(
    res=>{
      if(res.message==="login success")
      {
       //save token to local or session
       localStorage.setItem("token",res.token)
       localStorage.setItem("username",res.username)
       localStorage.setItem("userObj",JSON.stringify(res.userObj)) 
       //update userLoginStatus
       this.us.userLoginStatus=true
       //navigate to profile
       if(userCredentials.type==="user"){
        //navigate to user profile
        this.router.navigateByUrl(`userprofile/${res.username}`)
        }
        if(userCredentials.type==="admin"){
          //navigate to admin profile
          this.router.navigateByUrl(`admin/${res.username}`)
          }
     
      }
      else{
        alert(res.message)
      }
    },
    err=>{
      console.log(err),
      alert("something went wrong in login")
    }
  )
}  

}
