import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private baseUrl = 'api/admin/game';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  createGame(game: {
    name: string;
    editor: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${environment.baseURL}/admin/game`,
      game
    );
  }

  updateGame(game: {
    id: number;
    name?: string;
    editor?: string;
  }): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${environment.baseURL}/admin/game`,
      game
    );
  }

  deleteGame(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${environment.baseURL}/admin/game`,
      { body: { id } }
    );
  }

  getGames(query: string = ''): Observable<Game[]> {
    return this.http.get<Game[]>(
      `${environment.baseURL}/gestion/game?query=${query}`
    );
  }
}
