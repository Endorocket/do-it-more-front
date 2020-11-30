import { Component, Input, OnInit } from '@angular/core';
import { MemberStatus, SharedGoal, TeamMember } from '../shared-goal.model';
import { AvatarService } from '../../../shared/avatar.service';

@Component({
  selector: 'app-shared-goal',
  templateUrl: './shared-goal.component.html',
  styleUrls: ['./shared-goal.component.css']
})
export class SharedGoalComponent implements OnInit {
  @Input() sharedGoal: SharedGoal;
  @Input() accepted: boolean;
  invitedMembers: TeamMember[];
  avatarPathByUsername = new Map<string, string>();

  constructor(private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.sharedGoal.members.forEach(teamMember => {
      this.avatarPathByUsername.set(teamMember.name, this.avatarService.getAvatarPath(teamMember.avatar));
    });
    if (!this.accepted) {
      this.invitedMembers = this.sharedGoal.members.filter(member => member.status === MemberStatus.INVITED);
    }
  }
}
