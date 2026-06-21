import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => this.handleAuthResponse(response))
    );
  }

  register(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users`, data).pipe(
      tap((response) => this.handleAuthResponse(response))
    );
  }

  private handleAuthResponse(response: LoginResponse): void {
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    if (response.user) {
      localStorage.setItem('userName', response.user.name);
      localStorage.setItem('userRole', response.user.role || 'user');
      localStorage.setItem('userId', response.user.id.toString());
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  getUserName(): string {
    return localStorage.getItem('userName') || 'Kullanıcı';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getRole(): string {
    return localStorage.getItem('userRole') || 'user';
  }

  getUserId(): number {
    return Number(localStorage.getItem('userId')) || 0;
  }
}
