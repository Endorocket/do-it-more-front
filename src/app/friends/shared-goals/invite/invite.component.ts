import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewFriendComponent } from '../../friends-list/new-friend/new-friend.component';
import { FriendsService } from '../../friends.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  username: string;
  goalName: string;

  constructor(public dialogRef: MatDialogRef<NewFriendComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { goals: { name: string; }[], friends: { name: string; }[] },
              private friendsService: FriendsService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onInvite(): void {
    this.friendsService.inviteToSharedGoal(this.goalName, this.username);
  }
}
