import { Injectable } from '@angular/core';
import { Character } from '../model/character.model';
import { GoalType } from '../model/goal-type.enum';
import { SharedGoal } from './shared-goals/shared-goal.model';
import { Frequency } from '../model/frequency.enum';
import { Player } from './shared-goals/player.model';
import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class FriendsService {

  constructor(private userService: UserService) {
  }

  private friends: Character[] = [
    {
      name: 'Mateusz',
      avatar: 'fox',
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
      name: 'Bartek',
      avatar: 'pig',
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
      name: 'Natalia',
      avatar: 'koala',
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
      name: 'Dominik',
      avatar: 'hippopotamus',
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
      name: 'Dominika',
      avatar: 'chick',
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

  getFriends(): Character[] {
    return this.friends.slice();
  }

  getSharedGoals(): SharedGoal[] {
    const me: Player = {
      name: this.userService.getUsername(),
      avatar: this.userService.getAvatar(),
      donePoints: 2
    };

    const sharedGoals: SharedGoal[] = [
      {
        goal: {
          name: 'Bieganie',
          icon: 'fas fa-running',
          frequency: Frequency.MONTHLY,
          total: 9,
          type: GoalType.PHYSICAL,
          points: 4
        },
        players: [
          {...me},
          {
            name: 'Wiktoria',
            avatar: 'whale',
            donePoints: 3
          }
        ]
      },
      {
        goal: {
          name: 'Siłownia',
          icon: 'fas fa-dumbbell',
          frequency: Frequency.WEEKLY,
          total: 5,
          type: GoalType.PHYSICAL,
          points: 2
        },
        players: [
          {...me},
          {
            name: 'Dominik',
            avatar: 'zebra',
            donePoints: 3
          }
        ]
      },
      {
        goal: {
          name: 'Fast food',
          icon: 'fas fa-hamburger',
          frequency: Frequency.MONTHLY,
          total: 3,
          type: GoalType.HEALTH,
          points: -5
        },
        players: [
          {...me},
          {
            name: 'Wiktoria',
            avatar: 'crab',
            donePoints: 3
          }
        ]
      },
      {
        goal: {
          name: 'Papierosy',
          icon: 'fas fa-smoking',
          frequency: Frequency.DAILY,
          total: 4,
          type: GoalType.HEALTH,
          points: -2
        },
        players: [
          {...me},
          {
            name: 'Dominika',
            avatar: 'lemur',
            donePoints: 3
          }
        ]
      }
    ];

    return sharedGoals.slice();
  }
}
