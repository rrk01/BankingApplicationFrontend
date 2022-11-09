import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  changeLoggedIn() {
    this.isLoggedIn = true;
  }

}
