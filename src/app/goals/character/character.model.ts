import { GoalType } from '../model/goal-type.enum';

export interface Character {
  name: string;
  avatar: string;
  level: number;
  progresses: Progress[];
}

export interface Progress {
  type: GoalType;
  done: number;
  total: number;
}
