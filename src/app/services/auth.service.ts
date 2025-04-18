import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageEnum } from '../types/enums/local-storage.enum';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { User } from '../types/user';
import { UserToken } from '../types/user-token';
import { Login } from '../types/login';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange$: BehaviorSubject<boolean>;
  title: string = '';
  isAuth: boolean;
  userId: string | null;

  private refreshTokenPath = '/auth/refresh';
  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private localStorageService: LocalStorageService
  ) {
    this.authChange$ = new BehaviorSubject<boolean>(this._isAuth);
    this.isAuth = this._isAuth;
    this.userId = this._userId;
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.isAuth != this._isAuth) {
            this.markStatusChange()
          }
        }
      });
  }

  login(data: Login) {
    return this.httpClientService.postJSON<{ user: User } & UserToken>('/auth/login', { data, isLoading: true }).pipe(
      map((res: any) => {
        this.localStorageService.set(LocalStorageEnum.AccessToken, res.token);
        this.localStorageService.set(LocalStorageEnum.RefreshToken, res.refreshToken);
        this.localStorageService.set(LocalStorageEnum.UserId, res.user._id!);
        this.markStatusChange()
        return res;
      })
    );
  }

  refreshToken() {
    return this.httpClientService.postJSON<UserToken>(this.refreshTokenPath, {})
  }

  isRefreshTokenUrl(url: string) {
    return url == this.httpClientService.getUrl(this.refreshTokenPath)
  }

  logout() {
    this.localStorageService.delete(LocalStorageEnum.AccessToken);
    this.localStorageService.delete(LocalStorageEnum.RefreshToken);
    this.localStorageService.delete(LocalStorageEnum.UserId);
    this.markStatusChange();
    this.router.navigateByUrl('/login')
  }

  getProfile() {
    return this.httpClientService.getJSON<User>('/auth/profile').pipe(
      map(user => {
        return user;
      })
    )
  }

  changePassword(oldPassword: string, newPassword: string) {
    return this.httpClientService.postJSON('/auth/password', {
      data: { password: oldPassword, newPassword: newPassword },
      isAlertError: true,
      isLoading: true
    }).pipe(
      map(res => {
        return res;
      })
    )
  }

  private markStatusChange() {
    this.isAuth = this._isAuth;
    this.userId = this._userId;
    this.authChange$.next(this._isAuth);
  }

  private get _isAuth(): boolean {
    return (this.localStorageService.get(LocalStorageEnum.AccessToken) !== null || this.localStorageService.get(LocalStorageEnum.RefreshToken) !== null) ? true : false;
  }


  private get _userId(): string | null {
    return this.localStorageService.get(LocalStorageEnum.UserId);
  }
}
