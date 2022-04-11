import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { Kwetteruser } from '../entities/kwetteruser';
import { Message } from '../entities/message';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User;
  messages: Message[] = [];

  constructor(public auth: AuthService, private profileService: ProfileService) {
    this.user = auth.user$ as User;
  }

  ngOnInit(): void {
    this.findAllMessages();
  }


  postMessage(messageContent: string){
    const user: Kwetteruser = {id: 1, username: "testusername", email: "testemail"};
    const message: Message = {messageContent: messageContent, user: user}
    console.log(message);
    this.profileService.postMessage(message).subscribe((message) => {
      console.log(message);
      this.findAllMessages();
    });
  }

  findAllMessages(){
    this.profileService.findAllMessages().subscribe((messages) => {
      this.messages = messages;
    })
  }

  logoutWithRedirect(): void {
    this.auth.logout()
  }

}
