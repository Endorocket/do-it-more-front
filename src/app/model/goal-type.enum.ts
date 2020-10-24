// export enum GoalType {
//   HEALTH = 'HEALTH',
//   PHYSICAL = 'PHYSICAL',
//   MENTAL = 'MENTAL',
//   CULTURAL = 'CULTURAL'
// }

export class GoalType {
  static readonly HEALTH = new GoalType('HEALTH', '/assets/images/heart.png');
  static readonly PHYSICAL = new GoalType('PHYSICAL', '/assets/images/strength.png');
  static readonly MENTAL = new GoalType('MENTAL', '/assets/images/brain.png');
  static readonly CULTURAL = new GoalType('CULTURAL', '/assets/images/meditation.png');

  private constructor(private readonly name: string, public readonly iconPath: string) {
  }

  toString(): string {
    return this.name;
  }
}
