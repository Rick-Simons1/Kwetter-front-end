import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kwetter-front-end';

  constructor(public auth: AuthService) {
  }

  loginWithRedirect(): void {
    this.auth.loginWithRedirect();
  }
  
  logoutWithRedirect(): void {
    this.auth.logout()
  }
}
