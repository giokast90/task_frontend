import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for handling authentication logic, including login, registration,
 * token management, and session status.
 */
export class AuthService {
  /**
   * Key used to store the access token in the browser's local storage.
   */
  private tokenKey = 'accessToken';
  /**
   * Base URL of the backend API for user authentication and related functionalities.
   */
  private readonly baseUrl = 'https://us-central1-atom-task-backend.cloudfunctions.net/api/users';

  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Logs in a user by sending their email to the backend API.
   * Stores the received access token in local storage.
   *
   * @param email - The email address of the user attempting to log in.
   * @returns An observable emitting the HTTP response containing the access token.
   */
  login(email: string) {
    return this.http.post<{ accessToken: string }>(`${ this.baseUrl }/login`, { email }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.accessToken);
      })
    );
  }

  /**
   * Registers a new user by sending their email to the backend API.
   * Stores the received access token in local storage.
   *
   * @param email - The email address of the user to be registered.
   * @returns An observable emitting the HTTP response containing the access token.
   */
  register(email: string) {
    return this.http.post<{ accessToken: string }>(`${ this.baseUrl }`, { email }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.accessToken);
      })
    );
  }

  /**
   * Logs out the current user by removing their access token from local storage
   * and redirecting them to the login page.
   */
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']).then();
  }

  /**
   * Retrieves the stored access token from local storage.
   *
   * @returns The access token as a string or null if no token is found.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Checks if a user is currently logged in by verifying the presence of an access token.
   *
   * @returns True if an access token is stored in local storage; otherwise, false.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
