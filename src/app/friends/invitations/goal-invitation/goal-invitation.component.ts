import { Component, Input, OnInit } from '@angular/core';
import { GoalInvitation } from '../invitation-data.model';
import { AvatarService } from '../../../shared/avatar.service';

@Component({
  selector: 'app-goal-invitation',
  templateUrl: './goal-invitation.component.html',
  styleUrls: ['./goal-invitation.component.css']
})
export class GoalInvitationComponent implements OnInit {
  @Input() goalInvitation: GoalInvitation;
  avatarPath: string;

  constructor(private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.avatarPath = this.avatarService.getAvatarPath(this.goalInvitation.senderAvatar);
  }

}
