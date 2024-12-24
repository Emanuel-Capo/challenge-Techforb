import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from "../common/button/button.component";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
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

  formgroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  handleRegister = () => {
    this.isLoading = true;
    const registerData = this.formgroup.getRawValue();
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

}
