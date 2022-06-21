import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileRegisterPageComponent } from './profile-register-page/profile-register-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'register', component: ProfileRegisterPageComponent, canActivate: [AuthGuard]},
  {path: 'user/:hashtag', component: UserPageComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
