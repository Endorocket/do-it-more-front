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

  email: FormControl;
  password: FormControl;
  registerForm: FormGroup;
  minLength = 6;
  selectedAvatarIndex = 0;

  constructor(private authService: AuthService, private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.availableAvatarsPaths = this.avatarService.getAvailableAvatarsPaths();

    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.password = new FormControl(null, [Validators.required, Validators.minLength(this.minLength)]);

    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSelectAvatar(index: number): void {
    this.selectedAvatarIndex = index;
  }

  onSubmit(): void {
    this.authService.registerUser({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      avatar: this.avatarService.getAvatarNameFromPath(this.availableAvatarsPaths[this.selectedAvatarIndex])
    });
  }
}
