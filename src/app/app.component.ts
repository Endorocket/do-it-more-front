import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    registerLocaleData(localePl);
    await this.authService.autoLogin();
  }
}
