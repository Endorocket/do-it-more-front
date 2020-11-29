import { Component, OnInit } from '@angular/core';
import { FriendsService } from './friends.service';
import { InvitationData } from './invitations/invitation-data.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  invitationData: InvitationData;
  numberOfInvitations: number;

  constructor(private friendsService: FriendsService) {
  }

  async ngOnInit(): Promise<void> {
    await this.friendsService.fetchFriendsAndTeams();
    this.invitationData = this.friendsService.getInvitations();
    this.numberOfInvitations = this.friendsService.getNumberOfInvitations();
  }
}
