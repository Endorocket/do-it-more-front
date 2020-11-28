import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvailableGoal, AvailableGoalsByType } from '../available-goal.model';
import { GoalsService } from '../goals.service';
import { Frequency } from '../../model/frequency.enum';
import { GoalType } from '../../model/goal-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  availableGoalsByTypes: AvailableGoalsByType[];
  frequencyOptions = Object.values(Frequency);
  categoryOptions: GoalType[] = GoalType.values();
  pointsOptions: number[] = [1, 2, 3, 5];

  constructor(private goalsService: GoalsService, private router: Router) {
  }

  ngOnInit(): void {
    this.availableGoalsByTypes = this.goalsService.getAvailableGoals();

    this.firstFormGroup = new FormGroup({
      goalName: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required)
    });
    this.secondFormGroup = new FormGroup({
      frequencyNumber: new FormControl('', Validators.required),
      frequencyType: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required)
    });
  }

  onSelectGoal(availableGoal: AvailableGoal, type: GoalType): void {
    this.firstFormGroup.controls.goalName.setValue(availableGoal.name);
    this.firstFormGroup.controls.imagePath.setValue(availableGoal.icon);
    this.secondFormGroup.controls.category.setValue(type);
  }

  onSubmit(): void {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);

    this.goalsService.addGoal({
      name: this.firstFormGroup.value.goalName,
      icon: this.firstFormGroup.value.imagePath,
      frequency: this.secondFormGroup.value.frequencyType,
      doneTimes: 0,
      totalTimes: this.secondFormGroup.value.frequencyNumber,
      type: this.secondFormGroup.value.category,
      points: this.secondFormGroup.value.points
    });

    this.router.navigate(['/goals']);
  }
}
