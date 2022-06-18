import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kwetter-front-end';

  constructor(public auth: AuthService, private router : Router) {
    
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
  
  logoutWithRedirect(): void {
    this.auth.logout()
  }

  redirectToProfile(): void{
    this.router.navigateByUrl('/profile');
  }
}
