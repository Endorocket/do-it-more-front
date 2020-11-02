import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  oldUsername: string;
  oldEmail: string;
  newUsername: string;
  newEmail: string;
  newPassword: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.oldUsername = this.userService.getUsername();
    this.oldEmail = this.userService.getEmail();
  }

  onChangeUsername(): void {
    this.userService.setUsername(this.newUsername);
    this.oldUsername = this.newUsername;
  }

  onChangeEmail(): void {
    this.userService.setEmail(this.newEmail);
    this.oldEmail = this.newEmail;
  }

  onChangePassword(): void {
    this.userService.setPassword(this.newPassword);
  }
}
