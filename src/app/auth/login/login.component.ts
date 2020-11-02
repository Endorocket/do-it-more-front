import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;
  minLength = 6;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(this.minLength)]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
