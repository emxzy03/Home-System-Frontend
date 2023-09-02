import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser = '';
  constructor() { }

  ngOnInit() {
  }

  loggeding() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.loggedinUser = token;
    }
    return this.loggedinUser;
  }
  logout() {
    localStorage.removeItem('token');
    this.loggedinUser = ''; // ลบค่า loggedinUser ที่เก็บไว้
    alert('Logout Successfully');
  }

}
