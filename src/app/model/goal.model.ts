import { Frequency } from './frequency.enum';
import { GoalType } from './goal-type.enum';

export interface Goal {
  id?: string;
  name: string;
  icon: string;
  frequency: Frequency;
  doneTimes?: number;
  totalTimes: number;
  type: GoalType;
  points: number;
}
