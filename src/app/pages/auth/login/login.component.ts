import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../../../services/user.service';
import { IUser, IUserLoginResponse } from '../../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  // сделать валидацию и отображение ошибок
  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  handleLogin() {
    const { rememberMe, ...loginDto } = this.loginForm.value;
    this.userService.login(loginDto as IUser).subscribe((userResponse: IUserLoginResponse) => {
      this.userService.saveUser(rememberMe as boolean, userResponse);
      this.router.navigate(['/programs']);
    });
  }
}
