import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../model/goal.model';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {
  @Input() goal: Goal;

  constructor() { }

  ngOnInit(): void {
  }

}
