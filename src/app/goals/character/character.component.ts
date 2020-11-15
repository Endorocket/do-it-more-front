import { Component, OnInit } from '@angular/core';
import { Character } from '../../model/character.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: Character;
  avatarPath: string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.character = this.userService.getCharacter();
    this.avatarPath = `/assets/images/avatars/${this.character.avatar}.svg`;
  }
}
