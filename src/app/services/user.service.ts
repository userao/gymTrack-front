import { inject, Injectable } from '@angular/core';
import { UserApiService } from './api/user.api.service';
import { IUser, IUserLoginResponse, IUserSignupResponse } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApiService = inject(UserApiService);

  login(userLoginDto: IUser) {
    return this.userApiService.login(userLoginDto);
  }

  signup(userSignupDto: IUser) {
    return this.userApiService.signup(userSignupDto);
  }

  logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  }

  saveUser(rememberUser: boolean, userData: IUserLoginResponse) {
    const userDataString = JSON.stringify(userData);

    if (rememberUser) {
      localStorage.setItem("user", userDataString);
    } else {
      sessionStorage.setItem("user", userDataString);
    }
  }

  getSavedUser(): IUserLoginResponse | null {
    const userString = sessionStorage.getItem("user") ?? localStorage.getItem("user");
    if (!userString) {
      return null;
    }
    return JSON.parse(userString)
  }
}
