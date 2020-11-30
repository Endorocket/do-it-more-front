import { Injectable } from '@angular/core';
import { Goal } from '../model/goal.model';
import { GoalType } from '../model/goal-type.enum';
import { AvailableGoalsByType } from './available-goal.model';
import { Subject } from 'rxjs';
import { UserAndGoalsData } from './user-and-goals-data.model';
import { environment } from '../../environments/environment';
import { Frequency } from '../model/frequency.enum';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class GoalsService {
  private goals: Goal[] = [];
  goalsChanged = new Subject<Goal[]>();

  constructor(private http: HttpClient, private userService: UserService, private authService: AuthService) {
  }

  getGoals(): Goal[] {
    return this.goals.slice();
  }

  setGoals(goals: Goal[]): void {
    this.goals = goals;
    this.goalsChanged.next(this.goals);
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
            icon: 'fas fa-dumbbell'
          },
          {
            name: 'Rower',
            icon: 'fas fa-bicycle'
          },
          {
            name: 'Bieganie',
            icon: 'fas fa-running'
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
          }
        ]
      }
    ];
  }

  updateGoal(change: number, name: string): void {
    const updatedGoal = this.goals.find(goal => goal.name === name);
    updatedGoal.doneTimes += change;
  }

  async fetchUserAndGoalsData(): Promise<void> {
    if (this.goals.length > 0) {
      console.log('fetchUserAndGoalsData NOT FETCHED');
      this.goalsChanged.next(this.goals);
      return;
    }
    console.log('fetchUserAndGoalsData FETCHED');
    const idToken = await this.authService.getIdToken();
    this.http.get<UserAndGoalsData>(environment.apiUrl + '/user',
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      data.progress.forEach(progress => {
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
}
