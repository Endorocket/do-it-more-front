import { Injectable } from '@angular/core';
import { Character } from '../model/character.model';
import { GoalType } from '../model/goal-type.enum';
import { SharedGoal } from './shared-goals/shared-goal.model';
import { Frequency } from '../model/frequency.enum';

@Injectable({providedIn: 'root'})
export class FriendsService {
  private friends: Character[] = [
    {
      name: 'Endorocket',
      avatar: 'avatar',
      level: 2,
      progresses: [
        {
          type: GoalType.HEALTH,
          done: 20,
          total: 30
        },
        {
          type: GoalType.PHYSICAL,
          done: 10,
          total: 30
        },
        {
          type: GoalType.MENTAL,
          done: 5,
          total: 30
        },
        {
          type: GoalType.CULTURAL,
          done: 25,
          total: 30
        }
      ]
    },
    {
      name: 'Endorocket',
      avatar: 'avatar',
      level: 2,
      progresses: [
        {
          type: GoalType.HEALTH,
          done: 20,
          total: 30
        },
        {
          type: GoalType.PHYSICAL,
          done: 10,
          total: 30
        },
        {
          type: GoalType.MENTAL,
          done: 5,
          total: 30
        },
        {
          type: GoalType.CULTURAL,
          done: 25,
          total: 30
        }
      ]
    },
    {
      name: 'Endorocket',
      avatar: 'avatar',
      level: 2,
      progresses: [
        {
          type: GoalType.HEALTH,
          done: 20,
          total: 30
        },
        {
          type: GoalType.PHYSICAL,
          done: 10,
          total: 30
        },
        {
          type: GoalType.MENTAL,
          done: 5,
          total: 30
        },
        {
          type: GoalType.CULTURAL,
          done: 25,
          total: 30
        }
      ]
    },
    {
      name: 'Endorocket',
      avatar: 'avatar',
      level: 2,
      progresses: [
        {
          type: GoalType.HEALTH,
          done: 20,
          total: 30
        },
        {
          type: GoalType.PHYSICAL,
          done: 10,
          total: 30
        },
        {
          type: GoalType.MENTAL,
          done: 5,
          total: 30
        },
        {
          type: GoalType.CULTURAL,
          done: 25,
          total: 30
        }
      ]
    },
    {
      name: 'Endorocket',
      avatar: 'avatar',
      level: 2,
      progresses: [
        {
          type: GoalType.HEALTH,
          done: 20,
          total: 30
        },
        {
          type: GoalType.PHYSICAL,
          done: 10,
          total: 30
        },
        {
          type: GoalType.MENTAL,
          done: 5,
          total: 30
        },
        {
          type: GoalType.CULTURAL,
          done: 25,
          total: 30
        }
      ]
    }
  ];

  private sharedGoals: SharedGoal[] = [
    {
      goal: {
        name: 'Bieganie',
        frequency: Frequency.MONTHLY,
        total: 9,
        type: GoalType.PHYSICAL,
        points: 4
      },
      players: [
        {
          name: 'Endorocket',
          donePoints: 2
        },
        {
          name: 'Wiktoria',
          donePoints: 3
        }
      ]
    },
    {
      goal: {
        name: 'Siłownia',
        frequency: Frequency.WEEKLY,
        total: 5,
        type: GoalType.PHYSICAL,
        points: 2
      },
      players: [
        {
          name: 'Endorocket',
          donePoints: 2
        },
        {
          name: 'Wiktoria',
          donePoints: 3
        }
      ]
    },
    {
      goal: {
        name: 'Fast food',
        frequency: Frequency.MONTHLY,
        total: 3,
        type: GoalType.HEALTH,
        points: -5
      },
      players: [
        {
          name: 'Endorocket',
          donePoints: 2
        },
        {
          name: 'Wiktoria',
          donePoints: 3
        }
      ]
    },
    {
      goal: {
        name: 'Papierosy',
        frequency: Frequency.DAILY,
        total: 4,
        type: GoalType.HEALTH,
        points: -2
      },
      players: [
        {
          name: 'Endorocket',
          donePoints: 2
        },
        {
          name: 'Wiktoria',
          donePoints: 3
        }
      ]
    }
  ];

  getFriends(): Character[] {
    return this.friends.slice();
  }

  getSharedGoals(): SharedGoal[] {
    return this.sharedGoals.slice();
  }
}
