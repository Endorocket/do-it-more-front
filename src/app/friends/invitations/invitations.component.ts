import { Component, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import { FriendRequest, GoalInvitation } from './invitation-data.model';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  friendRequests: FriendRequest[];
  goalInvitations: GoalInvitation[];

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit(): void {
    const invitationData = this.friendsService.getInvitations();
    this.friendRequests = invitationData.friendRequests;
    this.goalInvitations = invitationData.goalInvitations;
  }
}
