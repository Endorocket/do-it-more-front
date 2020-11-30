import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {
  private friendSubscription: Subscription;
  private teamSubscription: Subscription;
  numberOfInvitations: number;

  constructor(private friendsService: FriendsService) {
  }

  async ngOnInit(): Promise<void> {
    this.friendSubscription = this.friendsService.friendsChanged.subscribe(() => {
      this.numberOfInvitations = this.friendsService.getNumberOfInvitations();
    });
    this.teamSubscription = this.friendsService.incomingInvitationTeamsChanged.subscribe(() => {
      this.numberOfInvitations = this.friendsService.getNumberOfInvitations();
    });
    await this.friendsService.fetchFriendsAndTeams();
    this.numberOfInvitations = this.friendsService.getNumberOfInvitations();
  }

  ngOnDestroy(): void {
    this.friendSubscription.unsubscribe();
    this.teamSubscription.unsubscribe();
  }
}
