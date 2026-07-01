import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-auth',
  imports: [MatTabsModule, SignupComponent, LoginComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {}
