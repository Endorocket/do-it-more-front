import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Goal } from '../../../model/goal.model';
import { GoalsService } from '../../goals.service';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-goal-detail',
  templateUrl: './goal-detail.component.html',
  styleUrls: ['./goal-detail.component.css']
})
export class GoalDetailComponent implements OnInit {
  change = 0;
  points = 0;

  constructor(public dialogRef: MatDialogRef<GoalDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public goal: Goal,
              private goalsService: GoalsService,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateDone(incr: boolean): void {
    if (incr) {
      this.change++;
      this.points += this.goal.points;
    } else {
      this.change--;
      this.points -= this.goal.points;
    }
  }

  onConfirmClick(): void {
    this.goalsService.updateGoal(this.change, this.goal.name);
    // this.userService.updatePoints(this.points, this.goal.type);
  }
}
