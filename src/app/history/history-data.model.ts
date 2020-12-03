import { GoalType } from '../model/goal-type.enum';

export interface GoalEvent {
  events: EventData[];
  goalInfo: GoalInfo;
}

export interface EventData {
  date: string;
  parsedDate: Date;
  times: number;
}

export interface GoalInfo {
  goalId: string;
  goalName: string;
  icon: string;
  type: GoalType;
}
