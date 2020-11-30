import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NewFriendComponent } from '../../friends-list/new-friend/new-friend.component';
import { FriendsService } from '../../friends.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoalsService } from '../../../goals/goals.service';
import { InvitationStatus } from '../../friend.model';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  goals: { id: string; name: string; }[];
  friends: { name: string; }[];

  username: string;
  goalId: string;

  constructor(public dialogRef: MatDialogRef<NewFriendComponent>,
              private snackBar: MatSnackBar,
              private friendsService: FriendsService,
              private goalsService: GoalsService) {
  }

  ngOnInit(): void {
    const alreadySharedGoalNames = this.friendsService.getSharedGoalNames();
    this.goals = this.goalsService.getGoals()
      .map(goal => {
        return {
          id: goal.id,
          name: goal.name
        };
      })
      .filter(goal => alreadySharedGoalNames.filter(name => name === goal.name).length === 0);
    this.friends = this.friendsService.getFriendsByStatus(InvitationStatus.ACCEPTED)
      .map(character => {
        return {
          name: character.username
        };
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onInvite(): Promise<void> {
    const subscription = this.friendsService.inviteToSharedGoalCompleted.subscribe((success: boolean) => {
      if (success) {
        console.log('Zaproszono znajomego do celu');
        this.snackBar.open(`Wysłano zaproszenie do celu dla użytkownika ${ this.username }`, null, {
          duration: 2000,
        });
        this.dialogRef.close();
      } else {
        console.log('Nie istnieje taki użytkownik');
        this.snackBar.open(`Wystąpił błąd w trakcie wysyłania zaproszenia`, null, {
          duration: 2000,
        });
      }
      subscription.unsubscribe();
    });
    this.dialogRef.close();
    await this.friendsService.inviteToSharedGoal(this.goalId, this.username);
  }
}
