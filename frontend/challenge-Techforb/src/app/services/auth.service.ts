import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

//const regex= "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$"

interface LoginData {
  email: string;
  password: string;
}

interface ResponseData {
  token: string;
  fullName: string;
}

interface RegisterData {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _baseUrl = `${environment.BACKEND_URL}/auth`;
  private _http = inject(HttpClient);
  private readonly _cookies = inject(CookieService);
  private readonly _router = inject(Router);

  Login = (data: LoginData): Observable<ResponseData> => {
    return this._http.post<ResponseData>(`white_${this._baseUrl}/login`, data);
  };

  Logout = () => {
    this._cookies.set('token', '');
    this._cookies.set('fullname', '');
    this._router.navigateByUrl('/login');
  };

  Register = (data: RegisterData) => {
    return this._http.post<ResponseData>(
      `white_${this._baseUrl}/register`,
      data
    );
  };
}
