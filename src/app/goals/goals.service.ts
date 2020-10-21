import { Injectable } from '@angular/core';
import { Goal } from './model/goal.model';
import { Frequency } from './model/frequency.enum';
import { GoalType } from './model/goal-type.enum';

@Injectable({providedIn: 'root'})
export class GoalsService {

  private goals: Goal[] = [
    {
      name: 'Bieganie',
      frequency: Frequency.MONTHLY,
      done: 3,
      total: 9,
      type: GoalType.PHYSICAL,
      points: 4
    },
    {
      name: 'Siłownia',
      frequency: Frequency.WEEKLY,
      done: 4,
      total: 5,
      type: GoalType.PHYSICAL,
      points: 2
    },
    {
      name: 'Fast food',
      frequency: Frequency.MONTHLY,
      done: 2,
      total: 3,
      type: GoalType.HEALTH,
      points: -5
    },
    {
      name: 'Papierosy',
      frequency: Frequency.DAILY,
      done: 2,
      total: 4,
      type: GoalType.HEALTH,
      points: -2
    }
  ];

  getGoals(): Goal[] {
    return this.goals.slice();
  }
}
