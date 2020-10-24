import { Goal } from '../../model/goal.model';
import { Player } from './player.model';

export interface SharedGoal {
  goal: Goal;
  players: Player[];
}
