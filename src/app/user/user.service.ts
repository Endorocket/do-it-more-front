import { Injectable } from '@angular/core';
import { Character } from '../model/character.model';
import { GoalType } from '../model/goal-type.enum';

@Injectable({providedIn: 'root'})
export class UserService {

  private character: Character = {
    name: 'Endorocket',
    avatar: 'avatar',
    level: 2,
    progresses: [
      {
        type: GoalType.HEALTH,
        done: 20,
        total: 30
      },
      {
        type: GoalType.PHYSICAL,
        done: 10,
        total: 30
      },
      {
        type: GoalType.MENTAL,
        done: 5,
        total: 30
      },
      {
        type: GoalType.CULTURAL,
        done: 25,
        total: 30
      }
    ]
  };

  private email: string;

  getCharacter(): Character {
    return {...this.character};
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
}
