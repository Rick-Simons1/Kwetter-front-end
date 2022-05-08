import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Kwetteruser } from '../entities/kwetteruser';
import { Message } from '../entities/message';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user: Kwetteruser | undefined;
  authenticatedUser: Kwetteruser | undefined;
  messages: Message[] = [];
  isfollowing: boolean | undefined;

  constructor(route: ActivatedRoute, private profileService: ProfileService, public auth: AuthService) {
    route.params.subscribe((params) => {
      this.profileService.findUserByHashtag(params["hashtag"]).subscribe((user) => {
        this.user = user;
      })
    });

    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe((user) => {
        if (user?.sub != undefined) this.profileService.findUserProfile(user.sub.slice(6))
          .subscribe((kwetterUser) => {
            this.authenticatedUser = kwetterUser;
            if (this.user) {
              if (this.user.followers.includes(this.authenticatedUser.authId)) {
                this.isfollowing = true;
              } else {
                this.isfollowing = false;
              }
              this.findAllMessagesByUserId(this.user.authId);
            }
          })
      })
    }
  }

  ngOnInit(): void {
  }


  //todo: add check to prevent following own account when navigating to user page of own account
  followUser() {
    if (this.user && this.authenticatedUser) {
      this.authenticatedUser?.following.push(this.user?.authId);
      this.user?.followers.push(this.authenticatedUser?.authId);
      this.profileService.updateUser(this.authenticatedUser).subscribe();
      this.profileService.updateUser(this.user).subscribe();
      this.isfollowing = true;
    }
  }

  unFollowUser() {
    if (this.user && this.authenticatedUser) {
      this.authenticatedUser.following = this.authenticatedUser?.following.filter((item) => item !== this.user?.authId);
      this.profileService.updateUser(this.authenticatedUser).subscribe();
      this.isfollowing = false;
    }
  }

  findAllMessagesByUserId(userId: string) {
    this.profileService.findAllMessagesByUserId(userId).subscribe((messages) => {
      messages.forEach((message)=>{
        if(this.user)message.user = this.user;
      })
      this.messages = messages;
    })
  }
}
