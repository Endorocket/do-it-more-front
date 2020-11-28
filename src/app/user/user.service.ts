import { Injectable } from '@angular/core';
import { Character } from '../model/character.model';
import { GoalType } from '../model/goal-type.enum';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {

  private character: Character = null;
  characterChanged = new Subject<Character>();

  private email: string;

  getCharacter(): Character {
    return {...this.character};
  }

  setCharacter(character: Character): void {
    this.character = character;
    this.characterChanged.next(character);
  }

  getUsername(): string {
    return this.character.name;
  }

  setUsername(username: string): void {
    this.character.name = username;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    console.log('Password updated');
  }

  getAvatar(): string {
    return this.character.avatar;
  }

  setAvatar(avatar: string): void {
    this.character.avatar = avatar;
  }

  updatePoints(changePoints: number, goalType: GoalType): void {
    const changedProgress = this.character.progresses.find(progress => progress.type === goalType);
    changedProgress.achieved += changePoints;
    if (changePoints > 0 && changedProgress.achieved > changedProgress.total) {
      changedProgress.achieved = changedProgress.achieved - changedProgress.total;
      this.character.level++;
    } else if (changePoints < 0 && changedProgress.achieved < 0) {
      changedProgress.achieved = changedProgress.total - changedProgress.achieved;
      this.character.level--;
    }
    if (this.character.level <= 0) {
      this.character.level = 1;
    }
  }
}
