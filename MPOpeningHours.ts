import { MPWeeklyOpeningHours } from './MPWeeklyOpeningHours';

/**
 * Represents the opening hours for a location.
 */
export class MPOpeningHours {
  /**
   * The standard opening hours for the location.
   */
  private _standardOpeningHours: MPWeeklyOpeningHours | null = null;

  /**
   * Gets the standard opening hours for the location.
   */
  get standardOpeningHours(): MPWeeklyOpeningHours | null {
    return this._standardOpeningHours;
  }

  /**
   * Creates an instance of MPOpeningHours from a JSON object.
   */
  static fromJson(json: any): MPOpeningHours {
    const openingHours = new MPOpeningHours();
    openingHours._standardOpeningHours = json.standardOpeningHours || null;
    return openingHours;
  }

  /**
   * Converts the instance to a JSON object.
   * This is useful for serialization.
   */
  toJson(): any {
    return {
      standardOpeningHours: this._standardOpeningHours,
    };
  }

  /**
   * Returns a string representation of the opening hours.
   * @returns String representation of the standard opening hours or a default message
   */
  toString(): string {
    if (this._standardOpeningHours && typeof this._standardOpeningHours.toString === 'function') {
      return this._standardOpeningHours.toString();
    }
    return "No standard opening hours available";
  }
}
