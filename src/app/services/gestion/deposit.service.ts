import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepositService {
  constructor(private http: HttpClient) {}

  registerClient(
    name: string,
    surname: string,
    email: string,
    phone_number: string,
    address: string | null
  ): Observable<Client> {
    const body = { name, surname, email, phone_number, address };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<Client>(`${environment.baseURL}/gestion/deposit/client`, body, {
        headers,
      })
      .pipe(map((json) => Client.createFrom(json)));
  }

  getClientByEmail(email: string): Observable<Client> {
    return this.http
      .get<Client>(
        `${environment.baseURL}/gestion/deposit/client?email=${email}`
      )
      .pipe(map((json) => Client.createFrom(json)));
  }
}
