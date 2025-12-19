/**
 * Represents the opening hours for a single day.
 * Contains information about whether the location is closed all day or the specific opening and closing times.
 */
export class MPDailyOpeningHours {
  /**
   * Indicates whether the location is closed all day.
   */
  private _closedAllDay: boolean | null = null;

  /**
   * The start time for the opening hours (e.g., "09:00").
   */
  private _startTime: string | null = null;

  /**
   * The end time for the opening hours (e.g., "17:00").
   */
  private _endTime: string | null = null;
  
  get closedAllDay(): boolean | null {
    return this._closedAllDay;
  }

  get startTime(): string | null {
    return this._startTime;
  }

  get endTime(): string | null {
    return this._endTime;
  }

  /**
   * Creates an instance of MPDailyOpeningHours from a JSON object.
   */
  static fromJson(json: any): MPDailyOpeningHours {
    const dailyHours = new MPDailyOpeningHours();
    dailyHours._closedAllDay = json.closedAllDay !== undefined ? json.closedAllDay : null;
    dailyHours._startTime = json.startTime || null;
    dailyHours._endTime = json.endTime || null;
    return dailyHours;
  }

  /**
   * Converts the instance to a JSON object.
   * This is useful for serialization.
   */
  toJson(): any {
    return {
      closedAllDay: this._closedAllDay,
      startTime: this._startTime,
      endTime: this._endTime,
    };
  }

  /**
   * Returns a string representation of the daily opening hours.
   * @returns String representation showing either "Closed all day" or the opening times
   */
  toString(): string {
    if (this._closedAllDay === true) {
      return "Closed all day";
    } else {
      return `Open from ${this._startTime} to ${this._endTime}`;
    }
  }
}
