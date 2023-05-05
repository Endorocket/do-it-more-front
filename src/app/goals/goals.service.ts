import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { Goal } from '../model/goal.model';
import { GoalType } from '../model/goal-type.enum';
import { AvailableGoalsByType } from './available-goal.model';
import { UserAndGoalsData } from './user-and-goals-data.model';
import { Frequency } from '../model/frequency.enum';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class GoalsService {
  private goals: Goal[] = [];
  goalsChanged = new Subject<Goal[]>();

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getGoals(): Goal[] {
    return this.goals.slice();
  }

  setGoals(goals: Goal[]): void {
    this.goals = goals;
    this.goalsChanged.next(this.goals);
  }

  async addGoal(goal: Goal): Promise<void> {
    const idToken = await AuthService.getIdToken();
    const frequency = goal.frequency === Frequency.MONTHLY ? 'MONTHLY' : goal.frequency === Frequency.WEEKLY ? 'WEEKLY' : 'DAILY';
    this.http.post(environment.apiUrl + '/goals?username=endorocket',
      {
        name: goal.name,
        type: goal.type.name,
        icon: goal.icon,
        frequency,
        totalTimes: goal.totalTimes,
        points: goal.points
      },
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      this.fetchUserAndGoalsData(true);
    }, error => {
      console.log(error);
    });
  }

  getAvailableGoals(): AvailableGoalsByType[] {
    return [
      {
        type: GoalType.PHYSICAL,
        goals: [
          {
            name: 'Siłownia',
            icon: 'fas fa-dumbbell'
          },
          {
            name: 'Rower',
            icon: 'fas fa-bicycle'
          },
          {
            name: 'Bieganie',
            icon: 'fas fa-running'
          },
          {
            name: 'Pierwsze śniadanie',
            icon: 'fas fa-egg'
          }
        ]
      },
      {
        type: GoalType.MENTAL,
        goals: [
          {
            name: 'Książka',
            icon: 'fas fa-book'
          },
          {
            name: 'Programowanie',
            icon: 'fas fa-laptop-code'
          }
        ]
      },
      {
        type: GoalType.CULTURAL,
        goals: [
          {
            name: 'Poranne wstawanie',
            icon: 'fas fa-child'
          },
          {
            name: 'Modlitwa',
            icon: 'fas fa-pray'
          },
          {
            name: 'Kościół',
            icon: 'fas fa-church'
          },
          {
            name: 'Podróż',
            icon: 'fas fa-caravan'
          }
        ]
      },
      {
        type: GoalType.HEALTH,
        goals: [
          {
            name: 'Fast food',
            icon: 'fas fa-hamburger'
          },
          {
            name: 'Papierosy',
            icon: 'fas fa-smoking'
          },
          {
            name: 'Słodycze',
            icon: 'fas fa-cookie-bite'
          }
        ]
      }
    ];
  }

  async updateGoal(change: number, goalName: string): Promise<void> {
    const updatedGoal = this.goals.find(goal => goal.name === goalName);
    updatedGoal.doneTimes += change;

    const idToken = await AuthService.getIdToken();
    this.http.patch(`${environment.apiUrl}/goals/${goalName}?username=endorocket`,
      {
        times: change
      },
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
        this.fetchUserAndGoalsData(true);
    }, error => {
      console.log(error);
    });
  }

  async fetchUserAndGoalsData(forceFetch: boolean = false): Promise<void> {
    if (this.goals.length > 0 && !forceFetch) {
      console.log('fetchUserAndGoalsData NOT FETCHED');
      this.goalsChanged.next(this.goals);
      return;
    }
    console.log('fetchUserAndGoalsData FETCHED');
    const idToken = await AuthService.getIdToken();
    this.http.get<UserAndGoalsData>(environment.apiUrl + '/user?username=endorocket')
      .subscribe(data => {
      console.log(data);
      data.progress.forEach(progress => {
        console.log(progress.type);
        progress.type = GoalType.getByName(progress.type.toString());
      });
      this.userService.setCharacter({
        name: data.username,
        avatar: data.avatar,
        level: data.level,
        progresses: data.progress
      });
      data.goals.forEach(goal => {
        goal.type = GoalType.getByName(goal.type.toString());
      });
      data.goals.forEach(goal => {
        goal.frequency = Frequency[goal.frequency];
      });
      this.setGoals(data.goals);
    }, error => {
      console.log(error);
    });
  }

  async updatePeriodsAndFetchUserGoalsData(): Promise<void> {
    const idToken = await AuthService.getIdToken();
    const username = await AuthService.getUsername();

    const now = new Date();
    const updatePeriodsPattern = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const updatePeriodsKey = `updatePeriodsDate-${username}`;
    const item = localStorage.getItem(updatePeriodsKey);
    if (item !== null && item === updatePeriodsPattern) {
      console.log('Znaleziono updatePeriodsDate o wartości: ' + updatePeriodsPattern);
      await this.fetchUserAndGoalsData();
      return;
    }
    console.log('NIE znaleziono updatePeriodsDate: ' + updatePeriodsPattern);
    localStorage.setItem(updatePeriodsKey, updatePeriodsPattern);
    this.http.post(environment.apiUrl + '/periods',
      {},
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(result => {
      console.log(result);
      this.fetchUserAndGoalsData();
    }, error => {
      console.log(error);
    });
  }
}
