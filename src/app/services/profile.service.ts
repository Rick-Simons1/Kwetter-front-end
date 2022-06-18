import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { Kwetteruser } from '../entities/kwetteruser';
import { Message } from '../entities/message';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url: string = "https://52.155.234.210";
  token: string = '';
  headers : any;




  constructor(private http: HttpClient, private auth:AuthService) {
    this.auth.idTokenClaims$.subscribe(token => {
      this.token = token!.__raw;
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${this.token}`
      });
    })
   }


  postMessage(message: Message){
    const JSONmessage = JSON.stringify(message);
    return this.http.post<any>(`${this.url}/message/`, message, {headers: this.headers});
  }

  findAllMessages(){
    return this.http.get<Message[]>(`${this.url}/message/`, {headers: this.headers});
  }

  findAllMessagesByUserId(userId: string){
    return this.http.get<Message[]>(`${this.url}/message/all/${userId}`, {headers: this.headers});
  }

  updateUser(kwetterUser : Kwetteruser){
    return this.http.put(`${this.url}/user/`, kwetterUser, {headers: this.headers});
  }

  createUserProfile(kwetterUser : Kwetteruser){
    return this.http.post<Kwetteruser>(`${this.url}/user/`, kwetterUser, {headers: this.headers});
  }

  findUserProfile(id: string){
    return this.http.get<Kwetteruser>(`${this.url}/user/` + id, {headers: this.headers});
  }

  findUserByHashtag(hashtag: string){
    return this.http.get<Kwetteruser>(`${this.url}/user/profile/` + hashtag, {headers: this.headers});
  }

  findAllFollowingById(userId: string){
    return this.http.get<Kwetteruser[]>(`${this.url}/user/following/` + userId, {headers: this.headers});
  }

  findAllFollowersById(userId: string){
    return this.http.get<Kwetteruser[]>(`${this.url}/user/followers/` + userId, {headers: this.headers});
  }

}
