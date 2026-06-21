import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = 'http://localhost:5000/sessions';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  logoutCurrentSession(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getHeaders() });
  }

  logoutAllOtherSessions(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout-all`, {}, { headers: this.getHeaders() });
  }
}
