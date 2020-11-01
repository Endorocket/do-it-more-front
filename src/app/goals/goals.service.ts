import { Injectable } from '@angular/core';
import { Goal } from '../model/goal.model';
import { Frequency } from '../model/frequency.enum';
import { GoalType } from '../model/goal-type.enum';
import { AvailableGoalsByType } from './available-goal.model';

@Injectable({providedIn: 'root'})
export class GoalsService {

  private goals: Goal[] = [
    {
      name: 'Bieganie',
      imagePath: 'fas fa-dumbbell',
      frequency: Frequency.MONTHLY,
      done: 3,
      total: 9,
      type: GoalType.PHYSICAL,
      points: 4
    },
    {
      name: 'Siłownia',
      imagePath: 'fas fa-dumbbell',
      frequency: Frequency.WEEKLY,
      done: 4,
      total: 5,
      type: GoalType.PHYSICAL,
      points: 2
    },
    {
      name: 'Fast food',
      imagePath: 'fas fa-dumbbell',
      frequency: Frequency.MONTHLY,
      done: 2,
      total: 3,
      type: GoalType.HEALTH,
      points: -5
    },
    {
      name: 'Papierosy',
      imagePath: 'fas fa-dumbbell',
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

  addGoal(goal: Goal): void {
    this.goals.push(goal);
  }

  getAvailableGoals(): AvailableGoalsByType[] {
    return [
      {
        type: GoalType.PHYSICAL,
        goals: [
          {
            name: 'Siłownia',
            imagePath: 'fas fa-dumbbell'
          },
          {
            name: 'Rower',
            imagePath: 'fas fa-dumbbell'
          }
        ]
      },
      {
        type: GoalType.MENTAL,
        goals: [
          {
            name: 'Książka',
            imagePath: 'fas fa-dumbbell'
          },
          {
            name: 'Programowanie',
            imagePath: 'fas fa-dumbbell'
          }
        ]
      },
      {
        type: GoalType.CULTURAL,
        goals: [
          {
            name: 'Poranne wstawanie',
            imagePath: 'fas fa-dumbbell'
          }
        ]
      },
      {
        type: GoalType.HEALTH,
        goals: [
          {
            name: 'Fast food',
            imagePath: 'fas fa-dumbbell'
          },
          {
            name: 'Papierosy',
            imagePath: 'fas fa-dumbbell'
          }
        ]
      }
    ];
  }
}
