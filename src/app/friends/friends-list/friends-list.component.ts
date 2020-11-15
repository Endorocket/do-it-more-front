import { Component, OnInit } from '@angular/core';
import { Character } from '../../model/character.model';
import { FriendsService } from '../friends.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFriendComponent } from './new-friend/new-friend.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  friends: Character[];

  constructor(private friendsService: FriendsService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.friends = this.friendsService.getFriends();
  }

  openNewFriendDialog(): void {
    const dialogRef = this.dialog.open(NewFriendComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe((username: string) => {
      if (username) {
        this.snackBar.open('Wysłano zaproszenie do użytkownika: ' + username, null, {
          duration: 2000,
        });
      }
    });
  }
}
