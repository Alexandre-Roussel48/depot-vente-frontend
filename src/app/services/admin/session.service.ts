import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  createSession(session: {
    begin_date: Date;
    end_date: Date;
    commission: number;
    fees: number;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.baseURL}/admin/session`,
      session
    );
  }

  updateSession(session: {
    id: number;
    commissions?: number;
    fees?: number;
  }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${environment.baseURL}/admin/session`,
      session
    );
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${environment.baseURL}/gestion/session`);
  }
}
