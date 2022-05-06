import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from './signup/signup-request';
import { map, Observable, tap, throwError } from 'rxjs';
import { LoginRequest } from './login/login-request';
import { LoginResponse } from './login/login-response';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  constructor(private httpClient: HttpClient,private localStorage:LocalStorageService) { }

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(), 
    username: this.getUserName()
  }
  signup(signupRequest: SignupRequest): Observable<any> {
    return this.httpClient.post('http://localhost:3333/api/auth/signup', signupRequest, { responseType: 'text' });
  }
  login(loginRequest:LoginRequest) :Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:3333/api/auth/login',loginRequest).pipe(map(data=> {
      this.localStorage.store('authenticationToken', data.authenticationToken);
      this.localStorage.store('username', data.username);
      this.localStorage.store('refreshToken', data.refreshToken);
      this.localStorage.store('expiresAt', data.expiresAt);
      console.log(this.localStorage.retrieve('username'));

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }))
  }
  logout(){
    this.httpClient.post('http://localhost:3333/api/auth/logout',this.refreshTokenPayload,{responseType:'text'}).subscribe({next : (n) => {console.log(n)},
     error : (e) => {console.log(e);console.log(this.refreshTokenPayload);throwError(()=>e)}});
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }
  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:3333/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('authenticationToken');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('authenticationToken',
          response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }
  getUserName() {
    return this.localStorage.retrieve('username');
  }
  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
