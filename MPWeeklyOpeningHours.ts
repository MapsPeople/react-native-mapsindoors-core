import { MPDailyOpeningHours } from './MPDailyOpeningHours';

/**
 * Represents the opening hours for a week, with each day having its own set of opening hours.
 * This class is used to define the opening hours for a business or location, detailing the hours for each day of the week.
 * Each day is represented by an instance of MPDailyOpeningHours, which contains the specific opening and closing times for that day.
 */
export class MPWeeklyOpeningHours {
  /**
   * Opening hours for Monday.
   */
  private _monday: MPDailyOpeningHours | null = null;

  /**
   * Opening hours for Tuesday.
   */
  private _tuesday: MPDailyOpeningHours | null = null;

  /**
   * Opening hours for Wednesday.
   */
  private _wednesday: MPDailyOpeningHours | null = null;

  /**
   * Opening hours for Thursday.
   */
  private _thursday: MPDailyOpeningHours | null = null;

  /**
   * Opening hours for Friday.
   */
  private _friday: MPDailyOpeningHours | null = null;

  /**
   * Opening hours for Saturday.
   */
  private _saturday: MPDailyOpeningHours | null = null;

  /**
   * Opening hours for Sunday.
   */
  private _sunday: MPDailyOpeningHours | null = null;
  
  get monday(): MPDailyOpeningHours | null {
    return this._monday;
  }

  get tuesday(): MPDailyOpeningHours | null {
    return this._tuesday;
  }

  get wednesday(): MPDailyOpeningHours | null {
    return this._wednesday;
  }

  get thursday(): MPDailyOpeningHours | null {
    return this._thursday;
  }

  get friday(): MPDailyOpeningHours | null {
    return this._friday;
  }

  get saturday(): MPDailyOpeningHours | null {
    return this._saturday;
  }

  get sunday(): MPDailyOpeningHours | null {
    return this._sunday;
  }

  /**
   * Creates an instance of MPWeeklyOpeningHours from a JSON object.
   */
  static fromJson(json: any): MPWeeklyOpeningHours {
    const weeklyHours = new MPWeeklyOpeningHours();
    weeklyHours._monday = json.monday || null;
    weeklyHours._tuesday = json.tuesday || null;
    weeklyHours._wednesday = json.wednesday || null;
    weeklyHours._thursday = json.thursday || null;
    weeklyHours._friday = json.friday || null;
    weeklyHours._saturday = json.saturday || null;
    weeklyHours._sunday = json.sunday || null;
    return weeklyHours;
  }

  /**
   * Converts the instance to a JSON object.
   * This is useful for serialization.
   */
  toJson(): any {
    return {
      monday: this._monday,
      tuesday: this._tuesday,
      wednesday: this._wednesday,
      thursday: this._thursday,
      friday: this._friday,
      saturday: this._saturday,
      sunday: this._sunday,
    };
  }

  /**
   * Helper method to safely convert a daily opening hours object to string.
   */
  private dayToString(day: MPDailyOpeningHours | null): string {
    if (day && typeof day.toString === 'function') {
      return day.toString();
    }
    return 'null';
  }

  /**
   * Returns a string representation of the weekly opening hours.
   * @returns String representation showing all days of the week
   */
  toString(): string {
    let out = "WeeklyOpeningHours: { ";
    out += `${this.dayToString(this._monday)}, `;
    out += `${this.dayToString(this._tuesday)}, `;
    out += `${this.dayToString(this._wednesday)}, `;
    out += `${this.dayToString(this._thursday)}, `;
    out += `${this.dayToString(this._friday)}, `;
    out += `${this.dayToString(this._saturday)}, `;
    out += `${this.dayToString(this._sunday)} `;
    out += "}";
    return out;
  }
}
