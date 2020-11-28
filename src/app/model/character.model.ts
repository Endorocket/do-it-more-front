import { GoalType } from './goal-type.enum';

export interface Character {
  name: string;
  avatar: string;
  level: number;
  progresses: Progress[];
}

export interface Progress {
  type: GoalType;
  achieved: number;
  total: number;
}
