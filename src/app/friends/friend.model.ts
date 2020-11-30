import { Progress } from '../model/character.model';
import { SharedGoal } from './shared-goals/shared-goal.model';

export interface Friend {
  username: string;
  avatar: string;
  status: InvitationStatus;
  level: number;
  progress: Progress[];
}

export enum InvitationStatus {
  INVITING = 'INVITING',
  INVITED = 'INVITED',
  ACCEPTED = 'ACCEPTED'
}

export interface FriendsAndTeamsData {
  friends: Friend[];
  teams: SharedGoal[];
}

export enum InvitationResponse {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT'
}
