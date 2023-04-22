import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private router: Router, private userService: UserService) {
  }
  authChange = new Subject<boolean>();
  private isAuthenticated = true;
  private authData: AuthData;

  static async getIdToken(): Promise<string> {
    // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
    // const session = await Auth.currentSession();
    // return session.getIdToken().getJwtToken();
    return Promise.resolve('token');
  }

  static async getUsername(): Promise<string> {
    // const userInfo = await Auth.currentUserInfo();
    // return userInfo.username;
    return Promise.resolve('Mateusz');
  }

  async login(authData: AuthData): Promise<void> {
    // try {
    //   const user = await Auth.signIn(authData.username, authData.password);
    //   console.log(user);
    //   const tokens = user.signInUserSession;
    //   if (tokens != null) {
    //     console.log('User authenticated');
    //     this.isAuthenticated = true;
    //     this.authChange.next(true);
    //     this.authData = authData;
    //     this.router.navigate(['/goals']);
    //   }
    // } catch (err) {
    //   console.log(err);
    //   alert('User Authentication failed');
    // }
    return Promise.resolve();
  }

  async logout(): Promise<void> {
    // try {
    //   await Auth.signOut();
    //   this.isAuthenticated = false;
    //   this.authChange.next(false);
    //   this.authData = null;
    //   this.router.navigate(['/login']);
    // } catch (err) {
    //   console.log('error signing out: ', err);
    // }
    return Promise.resolve();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  registerUser(authData: AuthData): void {
    // try {
    //   const user = Auth.signUp({
    //     username: authData.username,
    //     password: authData.password,
    //     attributes: {
    //       email: authData.email,
    //       'custom:avatar': authData.avatar
    //     }
    //   });
    //   console.log({user});
    //   this.router.navigate(['/login']);
    // } catch (err) {
    //   console.log('error signing up', err);
    // }
  }

  async autoLogin(): Promise<void> {
    // const idToken: string = await AuthService.getIdToken();
    // if (!idToken) {
    //   this.authChange.next(false);
    //   return;
    // }
    // console.log('User authenticated');
    // this.isAuthenticated = true;
    // this.authChange.next(true);
    //
    // const currentUserInfo = await Auth.currentUserInfo();
    // console.log(currentUserInfo);
    // this.userService.setEmail(currentUserInfo.attributes.email);
    // this.router.navigate(['/goals']);
    return Promise.resolve();
  }
}
