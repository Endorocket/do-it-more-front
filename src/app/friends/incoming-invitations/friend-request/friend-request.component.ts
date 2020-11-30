import { Component, Input, OnInit } from '@angular/core';
import { FriendRequest } from '../invitation-data.model';
import { AvatarService } from '../../../shared/avatar.service';
import { FriendsService } from '../../friends.service';
import { InvitationResponse } from '../../friend.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  @Input() friendRequest: FriendRequest;
  avatarPath: string;

  constructor(private avatarService: AvatarService, private friendsService: FriendsService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.avatarPath = this.avatarService.getAvatarPath(this.friendRequest.senderAvatar);
  }

  onReject(): void {
    const subscription = this.friendsService.respondToFriendInvitationCompleted.subscribe((success: boolean) => {
      if (success) {
        this.snackBar.open('Odrzucono zaproszenie', null, {duration: 2000});
      } else {
        this.snackBar.open('Wystąpił błąd', null, {duration: 2000});
      }
      subscription.unsubscribe();
    });
    this.friendsService.respondToFriendInvitation(this.friendRequest.senderName, InvitationResponse.REJECT);
  }

  onAccept(): void {
    const subscription = this.friendsService.respondToFriendInvitationCompleted.subscribe((success: boolean) => {
      if (success) {
        this.snackBar.open('Zaakceptowano zaproszenie', null, {duration: 2000});
      } else {
        this.snackBar.open('Wystąpił błąd', null, {duration: 2000});
      }
      subscription.unsubscribe();
    });
    this.friendsService.respondToFriendInvitation(this.friendRequest.senderName, InvitationResponse.ACCEPT);
  }
}
