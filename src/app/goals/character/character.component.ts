import { Component, OnInit } from '@angular/core';
import { Character } from '../../model/character.model';
import { UserService } from '../../user/user.service';
import { AvatarService } from '../../shared/avatar.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: Character;
  avatarPath: string;

  constructor(private userService: UserService, private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.character = this.userService.getCharacter();
    this.avatarPath = this.avatarService.getAvatarPath(this.character.avatar);
  }
}
