import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'accessToken';
  private readonly baseUrl = 'https://us-central1-atom-task-backend.cloudfunctions.net/api/users';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string) {
    return this.http.post<{ accessToken: string }>(`${ this.baseUrl }/login`, { email }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.accessToken);
      })
    );
  }

  register(email: string) {
    return this.http.post<{ accessToken: string }>(`${ this.baseUrl }`, { email }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']).then();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
