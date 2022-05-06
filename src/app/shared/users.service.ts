import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPayload } from '../auth/user-profile/user-payload';
import { UsersModel } from './users-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getAll() {
    return this.http.get<Array<UsersModel>>('http://localhost:3333/users/all');
  }
  getUserByUsername(username:string): Observable<UsersModel> {
    return this.http.get<UsersModel>('http://localhost:3333/users/u/' + username);
  }

  updateUser(userPayload:UserPayload) : Observable<any> {
    return this.http.put('http://localhost:3333/users/update/', userPayload,{responseType:'text'});
  }
  // getEmailbyUsername(username:string){
  //   return this.http.get('http://localhost:3333/users/u/' + username,{responseType:'text'});
  // }
}
