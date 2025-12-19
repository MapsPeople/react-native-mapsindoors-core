/**
 * Enum representing different types of additional details for MapIndoors entities.
 */
export enum MPDetailType {
  Text = "text",
  Phone = "phone",
  URL = "url", 
  Email = "email",
  OpeningHours = "openinghours"
}

/**
 * Utility functions for MPDetailType enum.
 */
export namespace MPDetailType {
  /**
   * Converts a string value to the corresponding MPDetailType enum value.
   * @param value The string value to convert
   * @returns The corresponding MPDetailType or null if no match is found
   */
  export function fromString(value: string | null | undefined): MPDetailType | null {
    if (!value) {
      return null;
    }
    
    switch (value.toLowerCase()) {
      case "text":
        return MPDetailType.Text;
      case "phone":
        return MPDetailType.Phone;
      case "url":
        return MPDetailType.URL;
      case "email":
        return MPDetailType.Email;
      case "openinghours":
        return MPDetailType.OpeningHours;
      default:
        return null;
    }
  }

  /**
   * Converts an MPDetailType enum value to its string representation.
   * @param detailType The enum value to convert
   * @returns The string representation of the enum value
   */
  export function toString(detailType: MPDetailType): string {
    return detailType.valueOf();
  }

  /**
   * Gets all possible MPDetailType values.
   * @returns Array of all MPDetailType enum values
   */
  export function getAllValues(): MPDetailType[] {
    return [
      MPDetailType.Text,
      MPDetailType.Phone,
      MPDetailType.URL,
      MPDetailType.Email,
      MPDetailType.OpeningHours
    ];
  }

  /**
   * Checks if a string value is a valid MPDetailType.
   * @param value The string value to check
   * @returns True if the value corresponds to a valid MPDetailType, false otherwise
   */
  export function isValid(value: string | null | undefined): boolean {
    return fromString(value) !== null;
  }
}
