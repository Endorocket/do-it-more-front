import { Component, Input, OnInit } from '@angular/core';
import { AvatarService } from '../../../shared/avatar.service';
import { Friend } from '../../../model/friend.model';

@Component({
  selector: 'app-friends-item',
  templateUrl: './friends-item.component.html',
  styleUrls: ['./friends-item.component.css']
})
export class FriendsItemComponent implements OnInit {
  @Input() friend: Friend;
  avatarPath: string;

  constructor(private avatarService: AvatarService) { }

  ngOnInit(): void {
    this.avatarPath = this.avatarService.getAvatarPath(this.friend.avatar);
  }
}
