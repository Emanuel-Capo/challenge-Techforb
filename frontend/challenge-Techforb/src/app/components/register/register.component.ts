import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../common/button/button.component';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
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

  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    return control.value.password === control.value.confirmPassword
      ? null
      : { PasswordNoMatch: true };
  };

  formgroup = this._formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: this.confirmPasswordValidator,
    }
  );

  handleRegister = () => {
    this.isLoading = true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...registerData } = this.formgroup.getRawValue();
    this._authService
      .Register(registerData)
      .subscribe({
        next: ({ token, fullName }) => {
          this._cookies.set('token', token);
          this._cookies.set('fullname', fullName);
          this._router.navigateByUrl('/dashboard');
          this._toast.success('Usuario registrado correctamente');
        },
        error: () => {
          this._toast.error('Ha ocurrido un error');
        },
      })
      .add(() => (this.isLoading = false));
  };

  inputType: 'password' | 'text' = 'password';

  changeType = () => {
    if (this.inputType === 'password') this.inputType = 'text';
    else this.inputType = 'password';
  };

  inputType2: 'password' | 'text' = 'password';

  changeType2 = () => {
    if (this.inputType2 === 'password') this.inputType2 = 'text';
    else this.inputType2 = 'password';
  };
}
