import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../friends.service';
import { MatDialog } from '@angular/material/dialog';
import { NewFriendComponent } from './new-friend/new-friend.component';
import { Friend, InvitationStatus } from '../friend.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  acceptedFriends: Friend[];
  pendingFriends: Friend[];

  constructor(private friendsService: FriendsService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadData();
    this.subscription = this.friendsService.friendsChanged.subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    this.acceptedFriends = this.friendsService.getFriendsByStatus(InvitationStatus.ACCEPTED);
    this.pendingFriends = this.friendsService.getFriendsByStatus(InvitationStatus.INVITED);
  }

  openNewFriendDialog(): void {
    this.dialog.open(NewFriendComponent, {
      width: '400px'
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
