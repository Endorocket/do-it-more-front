import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { AvatarService } from '../shared/avatar.service';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('usernameMep', {static: true}) usernameMep: MatExpansionPanel;
  @ViewChild('passwordMep', {static: true}) passwordMep: MatExpansionPanel;
  @ViewChild('emailMep', {static: true}) emailMep: MatExpansionPanel;
  @ViewChild('avatarMep', {static: true}) avatarMep: MatExpansionPanel;

  avatarPath: string;
  oldUsername: string;
  oldEmail: string;
  newUsername: string;
  newEmail: string;
  newPassword: string;
  availableAvatarsPaths: string[];
  selectedAvatarIndex: number = null;

  constructor(private userService: UserService, private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.oldUsername = this.userService.getUsername();
    this.oldEmail = this.userService.getEmail();
    const avatarName = this.userService.getAvatar();
    this.avatarPath = this.avatarService.getAvatarPath(avatarName);
    this.availableAvatarsPaths = this.avatarService.getAvailableAvatarsPaths();
  }

  onChangeUsername(): void {
    this.userService.setUsername(this.newUsername);
    this.oldUsername = this.newUsername;
    this.usernameMep.expanded = false;
  }

  onChangeEmail(): void {
    this.userService.setEmail(this.newEmail);
    this.oldEmail = this.newEmail;
    this.emailMep.expanded = false;
  }

  onChangePassword(): void {
    this.userService.setPassword(this.newPassword);
    this.passwordMep.expanded = false;
  }

  onChangeAvatar(): void {
    this.avatarPath = this.availableAvatarsPaths[this.selectedAvatarIndex];
    this.userService.setAvatar(this.avatarService.getAvatarNameFromPath(this.avatarPath));
    this.avatarMep.expanded = false;
    this.selectedAvatarIndex = null;
  }

  onSelectAvatar(index: number): void {
    this.selectedAvatarIndex = index;
  }
}
