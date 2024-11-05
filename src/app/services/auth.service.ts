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
  private _isAuthenticated = false;
  private logoutTimer: ReturnType<typeof setTimeout>;
  private tokenExpiryTime: number | null = null;
  private role: string | null = null;

  constructor(private http: HttpClient) {
    this.loadSession();
  }

  login(email: string, password: string): Observable<string> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<LoginResponse>(`${environment.baseURL}/gestion/login`, body, {
        headers,
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.setSession(response.body.expirationInSec, response.body.role);
        }),
        map((response) => {
          return response.body.message;
        }),
        catchError((error: HttpErrorResponse) => {
          const message = error.error.message;
          return of(message);
        })
      );
  }

  logout() {
    this._isAuthenticated = false;
    this.clearSession();
  }

  isAuthenticated(): boolean {
    this.loadSession(); // Ensure session data is up-to-date
    return (
      this._isAuthenticated &&
      this.tokenExpiryTime !== null &&
      Date.now() < this.tokenExpiryTime
    );
  }

  isAdmin(): boolean {
    this.loadSession();
    return this.role === 'ADMIN';
  }

  private setSession(expirationInSec: number, role: string) {
    this._isAuthenticated = true;
    this.tokenExpiryTime = Date.now() + expirationInSec * 1000;
    this.role = role;

    localStorage.setItem('isAuthenticated', String(this._isAuthenticated));
    localStorage.setItem('tokenExpiryTime', String(this.tokenExpiryTime));
    localStorage.setItem('role', this.role);

    this.startLogoutTimer(expirationInSec * 1000);
  }

  private clearSession() {
    this._isAuthenticated = false;
    this.tokenExpiryTime = null;
    this.role = null;

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('tokenExpiryTime');
    localStorage.removeItem('role');

    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  private startLogoutTimer(expirationDuration: number) {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  private loadSession() {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedExpiry = localStorage.getItem('tokenExpiryTime');
    const storedRole = localStorage.getItem('role');

    this._isAuthenticated = storedAuth === 'true';
    this.tokenExpiryTime = storedExpiry ? Number(storedExpiry) : null;
    this.role = storedRole || null;
  }
}
