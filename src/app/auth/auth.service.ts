import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private authData: AuthData;

  constructor(private router: Router) {
  }

  initAuth(): void {
    this.authChange.next(false);
  }

  login(authData: AuthData): void {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.authData = authData;
    this.router.navigate(['/goals']);
  }

  logout(): void {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.authData = null;
    this.router.navigate(['/login']);
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
