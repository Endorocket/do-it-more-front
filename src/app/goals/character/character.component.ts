import { Component, OnDestroy, OnInit } from '@angular/core';
import { Character } from '../../model/character.model';
import { UserService } from '../../user/user.service';
import { AvatarService } from '../../shared/avatar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isLoading = true;
  character: Character;
  avatarPath: string;

  constructor(private userService: UserService, private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.subscription = this.userService.characterChanged
      .subscribe((character: Character) => {
        this.character = character;
        this.avatarPath = this.avatarService.getAvatarPath(this.character.avatar);
        this.isLoading = false;
      });
    this.character = this.userService.getCharacter();
    if (this.character.name) {
      this.avatarPath = this.avatarService.getAvatarPath(this.character.avatar);
      this.isLoading = false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
