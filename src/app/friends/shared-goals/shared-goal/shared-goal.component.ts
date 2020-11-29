import { Component, Input, OnInit } from '@angular/core';
import { SharedGoal } from '../shared-goal.model';
import { AvatarService } from '../../../shared/avatar.service';

@Component({
  selector: 'app-shared-goal',
  templateUrl: './shared-goal.component.html',
  styleUrls: ['./shared-goal.component.css']
})
export class SharedGoalComponent implements OnInit {
  @Input() sharedGoal: SharedGoal;

  constructor(private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.sharedGoal.members.forEach(teamMember => {
      teamMember.avatar = this.avatarService.getAvatarPath(teamMember.avatar);
    });
  }

}
