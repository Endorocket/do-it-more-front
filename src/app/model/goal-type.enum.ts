export class GoalType {
  static readonly HEALTH = new GoalType('HEALTH', '/assets/images/categories/heart.png');
  static readonly PHYSICAL = new GoalType('PHYSICAL', '/assets/images/categories/strength.png');
  static readonly MENTAL = new GoalType('MENTAL', '/assets/images/categories/brain.png');
  static readonly CULTURAL = new GoalType('CULTURAL', '/assets/images/categories/meditation.png');

  private constructor(public readonly name: string, public readonly iconPath: string) {
  }

  static values(): GoalType[] {
    return [GoalType.HEALTH, GoalType.PHYSICAL, GoalType.MENTAL, GoalType.CULTURAL];
  }

  toString(): string {
    return this.name;
  }
}
