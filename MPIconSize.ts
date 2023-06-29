import MPSize from "./MPSize";

/**
 * Class to hold height and width information for an icon.
 *
 * @export
 * @class MPIconSize
 * @typedef {MPIconSize}
 * @implements {MPSize}
 */
export default class MPIconSize implements MPSize {
    /**
     * Creates an instance of MPIconSize.
     *
     * @constructor
     * @private
     * @param {number} height The height measure.
     * @param {number} width The width measure.
     */
    private constructor(
        public readonly height: number,
        public readonly width: number
    ) { }

    /**
     * Creator for MPIconSize, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPSize} object
     * @returns {MPIconSize}
     */
    public static create(object: MPSize): MPIconSize {
        return new MPIconSize(
            object?.height,
            object?.width,
        );
    }
}