import { forwardRef, inject, Inject, Injectable, Injector, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { IUserVM } from '../vms/Iuser.vm';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  private baseUrl = environment.apiUrl;
  private isRefreshing = false;
  private accessTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {
    const storedToken = this.cookieService.get('accessToken') || null;
    this.accessTokenSubject.next(storedToken);
  }

  // ✅ Get token from cookies
  getToken(): string | null {
    return this.cookieService.get('accessToken') || null;
  }

  // ✅ Store token in cookies and update BehaviorSubject
  setToken(token: string): void {
    if (!token) return; // Prevent saving empty tokens

    this.cookieService.set('accessToken', token, {
      path: '/',
      secure: true,
      sameSite: 'Strict',
      expires: 1, // **Sets expiration (1 day), adjust as needed**
    });

    this.accessTokenSubject.next(token); // **Notify observers**
  }

  // ✅ Remove token from cookies and BehaviorSubject
  logout(): void {
    this.cookieService.delete('accessToken', '/');
    this.cookieService.delete('refreshToken', '/');
    this.accessTokenSubject.next(null);
    localStorage.removeItem('user'); // **Clear user data from local storage**
    this.router.navigate(['/home']);
  }

  // ✅ Refresh Token when expired
  refreshToken(): Observable<string> {
    if (this.isRefreshing) {
      return this.accessTokenSubject.pipe(
        filter((token) => token !== null), // ✅ Ensure it only emits non-null values
        take(1)
      ) as Observable<string>;
    }

    this.isRefreshing = true;

    return this.http
      .get<any>(`${this.baseUrl}/user/refresh`, { withCredentials: true })
      .pipe(
        switchMap((response) => {
          if (response?.data.accessToken) {
            console.log(response);

            this.setToken(response.data.accessToken); // ✅ Store updated token
            this.isRefreshing = false;
            return new BehaviorSubject(
              response.data.accessToken
            ).asObservable(); // ✅ Ensures it's always string
          } else {
            this.isRefreshing = false;
            return throwError(() => new Error('No token received')); // ✅ Prevent null from propagating
          }
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.logout(); // ✅ Logout if refresh fails
          return throwError(() => error);
        })
      );
  }

  // ✅ Get access token as an observable
  getAccessTokenObservable(): Observable<string | null> {
    return this.accessTokenSubject.asObservable();
  }

  // ✅ Observable for authentication status
  getAuthStatus(): Observable<boolean> {
    return this.accessTokenSubject.pipe(map((token) => !!token));
  }
}
