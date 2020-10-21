import { Injectable } from '@angular/core';
import { Character } from './character.model';
import { GoalType } from '../model/goal-type.enum';

@Injectable({providedIn: 'root'})
export class CharacterService {
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

  getCharacter(): Character {
    return {...this.character};
  }
}
