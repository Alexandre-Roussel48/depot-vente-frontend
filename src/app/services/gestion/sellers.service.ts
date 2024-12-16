import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ClientDetails } from '../../models/client-details';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root',
})
export class SellersService {
  constructor(private http: HttpClient) {}

  searchEmails(email: string): Observable<Client[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<
        Client[]
      >(`${environment.baseURL}/gestion/client-list`, { email }, { headers })
      .pipe(
        map((clients) => {
          return clients.map((client) => Client.createFrom(client));
        })
      );
  }

  getClientInfo(id: string, session: Session): Observable<ClientDetails> {
    const body = { id, session };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<ClientDetails>(`${environment.baseURL}/gestion/client-info`, body, {
        headers,
      })
      .pipe(map((json) => ClientDetails.createFrom(json)));
  }

  getAllSession(): Observable<Session[]> {
    return this.http
      .get<Session[]>(`${environment.baseURL}/gestion/session`)
      .pipe(
        map((sessions) => {
          return sessions.map((session) => Session.createFrom(session));
        })
      );
  }
}
