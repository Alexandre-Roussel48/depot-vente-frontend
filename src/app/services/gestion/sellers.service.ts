import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../../models/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ClientDetails } from '../../models/client-details';

@Injectable({
  providedIn: 'root',
})
export class SellersService {
  constructor(private http: HttpClient) {}

  searchEmails(email: string): Observable<Client[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(email);
    // Envoi du paramètre email en tant que query string
    return this.http
      .post<
        Client[]
      >(`${environment.baseURL}/gestion/client-list`, { email }, { headers })
      .pipe(
        map((clients) => {
          console.log('Clients received:', clients);
          return clients.map((client) => Client.createFrom(client));
        })
      );
  }

  getClientInfo(id: string): Observable<ClientDetails> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Appel API avec l'ID comme paramètre dans l'URL
    return this.http
      .get<ClientDetails>(`${environment.baseURL}/gestion/client/${id}`, {
        headers,
      })
      .pipe(map((json) => ClientDetails.createFrom(json))); // Transformation de la réponse en instance de ClientDetails
  }
}
