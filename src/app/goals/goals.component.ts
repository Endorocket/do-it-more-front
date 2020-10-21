import { Component, OnInit } from '@angular/core';
import { GoalsService } from './goals.service';
import { Goal } from './model/goal.model';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  goals: Goal[];

  constructor(private goalsService: GoalsService) {
  }

  ngOnInit(): void {
    this.goals = this.goalsService.getGoals();
  }

}
