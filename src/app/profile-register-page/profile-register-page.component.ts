import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Kwetteruser } from '../entities/kwetteruser';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-register-page',
  templateUrl: './profile-register-page.component.html',
  styleUrls: ['./profile-register-page.component.scss']
})
export class ProfileRegisterPageComponent implements OnInit {
  kwetterUser: Kwetteruser = {
    id: 0,
    username: '',
    hashtag: '',
    description: '',
    authId: '',
    role: '',
    following: [],
    followers: []
  }

  constructor(public auth: AuthService, private profileService: ProfileService, private formbuilder: FormBuilder, private router: Router) {
    this.auth.user$.subscribe((user) => {
      if(user?.sub){
        this.kwetterUser.authId = user.sub.slice(6)
      }
    })
   }

  ngOnInit(): void {
  }

  profileForm = this.formbuilder.group({
    username: '',
    hashtag: '',
    description: ''
  })


  //todo add check to see if account data is created
  onSubmit(): void {
    if (this.kwetterUser != undefined) {
      this.kwetterUser.username = this.profileForm.value.username;
      this.kwetterUser.hashtag = this.profileForm.value.hashtag;
      this.kwetterUser.description = this.profileForm.value.description;
      this.profileService.createUserProfile(this.kwetterUser).subscribe(()=>{
        this.router.navigateByUrl('/profile');
      });
    }
  }

}
