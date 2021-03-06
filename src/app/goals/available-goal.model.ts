import { GoalType } from '../model/goal-type.enum';

export interface AvailableGoal {
  name: string;
  icon: string;
}

export interface AvailableGoalsByType {
  type: GoalType;
  goals: AvailableGoal[];
}
