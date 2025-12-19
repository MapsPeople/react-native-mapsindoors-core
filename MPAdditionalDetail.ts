import { MPDetailType } from './MPDetailType';
import { MPOpeningHours } from './MPOpeningHours';

/**
 * Represents additional details associated with a MapIndoors entity, such as a location or a point of interest.
 * This class contains various fields that provide information about the additional details.
 */
export class MPAdditionalDetail {
  /**
   * The type of detail, e.g. "phone", "email", "website", etc.
   */
  private _detailType: MPDetailType | null = null;

  /**
   * The key for the additional detail, which is typically a string identifier.
   */
  private _key: string | null = null;

  /**
   * The value of the additional detail, which can be a string representing
   */
  private _value: string | null = null;

  /**
   * The icon associated with the additional detail, which is a URL.
   */
  private _icon: string | null = null;

  /**
   * The display text for the additional detail, which is a localized user-friendly string.
   */
  private _displayText: string | null = null;

  /**
   * Indicates whether the additional detail is active or not.
   */
  private _active: boolean | null = null;

  /**
   * The opening hours associated with the additional detail, represented by an MPOpeningHours object.
   */
  private _openingHours: MPOpeningHours | null = null;
  
  get detailType(): MPDetailType | null {
    return this._detailType;
  }

  get key(): string | null {
    return this._key;
  }

  get value(): string | null {
    return this._value;
  }

  get icon(): string | null {
    return this._icon;
  }

  get displayText(): string | null {
    return this._displayText;
  }

  get active(): boolean | null {
    return this._active;
  }

  get openingHours(): MPOpeningHours | null {
    return this._openingHours;
  }

  /**
   * Creates an instance of MPAdditionalDetail from a JSON object.
   */
  static fromJson(json: any): MPAdditionalDetail {
    const detail = new MPAdditionalDetail();
    detail._detailType = json.detailType || null;
    detail._key = json.key || null;
    detail._value = json.value || null;
    detail._icon = json.icon || null;
    detail._displayText = json.displayText || null;
    detail._active = json.active || null;
    detail._openingHours = json.openingHours || null;
    return detail;
  }

  /**
   * Converts the instance to a JSON object.
   * This is useful for serialization.
   */
  toJson(): any {
    return {
      detailType: this._detailType,
      key: this._key,
      value: this._value,
      icon: this._icon,
      displayText: this._displayText,
      active: this._active,
      openingHours: this._openingHours,
    };
  }
}
