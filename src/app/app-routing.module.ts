import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileRegisterPageComponent } from './profile-register-page/profile-register-page.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'register', component: ProfileRegisterPageComponent},
  {path: 'user/:hashtag', component: UserPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
