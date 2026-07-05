import { inject, Injectable } from '@angular/core';
import { IUser, IUserLoginResponse, IUserSignupResponse } from '../../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  httpClient = inject(HttpClient);

  login(userLoginDto: IUser): Observable<IUserLoginResponse> {
    return this.httpClient.post<IUserLoginResponse>("http://localhost:3000/auth/login", userLoginDto);
  }

  signup(userSignupDto: IUser): Observable<IUserSignupResponse> {
    return this.httpClient.post<IUserSignupResponse>("http://localhost:3000/auth/register", userSignupDto);
  }
}
