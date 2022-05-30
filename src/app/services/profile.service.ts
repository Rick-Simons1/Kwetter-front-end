import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'
import { Kwetteruser } from '../entities/kwetteruser';
import { Message } from '../entities/message';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url: string = "http://20.105.24.28/";


  constructor(private http: HttpClient) { }


  postMessage(message: Message){
    const JSONmessage = JSON.stringify(message);
    console.log(JSONmessage);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
  });

    return this.http.post<any>(`${this.url}/message/`, message, {headers});
  }

  findAllMessages(){
    return this.http.get<Message[]>(`${this.url}/message/`);
  }

  findAllMessagesByUserId(userId: string){
    return this.http.get<Message[]>(`${this.url}/message/all/${userId}`);
  }

  updateUser(kwetterUser : Kwetteruser){
    return this.http.put(`${this.url}/user/`, kwetterUser);
  }

  createUserProfile(kwetterUser : Kwetteruser){
    return this.http.post<Kwetteruser>(`${this.url}/user/`, kwetterUser);
  }

  findUserProfile(id: string){
    return this.http.get<Kwetteruser>(`${this.url}/user/` + id);
  }

  findUserByHashtag(hashtag: string){
    return this.http.get<Kwetteruser>(`${this.url}/user/profile/` + hashtag);
  }

  findAllFollowingById(userId: string){
    return this.http.get<Kwetteruser[]>(`${this.url}/user/following/` + userId);
  }

  findAllFollowersById(userId: string){
    return this.http.get<Kwetteruser[]>(`${this.url}/user/followers/` + userId);
  }

}
