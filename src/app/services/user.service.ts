import { inject, Injectable } from '@angular/core';
import { UserApiService } from './api/user.api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApiService = inject(UserApiService);

  login() {

  }

  signup() {

  }

  logout() {

  }
}
