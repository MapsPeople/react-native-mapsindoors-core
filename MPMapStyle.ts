import MPVenue from "./MPVenue";

/**
 * A tileset used by a specific {@link MPVenue}.
 *
 * @export
 * @class MPMapStyle
 * @typedef {MPMapStyle}
 */
export default class MPMapStyle {
    /**
     * Creates an instance of MPMapStyle.
     *
     * @constructor
     * @private
     * @param {string} folder The folder the style is saved in.
     * @param {string} displayName The name of the style.
     */
    private constructor(
        public readonly folder: string,
        public readonly displayName: string
    ) { }

    /**
     * Creator for MPMapStyle, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPMapStyleParams} object
     * @returns {MPMapStyle}
     */
    public static create(object: MPMapStyleParams): MPMapStyle {
        return new MPMapStyle(object?.folder, object?.displayName);
    }
}

/**
 * Parameter interface for {@link MPMapStyle}.
 *
 * @export
 * @interface MPMapStyleParams
 * @typedef {MPMapStyleParams}
 */
export interface MPMapStyleParams {
    /**
     * The folder the style is saved in.
     *
     * @type {string}
     */
    folder: string,
    /**
     * The name of the style.
     *
     * @type {string}
     */
    displayName: string,
}