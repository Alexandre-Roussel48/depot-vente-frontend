import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface LoginResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string
  ): Observable<{ isAuthenticated: boolean; message: string }> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<LoginResponse>(`${environment.baseURL}/gestion/login`, body, {
        headers,
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          if (response.status === 200) {
            this.isAuthenticated = true;
          }
        }),
        map((response) => {
          return {
            isAuthenticated: response.status === 200,
            message: response.body!.message,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          const message = error.error.message;
          return of({ isAuthenticated: false, message });
        })
      );
  }

  isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
