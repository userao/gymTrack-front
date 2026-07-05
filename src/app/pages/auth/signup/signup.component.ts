import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { IUser, IUserSignupResponse } from '../../../model/user';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private usersService: UserService) { }

  // добавить валидацию, сообщения об ошибках, сообщение об успешной регистрации
  signupForm = new FormGroup({
    login: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  }
  )

  handleSignup() {
    this.usersService.signup(this.signupForm.value as IUser).subscribe();
  }
}


