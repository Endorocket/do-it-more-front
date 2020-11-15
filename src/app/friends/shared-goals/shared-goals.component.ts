import { Component, OnInit } from '@angular/core';
import { SharedGoal } from './shared-goal.model';
import { FriendsService } from '../friends.service';
import { NewFriendComponent } from '../friends-list/new-friend/new-friend.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InviteComponent } from './invite/invite.component';
import { GoalsService } from '../../goals/goals.service';

@Component({
  selector: 'app-shared-goals',
  templateUrl: './shared-goals.component.html',
  styleUrls: ['./shared-goals.component.css']
})
export class SharedGoalsComponent implements OnInit {
  sharedGoals: SharedGoal[];
  goals: { name: string; }[];
  friends: { name: string; }[];

  constructor(private friendsService: FriendsService, private dialog: MatDialog, private snackBar: MatSnackBar, private goalsService: GoalsService) {
  }

  ngOnInit(): void {
    this.sharedGoals = this.friendsService.getSharedGoals();
    this.goals = this.goalsService.getGoals()
      .map(goal => {
        return {
          name: goal.name
        };
      });
    this.friends = this.friendsService.getFriends()
      .map(character => {
        return {
          name: character.name
        };
      });
  }

  openInviteDialog(): void {
    const dialogRef = this.dialog.open(InviteComponent, {
      width: '400px',
      data: {
        goals: this.goals,
        friends: this.friends
      }
    });
    dialogRef.afterClosed().subscribe((result: {username: string, goalName: string}) => {
      if (result) {
        this.snackBar.open(`Wysłano zaproszenie do celu ${result.goalName} dla użytkownika ${result.username}`, null, {
          duration: 2000,
        });
      }
    });
  }
}
