import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { EventData, GoalEvent } from './history-data.model';
import { GoalType } from '../model/goal-type.enum';

@Injectable({providedIn: 'root'})
export class HistoryService {

  goalEvents: GoalEvent[] = [];

  historyFetched = false;

  goalEventsChanged = new Subject<void>();

  constructor(private http: HttpClient) {
  }

  getGoalEvents(): GoalEvent[] {
    return this.goalEvents;
  }

  async fetchGoalEvents(forceFetch: boolean = false): Promise<void> {
    if (this.historyFetched && !forceFetch) {
      console.log('History already fetched!');
      return;
    }
    console.log('Fetching history ...');
    const idToken = await AuthService.getIdToken();
    this.http.get<GoalEvent[]>(`${environment.apiUrl}/goal-events`,
      {
        headers: {
          Authorization: idToken
        }
      }).subscribe(data => {
      console.log(data);
      const parsedGoalEvents = data.map(goalEvent => {
        const eventData = goalEvent.events.map(event => {
          const strings = event.date.split('-');
          return {
            date: event.date,
            parsedDate: new Date(+strings[0], +strings[1], +strings[2]),
            times: event.times
          } as EventData;
        });
        goalEvent.goalInfo.type = GoalType.getByName(goalEvent.goalInfo.type.toString());
        return {
          events: eventData,
          goalInfo: goalEvent.goalInfo
        } as GoalEvent;
      });
      console.log(parsedGoalEvents);
      this.goalEvents = parsedGoalEvents;
      this.historyFetched = true;
      this.goalEventsChanged.next();
    }, error => {
      console.log(error);
    });
  }
}
