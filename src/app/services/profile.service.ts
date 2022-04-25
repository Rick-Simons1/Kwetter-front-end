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
  

  constructor(private http: HttpClient) { }


  postMessage(message: Message){
    const JSONmessage = JSON.stringify(message);
    console.log(JSONmessage);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
  });
    return this.http.post<Message>("http://localhost:4000/message/", JSONmessage, {headers});
  }

  findAllMessages(){
    return this.http.get<Message[]>("http://localhost:4000/message/");
  }

  updateUserProfileData(kwetterUser : Kwetteruser){
    return this.http.put("http://localhost:4000/user/", kwetterUser);
  }

  findUserProfile(id: string){
    return this.http.get<Kwetteruser>("http://localhost:4000/user/" + id);
  }
}
