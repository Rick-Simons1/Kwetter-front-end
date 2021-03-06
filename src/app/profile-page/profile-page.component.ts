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
  showFollowing: boolean = false;
  showFollowers:boolean = false;
  followers: Kwetteruser[] = [];
  following: Kwetteruser[] = [];


  constructor(public auth: AuthService, private profileService: ProfileService, private formbuilder: FormBuilder, public router : Router) {
    this.auth.user$.subscribe((user) => {
      if (user?.sub != undefined) {
        this.profileService.findUserProfile(user.sub.slice(6))
          .subscribe({
            next: (kwetteruser) => { 
              this.kwetterUser = kwetteruser;
              this.findAllMessagesByUserId(this.kwetterUser!.authId);
            },
            error: (error) => {
              //todo: change error code to proper error code after adding error handling in the back-end
              if (error.error.statusCode === 500) {
                this.router.navigateByUrl('/register');
              }
            }
          }
        )
        this.profileService.findAllFollowingById(user.sub.slice(6)).subscribe((followingArray) => {
          this.following = followingArray;
        })
        this.profileService.findAllFollowersById(user.sub.slice(6)).subscribe((followersArray) => {
          this.followers = followersArray;
        })
      }
    })
  }

  profileForm = this.formbuilder.group({
    username: '',
    hashtag: '',
    discription: ''
  })

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.kwetterUser != undefined) {
      this.kwetterUser.username = this.profileForm.value.username;
      this.kwetterUser.hashtag = this.profileForm.value.hashtag;
      this.kwetterUser.description = this.profileForm.value.discription;
      this.profileService.updateUser(this.kwetterUser).subscribe();
    }


  }


  postMessage(messageContent: string) {
    if (this.kwetterUser) {
      const message: Message = { messageContent: messageContent, userId: this.kwetterUser.authId, userName: this.kwetterUser.username, userHashtag: this.kwetterUser.hashtag}
      this.profileService.postMessage(message).subscribe(() => {
        setTimeout(() => {
          if(this.kwetterUser)this.findAllMessagesByUserId(this.kwetterUser.authId); 
        }, 300)
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

  setShowFollowing(): void {
    if (this.showFollowing === false) {
      this.showFollowing = true;
    } else {
      this.showFollowing = false;
    }
  }

  setShowFollowers(): void {
    if (this.showFollowers === false) {
      this.showFollowers = true;
    } else {
      this.showFollowers = false;
    }
  }

  findAllMessagesByUserId(userid: string) {
    this.profileService.findAllMessagesByUserId(userid).subscribe((messages) => {
      this.messages = messages;
    })
  }

  logoutWithRedirect(): void {
    this.auth.logout()
  }

}
