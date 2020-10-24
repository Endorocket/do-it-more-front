import { Component, Input, OnInit } from '@angular/core';
import { SharedGoal } from '../shared-goal.model';

@Component({
  selector: 'app-shared-goal',
  templateUrl: './shared-goal.component.html',
  styleUrls: ['./shared-goal.component.css']
})
export class SharedGoalComponent implements OnInit {
  @Input() sharedGoal: SharedGoal;

  constructor() { }

  ngOnInit(): void {
  }

}
