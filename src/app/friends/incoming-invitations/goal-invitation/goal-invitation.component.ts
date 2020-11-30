import { Component, Input, OnInit } from '@angular/core';
import { GoalInvitation } from '../invitation-data.model';
import { AvatarService } from '../../../shared/avatar.service';
import { FriendsService } from '../../friends.service';
import { InvitationResponse } from '../../friend.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goal-invitation',
  templateUrl: './goal-invitation.component.html',
  styleUrls: ['./goal-invitation.component.css']
})
export class GoalInvitationComponent implements OnInit {
  @Input() goalInvitation: GoalInvitation;
  avatarPath: string;

  constructor(private avatarService: AvatarService, private friendsService: FriendsService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.avatarPath = this.avatarService.getAvatarPath(this.goalInvitation.senderAvatar);
  }

  onReject(): void {
    const subscription = this.friendsService.respondToTeamInvitationCompleted.subscribe((success: boolean) => {
      if (success) {
        this.snackBar.open('Odrzucono zaproszenie', null, {duration: 2000});
      } else {
        this.snackBar.open('Wystąpił błąd', null, {duration: 2000});
      }
      subscription.unsubscribe();
    });
    this.friendsService.respondToTeamInvitation(this.goalInvitation.teamId, InvitationResponse.REJECT);
  }

  onAccept(): void {
    const subscription = this.friendsService.respondToTeamInvitationCompleted.subscribe((success: boolean) => {
      if (success) {
        this.snackBar.open(`Zaakceptowano zaproszenie do celu ${ this.goalInvitation.goal.name }`, null, {duration: 2000});
      } else {
        this.snackBar.open('Wystąpił błąd', null, {duration: 2000});
      }
      subscription.unsubscribe();
    });
    this.friendsService.respondToTeamInvitation(this.goalInvitation.teamId, InvitationResponse.ACCEPT);
  }
}
