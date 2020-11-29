import { Frequency } from '../../model/frequency.enum';
import { GoalType } from '../../model/goal-type.enum';

export interface SharedGoal {
  id: string;
  goal: TeamGoal;
  members: TeamMember[];
}

export interface TeamGoal {
  name: string;
  icon: string;
  type: GoalType;
  frequency: Frequency;
}

export interface TeamMember {
  name: string;
  avatar: string;
  status: string;
  doneTimes?: number;
  totalTimes?: number;
}
