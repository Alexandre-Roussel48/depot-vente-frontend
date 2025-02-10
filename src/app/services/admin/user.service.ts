import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${environment.baseURL}/admin/client/${id}`,
      { responseType: 'json' }
    );
  }
}
