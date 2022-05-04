import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService,private router : Router) {
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((result) => {
      if(result){
        this.router.navigateByUrl('/profile');
      }
    })
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }

  

}
