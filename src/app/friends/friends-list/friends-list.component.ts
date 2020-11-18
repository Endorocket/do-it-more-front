import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFriendComponent } from './new-friend/new-friend.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Friend, InvitationStatus } from '../../model/friend.model';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  acceptedFriends: Friend[];
  pendingFriends: Friend[];

  constructor(private friendsService: FriendsService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const allFriends = this.friendsService.getFriends();
    this.acceptedFriends = allFriends.filter(friend => friend.invitationStatus === InvitationStatus.ACCEPTED);
    this.pendingFriends = allFriends.filter(friend => friend.invitationStatus === InvitationStatus.PENDING);
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
