import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../../model/character.model';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.css']
})
export class FriendsItemComponent implements OnInit {
  @Input() friend: Character;

  constructor() { }

  ngOnInit(): void {
  }

}
