import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FriendsService } from '../../friends.service';

@Component({
  selector: 'app-new-friend',
  templateUrl: './new-friend.component.html',
  styleUrls: ['./new-friend.component.css']
})
export class NewFriendComponent implements OnInit {
  username: string;

  constructor(public dialogRef: MatDialogRef<NewFriendComponent>,
              private friendsService: FriendsService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddFriend(): void {
    this.friendsService.addFriend(this.username);
  }
}
