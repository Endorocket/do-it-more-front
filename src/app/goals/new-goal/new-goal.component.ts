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
    this.availableGoalsByTypes = this.goalsService.getAvailableGoals()
      .map(availableByType => {
        return {
          type: availableByType.type,
          goals: availableByType.goals.filter(availableGoal => this.goalsService.getGoals().filter(myGoal => myGoal.name === availableGoal.name).length === 0)
        };
      });

    this.firstFormGroup = new FormGroup({
      goalName: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required)
    });
    this.secondFormGroup = new FormGroup({
      frequencyNumber: new FormControl('', [Validators.required, Validators.min(1)]),
      frequencyType: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      points: new FormControl('', Validators.required)
    });
  }

  onSelectGoal(availableGoal: AvailableGoal, type: GoalType): void {
    this.firstFormGroup.controls.goalName.setValue(availableGoal.name);
    this.firstFormGroup.controls.imagePath.setValue(availableGoal.icon);
    this.secondFormGroup.controls.category.setValue(type);
    if (type === GoalType.HEALTH) {
      this.pointsOptions = [-1, -2, -3, -5];
    } else {
      this.pointsOptions = [1, 2, 3, 5];
    }
  }

  async onSubmit(): Promise<void> {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);

    await this.goalsService.addGoal({
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

  getTypeName(goalType: GoalType): string {
    switch (goalType) {
      case GoalType.HEALTH:
        return 'Negatywne nawyki';
      case GoalType.PHYSICAL:
        return 'Fizyczne';
      case GoalType.MENTAL:
        return 'Aktywność umysłowa';
      case GoalType.CULTURAL:
        return 'Kulturowe';
    }
  }
}
