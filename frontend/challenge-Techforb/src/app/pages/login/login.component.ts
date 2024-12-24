import { Component } from '@angular/core';
import { loginInfoComponent } from "../../components/login/login-info/login-info.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [loginInfoComponent, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
