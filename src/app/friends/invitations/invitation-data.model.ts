import { Goal } from '../../model/goal.model';

export interface InvitationData {
  friendRequests: FriendRequest[];
  goalInvitations: GoalInvitation[];
}

export interface FriendRequest {
  senderName: string;
  senderAvatar: string;
}

export interface GoalInvitation extends FriendRequest {
  goal: Goal;
}
