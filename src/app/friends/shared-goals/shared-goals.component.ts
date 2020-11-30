import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedGoal } from './shared-goal.model';
import { FriendsService } from '../friends.service';
import { MatDialog } from '@angular/material/dialog';
import { InviteComponent } from './invite/invite.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shared-goals',
  templateUrl: './shared-goals.component.html',
  styleUrls: ['./shared-goals.component.css']
})
export class SharedGoalsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  acceptedTeams: SharedGoal[];
  sentInvitationTeams: SharedGoal[];

  constructor(private friendsService: FriendsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
    this.subscription = this.friendsService.teamsChanged.subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    this.acceptedTeams = this.friendsService.getAcceptedTeams();
    this.sentInvitationTeams = this.friendsService.getSentInvitationTeams();
  }

  openInviteDialog(): void {
    this.dialog.open(InviteComponent, {width: '400px'});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
