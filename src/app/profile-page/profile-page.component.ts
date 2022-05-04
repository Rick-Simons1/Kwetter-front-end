import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { Kwetteruser } from '../entities/kwetteruser';
import { Message } from '../entities/message';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePageComponent implements OnInit {
  //user: User | null | undefined;
  kwetterUser: Kwetteruser | undefined;
  messages: Message[] = [];
  showProfileForm: boolean = false;


  constructor(public auth: AuthService, private profileService: ProfileService, private formbuilder: FormBuilder, private router : Router) {
    this.auth.user$.subscribe((user) => {
      if (user?.sub != undefined) {
        this.profileService.findUserProfile(user.sub.slice(6))
          .subscribe({
            next: (kwetteruser) => { this.kwetterUser = kwetteruser; },
            error: (error) => {
              //todo: change error code to proper error code after adding error handling in the back-end
              if (error.error.statusCode === 500) {
                this.router.navigateByUrl('/register');
              }
            }
          }
          )
      }
    })
  }

  profileForm = this.formbuilder.group({
    username: '',
    hashtag: '',
    discription: ''
  })

  ngOnInit(): void {
    this.findAllMessages();
  }

  onSubmit(): void {
    if (this.kwetterUser != undefined) {
      this.kwetterUser.username = this.profileForm.value.username;
      this.kwetterUser.hashtag = this.profileForm.value.hashtag;
      this.kwetterUser.discription = this.profileForm.value.discription;
      this.profileService.updateUserProfileData(this.kwetterUser).subscribe();
    }


  }


  postMessage(messageContent: string) {
    if (this.kwetterUser != undefined) {
      const message: Message = { messageContent: messageContent, user: this.kwetterUser }
      console.log(message);
      this.profileService.postMessage(message).subscribe((message) => {
        console.log(message);
        this.findAllMessages();
      });
    }
  }

  setShowProfileForm(): void {
    if (this.showProfileForm === false) {
      this.showProfileForm = true;
    } else {
      this.showProfileForm = false;
    }
  }

  findAllMessages() {
    this.profileService.findAllMessages().subscribe((messages) => {
      this.messages = messages;
    })
  }

  logoutWithRedirect(): void {
    this.auth.logout()
  }

}
