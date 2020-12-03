import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from './history.service';
import { Subscription } from 'rxjs';
import { GoalEvent } from './history-data.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  eventsChangedSub: Subscription;
  goalEvents: GoalEvent[];

  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.eventsChangedSub = this.historyService.goalEventsChanged.subscribe(events => {
      this.goalEvents = this.historyService.getGoalEvents();
    });
    this.goalEvents = this.historyService.getGoalEvents();
    this.historyService.fetchGoalEvents();
  }

  ngOnDestroy(): void {
    this.eventsChangedSub.unsubscribe();
  }
}
