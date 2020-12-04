import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';

import { HistoryService } from './history.service';
import { GoalEvent } from './history-data.model';
import { GoalType } from '../model/goal-type.enum';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: 'rgba(173,33,33,0.3)',
  },
  blue: {
    primary: '#3d8cd9',
    secondary: 'rgba(61,140,217,0.3)',
  },
  pink: {
    primary: '#dc82e3',
    secondary: 'rgba(220,130,227,0.3)',
  },
  orange: {
    primary: '#e36e4f',
    secondary: 'rgba(227,110,79,0.3)',
  },
};


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoryComponent implements OnInit, OnDestroy {

  viewDate: Date = new Date();
  calendarEvents: CalendarEvent[] = [];
  activeDayIsOpen = true;
  locale = 'pl';

  eventsChangedSub: Subscription;

  constructor(private historyService: HistoryService) {
  }

  private static chooseColor(type: GoalType): { secondary: string; primary: string } {
    if (type === GoalType.HEALTH) {
      return colors.red;
    } else if (type === GoalType.PHYSICAL) {
      return colors.blue;
    } else if (type === GoalType.MENTAL) {
      return colors.pink;
    } else {
      return colors.orange;
    }
  }

  ngOnInit(): void {
    this.eventsChangedSub = this.historyService.goalEventsChanged.subscribe(() => {
      this.setEvents(this.historyService.getGoalEvents());
    });
    this.setEvents(this.historyService.getGoalEvents());
    this.historyService.fetchGoalEvents();
  }

  setEvents(goalEvents: GoalEvent[]): void {
    const calendarEvents: CalendarEvent[] = [];
    for (const goalEvent of goalEvents) {
      const goalInfo = goalEvent.goalInfo;
      for (const event of goalEvent.events) {
        calendarEvents.push({
          title: `<div class="event-details-times">${event.times}x</div> <div class="event-details-goal-name">${goalInfo.goalName}</div> <i class="${goalInfo.icon}"></i>`,
          color: HistoryComponent.chooseColor(goalInfo.type),
          start: event.parsedDate,
          cssClass: 'event-details',
        });
      }
    }
    console.log(calendarEvents);
    this.calendarEvents = calendarEvents;
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }

  }

  ngOnDestroy(): void {
    this.eventsChangedSub.unsubscribe();
  }
}
