import { Component, inject, OnInit } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ButtonComponent } from '../../common/button/button.component';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, RouterLink, NgClass],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  private readonly _formBuilder = inject(NonNullableFormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _cookies = inject(CookieService);
  private readonly _router = inject(Router);
  private readonly _toast = inject(ToastrService);

  ngOnInit(): void {
    const token = this._cookies.get('token') || null;
    if (token && token !== '') {
      this._router.navigateByUrl('/dashboard');
    }
  }

  isLoading = false;

  formgroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
        ),
      ],
    ],
  });

  handleLogin = () => {
    this.isLoading = true;
    const loginData = this.formgroup.getRawValue();
    this._authService
      .Login(loginData)
      .subscribe({
        next: ({ token, fullName }) => {
          this._cookies.set('token', token);
          this._cookies.set('fullname', fullName);
          this._router.navigateByUrl('/dashboard');
          this._toast.success('Sesión iniciada correctamente');
        },
        error: () => {
          this._toast.error('Email y/o contraseña incorrectos');
        },
      })
      .add(() => (this.isLoading = false));
  };

  inputType: 'password' | 'text' = 'password';

  changeType = () => {
    if (this.inputType === 'password') this.inputType = 'text';
    else this.inputType = 'password';
  };
}
