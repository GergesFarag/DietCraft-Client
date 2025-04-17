import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forwardRef, Inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoSchema } from '../models/UserInfoSchema';
import { IUser } from '../models/IUser';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { IUserVM } from '../vms/Iuser.vm';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string = environment.apiUrl;
  userSignal:WritableSignal<IUserVM>;
  loggingOutSignal:WritableSignal<boolean> = signal(false);
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private _authService: AuthService,
  ) {
    this.userSignal = signal(JSON.parse(localStorage.getItem('user') || '{}') as IUserVM);
  }

  setCookie(title: string, token: string): void {
    this.cookieService.set(title, token);
  }

  getCookie(title: string): string {
    return this.cookieService.get(title);
  }
  setUserInLS(user: IUserVM): void {
    if(this.getCookie('accessToken')) {
      localStorage.setItem('user', JSON.stringify(user));
      this.userSignal.set(user);
    } 
  }
  signUp(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, user)
  }

  login(user: IUser): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.baseUrl}/user/login`, user).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(
          () =>
            new Error(
              error.error.message || 'Login failed ! Please try again later.'
            )
        );
      })
    );
  }

  // getRefreshToken(): Observable<any> {
  //   const token = this.getCookie('accessToken');
  //   console.log(token);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });
  //   return this.http.get(`${this.baseUrl}/user/refresh`, { headers }).pipe(
  //     catchError((error) => {
  //       return throwError(
  //         () =>
  //           new Error(
  //             error.error.message ||
  //               'Refreshing your session token failed ! Please login again.'
  //           )
  //       );
  //     })
  //   );
  // }

  logout(user: IUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/logout`, user).pipe(
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error.error?.message || 'Logout failed ! Please try again later.'
            )
        );
      })
    );
  }

  addUserInfo(userInfo: UserInfoSchema): Observable<any> {
    const token = this._authService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post(`${this.baseUrl}/user/info`, userInfo, { headers })
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                error?.message ||
                  'Adding your information failed ! Please try again.'
              )
          );
        })
      );
  }
  getUserInfo(): Observable<any> {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/user/info`, { headers }).pipe(
      map((res) => {
        return res;
      }),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              error?.message ||
                'Fetching your information failed ! Please try again.'
            )
        );
      })
    );
  }
  updateUserInfo(userInfo: UserInfoSchema): Observable<any> {
    const token = this._authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .patch(`${this.baseUrl}/user/info`, userInfo, { headers })
      .pipe(
        catchError((error) => {
          return throwError(
            () =>
              new Error(
                error?.message ||
                  'Updating your information failed ! Please try again.'
              )
          );
        })
      );
    }
}
