import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FriendsService } from '../friends.service';
import { FriendRequest, GoalInvitation } from './invitation-data.model';
import { InvitationStatus } from '../friend.model';
import { MemberStatus } from '../shared-goals/shared-goal.model';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit, OnDestroy {
  private friendSubscription: Subscription;
  private teamSubscription: Subscription;
  friendRequests: FriendRequest[] = [];
  goalInvitations: GoalInvitation[] = [];

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit(): void {
    this.loadFriendRequests();
    this.friendSubscription = this.friendsService.friendsChanged.subscribe(() => {
      this.loadFriendRequests();
    });

    this.loadTeamRequests();
    this.teamSubscription = this.friendsService.incomingInvitationTeamsChanged.subscribe(() => {
      this.loadTeamRequests();
    });
  }

  private loadFriendRequests(): void {
    this.friendRequests = this.friendsService.getFriendsByStatus(InvitationStatus.INVITING)
      .map(friend => {
        return {
          senderName: friend.username,
          senderAvatar: friend.avatar
        };
      });
  }

  private loadTeamRequests(): void {
    console.log(this.friendsService.getIncomingInvitationTeams());
    console.log(this.friendsService.getAcceptedTeams());
    console.log(this.friendsService.getSentInvitationTeams());
    this.goalInvitations = this.friendsService.getIncomingInvitationTeams()
      .map(team => {
        const sender = team.members.filter(member => member.status === MemberStatus.MEMBER)[0];
        return {
          teamId: team.id,
          senderName: sender.name,
          senderAvatar: sender.avatar,
          goal: {
            name: team.goal.name,
            icon: team.goal.icon,
            frequency: team.goal.frequency,
            doneTimes: sender.doneTimes,
            totalTimes: sender.totalTimes,
            type: team.goal.type,
            points: 0
          }
        };
      });
    console.log(this.goalInvitations);
  }

  ngOnDestroy(): void {
    this.friendSubscription.unsubscribe();
    this.teamSubscription.unsubscribe();
  }
}
