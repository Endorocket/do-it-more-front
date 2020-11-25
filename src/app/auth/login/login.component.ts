import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  minLength = 6;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.username = new FormControl(null, [Validators.required]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(this.minLength)]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });
  }

  onSubmit(): void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    });
  }
}
