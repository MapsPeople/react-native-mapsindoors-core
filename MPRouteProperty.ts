/**
 * A property of of a route.
 *
 * @export
 * @class MPRouteProperty
 * @typedef {MPRouteProperty}
 */
export default class MPRouteProperty {

    /**
     * Creates an instance of MPRouteProperty.
     *
     * @constructor
     * @private
     * @param {?string} [text]
     * @param {?number} [value]
     * @param {?string} [timeZone]
     */
    private constructor(
        public readonly value?: number,
        public readonly text?: string,
        public readonly timeZone?: string,
    ) { }

    /**
     * Creator for MPRouteProperty, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPRoutePropertyParams} object
     * @returns {MPRouteProperty}
     */
    public static create(object: MPRoutePropertyParams): MPRouteProperty {
        return new MPRouteProperty(
            object?.value,
            object?.text,
            object?.time_zone,
        );
    }


    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPRoutePropertyParams}
     */
    public toJSON(): MPRoutePropertyParams {
        return {
            value: this.value,
            text: this.text,
            time_zone: this.timeZone,
        };
    }
}

/**
 * Parameter interface for {@link MPRouteProperty}.
 *
 * @export
 * @interface MPRoutePropertyParams
 * @typedef {MPRoutePropertyParams}
 */
export interface MPRoutePropertyParams {
    /**
     * The value of the property.
     *
     * @type {?number}
     */
    value?: number,
    /**
     * Accompanying text to the value.
     *
     * @type {?string}
     */
    text?: string,
    /**
     * The timezone of the property.
     *
     * @type {?string}
     */
    time_zone?: string,
}