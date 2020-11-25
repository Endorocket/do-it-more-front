import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { Auth } from 'aws-amplify';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private authData: AuthData;

  constructor(private router: Router, private userService: UserService) {
  }

  initAuth(): void {
    this.authChange.next(false);
  }

  async login(authData: AuthData): Promise<void> {
    try {
      const user = await Auth.signIn(authData.username, authData.password);
      console.log(user);
      const tokens = user.signInUserSession;
      if (tokens != null) {
        console.log('User authenticated');
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.authData = authData;
        this.router.navigate(['/goals']);
      }
    } catch (err) {
      console.log(err);
      alert('User Authentication failed');
    }
  }

  async logout(): Promise<void> {
    try {
      await Auth.signOut();
      this.isAuthenticated = false;
      this.authChange.next(false);
      this.authData = null;
      this.router.navigate(['/login']);
    } catch (err) {
      console.log('error signing out: ', err);
    }
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  registerUser(authData: AuthData): void {
    try {
      const user = Auth.signUp({
        username: authData.username,
        password: authData.password,
        attributes: {
          email: authData.email,
          'custom:avatar': authData.avatar
        }
      });
      console.log({user});
      this.router.navigate(['/login']);
    } catch (err) {
      console.log('error signing up', err);
    }
  }
}
