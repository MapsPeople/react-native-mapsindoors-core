import { Platform } from "react-native";
import { MPPoint, MPDataField, MPPointParams } from "../../index";
import { MPEntityInfo } from "./MPEntityInfo";

/**
 * Internal - Documentation will follow.
 *
 * @export
 * @class MPPropertyData
 * @typedef {MPPropertyData}
 * @extends {MPEntityInfo}
 */
export default class MPPropertyData extends MPEntityInfo {
    
    /**
     * Creates an instance of MPPropertyData.
     *
     * @constructor
     * @private
     * @param {string} name
     * @param {?string[]} [aliases]
     * @param {?Map<string, MPDataField>} [fields]
     * @param {?Map<string, string>} [categories]
     * @param {?number} [floor]
     * @param {?string} [floorName]
     * @param {?string} [building]
     * @param {?string} [venue]
     * @param {?string} [type]
     * @param {?string} [description]
     * @param {?string} [externalId]
     * @param {?number} [activeFrom]
     * @param {?number} [activeTo]
     * @param {?Map<string, MPDataField>} [contact]
     * @param {?string} [imageUrl]
     * @param {?string} [locationType]
     * @param {?boolean} [bookable]
     * @param {?MPPoint} [anchor]
     */
    private constructor(
        name: string,
        aliases?: string[],
        fields?: Map<string, MPDataField>,
        readonly categories?: Map<string, string>,
        readonly floor?: number,
        readonly floorName?: string,
        readonly building?: string,
        readonly venue?: string,
        readonly type?: string,
        readonly description?: string,
        readonly externalId?: string,
        readonly activeFrom?: number,
        readonly activeTo?: number,
        readonly contact?: Map<string, MPDataField>,
        readonly imageUrl?: string,
        readonly locationType?: string,
        readonly bookable?: boolean,
        readonly anchor?: MPPoint,
    ) { super(name, aliases, fields, undefined) }

    /**
     * Internal - Documentation will follow.
     *
     * @public
     * @static
     * @param {MPPropertyDataParams} object
     * @returns {MPPropertyData}
     */
    public static create(object: MPPropertyDataParams): MPPropertyData {
        var floor;
        if (Platform.OS === 'ios') {
            floor = object.floor as number;
        }else {
            floor = object?.floor ? parseInt(object?.floor as string) : undefined;
        }
        
        return  new MPPropertyData(
            object?.name,
            object?.aliases,
            object?.fields,
            object?.categories,
            floor,
            object?.floorName,
            object?.building,
            object?.venue,
            object?.type,
            object?.description,
            object?.externalId,
            object?.activeFrom,
            object?.activeTo,
            object?.contact,
            object?.imageUrl,
            object?.locationType,
            object?.bookable,
            MPPoint.create(object?.anchor),
        );
    }
}

/**
 * Internal - Documentation will follow.
 *
 * @export
 * @interface MPPropertyDataParams
 * @typedef {MPPropertyDataParams}
 */
export interface MPPropertyDataParams {
    /**
     * Internal - Documentation will follow.
     *
     * @type {string}
     */
    name: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string[]}
     */
    aliases?: string[],
    /**
     * Internal - Documentation will follow.
     *
     * @type {?Map<string, MPDataField>}
     */
    fields?: Map<string, MPDataField>,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?Map<string, string>}
     */
    categories?: Map<string, string>,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    floor?: string | number,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    floorName?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    building?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    venue?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    type?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    description?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    externalId?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?number}
     */
    activeFrom?: number,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?number}
     */
    activeTo?: number,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?Map<string, MPDataField>}
     */
    contact?: Map<string, MPDataField>,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    imageUrl?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?string}
     */
    locationType?: string,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?boolean}
     */
    bookable?: boolean,
    /**
     * Internal - Documentation will follow.
     *
     * @type {?MPPointParams}
     */
    anchor?: MPPointParams,
}