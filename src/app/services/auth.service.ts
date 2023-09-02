import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() {
}
  
  authUser(user: any){
  let UserArr =[];
  if(localStorage.getItem('Users')){
    UserArr = JSON.parse(localStorage.getItem('Users')!);
  }
  return UserArr.find((item: any) => item.userName === user.userName && item.password === user.password)
 }
  }


