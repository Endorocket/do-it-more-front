import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  registerForm: FormGroup;
  minLength = 6;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(this.minLength)]);

    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit(): void {
    this.authService.registerUser({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    });
  }
}
