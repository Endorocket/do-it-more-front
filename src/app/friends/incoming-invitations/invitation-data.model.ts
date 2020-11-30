import { Goal } from '../../model/goal.model';

export interface FriendRequest {
  senderName: string;
  senderAvatar: string;
}

export interface GoalInvitation extends FriendRequest {
  teamId: string;
  goal: Goal;
}
