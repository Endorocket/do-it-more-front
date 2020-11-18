import { Character } from './character.model';

export interface Friend extends Character {
  invitationStatus: InvitationStatus;
}

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED'
}
