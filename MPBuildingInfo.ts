import MPDataField from "./MPDataField";
import { MPEntityInfo } from "./MPEntityInfo";

/**
 * A collection of information about a {@link MPBuilding}.
 *
 * @export
 * @class MPBuildingInfo
 * @typedef {MPBuildingInfo}
 * @extends {MPEntityInfo}
 */
export default class MPBuildingInfo extends MPEntityInfo {
    /**
     * Creator for MPBuildingInfo, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPBuildingInfoParams} object
     * @returns {MPBuildingInfo}
     */
    public static create(object: MPBuildingInfoParams): MPBuildingInfo {
        return new MPBuildingInfo(
            object?.name,
            object?.aliases,
            object?.fields,
            object?.language,
        );
    }
}

/**
 * Parameter interface for {@link MPBuildingInfo}.
 *
 * @export
 * @interface MPBuildingInfoParams
 * @typedef {MPBuildingInfoParams}
 */
export interface MPBuildingInfoParams {
    /**
     * The name of the building.
     *
     * @type {string}
     */
    name: string, 
    /**
     * An array of aliases used by the building.
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