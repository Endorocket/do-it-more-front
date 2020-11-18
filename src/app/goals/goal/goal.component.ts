import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../../model/goal.model';
import { MatDialog } from '@angular/material/dialog';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  @Input() goal: Goal;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onShowGoalDetailsDialog(): void {
    const dialogRef = this.dialog.open(GoalDetailComponent, {
      width: '400px',
      data: this.goal
    });
    dialogRef.afterClosed().subscribe((change: number) => {
      if (change) {
        this.snackBar.open(`Wykonałeś cel ${ change } ${ change === 1 ? 'raz' : 'razy' }`, null, {
          duration: 2000,
        });
      }
    });
  }
}
