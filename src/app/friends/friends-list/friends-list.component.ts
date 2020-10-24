import { Component, OnInit } from '@angular/core';
import { Character } from '../../model/character.model';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  friends: Character[];

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit(): void {
    this.friends = this.friendsService.getFriends();
  }

}
