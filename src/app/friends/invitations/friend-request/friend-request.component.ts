import { Component, Input, OnInit } from '@angular/core';
import { FriendRequest } from '../invitation-data.model';
import { AvatarService } from '../../../shared/avatar.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  @Input() friendRequest: FriendRequest;
  avatarPath: string;

  constructor(private avatarService: AvatarService) {
  }

  ngOnInit(): void {
    this.avatarPath = this.avatarService.getAvatarPath(this.friendRequest.senderAvatar);
  }

}
