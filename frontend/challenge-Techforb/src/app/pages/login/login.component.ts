import { Component } from '@angular/core';
import { loginInfoComponent } from "../../components/login/login-info/login-info.component";
import { LoginFormComponent } from "../../components/login/login-form/login-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [loginInfoComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
