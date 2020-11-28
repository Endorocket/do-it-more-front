import { Goal } from '../model/goal.model';
import { Progress } from '../model/character.model';

export interface UserAndGoalsData {
  username: string;
  avatar: string;
  level: number;
  progress: Progress[];
  goals: Goal[];
}
