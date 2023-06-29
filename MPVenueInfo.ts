import MPDataField from "./MPDataField";
import { MPEntityInfo } from "./MPEntityInfo";

/**
 * Description placeholder.
 *
 * @export
 * @class MPVenueInfo
 * @typedef {MPVenueInfo}
 * @extends {MPEntityInfo}
 */
export default class MPVenueInfo extends MPEntityInfo {
    /**
     * Creator for MPVenueInfo, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {MPVenueInfoParams} object
     * @returns {MPVenueInfo}
     */
    static create(object: MPVenueInfoParams): MPVenueInfo {
        return new MPVenueInfo(
            object?.name,
            object?.aliases,
            object?.fields,
            object?.language,
        );
    }
}

/**
 * Parameter interface for {@link MPVenueInfo}.
 *
 * @export
 * @interface MPVenueInfoParams
 * @typedef {MPVenueInfoParams}
 */
export interface MPVenueInfoParams {
    /**
     * The name of the venue.
     *
     * @type {string}
     */
    name: string, 
    /**
     * An array of aliases used by the venue.
     *
     * @type {?string[]}
     */
    aliases?: string[], 
    /**
     * A number of data fields on the venue.
     *
     * @type {?Map<string, MPDataField>}
     */
    fields?: Map<string, MPDataField>, 
    /**
     * The language the venue currently uses.
     *
     * @type {?string}
     */
    language?: string,
}