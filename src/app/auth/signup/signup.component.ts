import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvatarService } from '../../shared/avatar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  availableAvatarsPaths: string[];

  username: FormControl;
  email: FormControl;
  password: FormControl;
  registerForm: FormGroup;
  minLength = 6;
  selectedAvatarIndex = 0;

  constructor(private authService: AuthService, private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.availableAvatarsPaths = this.avatarService.getAvailableAvatarsPaths();

    this.username = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(this.minLength)]);

    this.registerForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  onSelectAvatar(index: number): void {
    this.selectedAvatarIndex = index;
  }

  onSubmit(): void {
    this.authService.registerUser({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      avatar: this.avatarService.getAvatarNameFromPath(this.availableAvatarsPaths[this.selectedAvatarIndex])
    });
  }
}
