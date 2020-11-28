import { Component, OnDestroy, OnInit } from '@angular/core';
import { GoalsService } from './goals.service';
import { Goal } from '../model/goal.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit, OnDestroy {
  isLoading = true;
  goals: Goal[];
  private subscription: Subscription;

  constructor(private goalsService: GoalsService) {
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.subscription = this.goalsService.goalsChanged
      .subscribe((goals: Goal[]) => {
          this.goals = goals;
        }
      );
    await this.goalsService.fetchUserAndGoalsData();
    // this.goals = this.goalsService.getGoals();
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
