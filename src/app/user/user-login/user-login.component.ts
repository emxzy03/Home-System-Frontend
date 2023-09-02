import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  
  constructor(private authService: AuthService) {}
    
    ngOnInit(){
      
    }
  
    onLogin(loginForm: NgForm) {
      console.log(loginForm.value); // แสดง Object ที่ได้รับจากฟอร์ม
      const token = this.authService.authUser(loginForm.value);
      if(token){
        localStorage.setItem('token',token.userName);
        alert('Login Successfully');
        loginForm.reset();
      } else{
        alert('Login Not Successfully');
    }
  }
    

}


