import { Component, OnInit } from '@angular/core';
import { SharedGoal } from './shared-goal.model';
import { FriendsService } from '../friends.service';

@Component({
  selector: 'app-shared-goals',
  templateUrl: './shared-goals.component.html',
  styleUrls: ['./shared-goals.component.css']
})
export class SharedGoalsComponent implements OnInit {
  sharedGoals: SharedGoal[];

  constructor(private friendsService: FriendsService) {
  }

  ngOnInit(): void {
    this.sharedGoals = this.friendsService.getSharedGoals();
  }

}
