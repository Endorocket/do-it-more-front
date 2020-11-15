import { Frequency } from './frequency.enum';
import { GoalType } from './goal-type.enum';

export interface Goal {
  name: string;
  icon: string;
  frequency: Frequency;
  done?: number;
  total: number;
  type: GoalType;
  points: number;
}
