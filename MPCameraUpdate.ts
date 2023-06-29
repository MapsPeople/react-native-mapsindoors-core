import MPBounds from "./MPBounds";
import MPCameraPosition from "./MPCameraPosition";
import MPPoint from "./MPPoint";
import MPSize from "./MPSize"

/**
 * An object that can be used to update the position of the camera by calling {@link MapControl.animateCamera()}.
 *
 * @export
 * @class MPCameraUpdate
 * @typedef {MPCameraUpdate}
 */
export default class MPCameraUpdate {
    /**
     * The mode of the update, used internally.
     *
     * @public
     * @readonly
     * @type {!Mode}
     */
    public readonly mode!: Mode;
    /**
     * The target of the camera update.
     *
     * @public
     * @readonly
     * @type {?MPPoint}
     */
    public readonly point?: MPPoint;
    /**
     * An area the camera must cover.
     *
     * @public
     * @readonly
     * @type {?MPBounds}
     */
    public readonly bounds?: MPBounds;
    /**
     * The padding between the border of the targeted area and the edge of the map.
     *
     * @public
     * @readonly
     * @type {?number}
     */
    public readonly padding?: number;
    /**
     * Specified width of the {@link padding}.
     *
     * @public
     * @readonly
     * @type {?number}
     */
    public readonly width?: number;
    /**
    * Specified height of the {@link padding}.
     *
     * @public
     * @readonly
     * @type {?number}
     */
    public readonly height?: number;
    /**
     * The camera level of the update.
     *
     * @public
     * @readonly
     * @type {?number}
     */
    public readonly zoom?: number;
    /**
     * A specific camera position.
     *
     * @public
     * @readonly
     * @type {?MPCameraPosition}
     */
    public readonly position?: MPCameraPosition;


    /**
     * Creates an instance of MPCameraUpdate.
     *
     * @constructor
     * @private
     * @param {Mode} mode
     * @param {*} obj
     */
    private constructor(mode: Mode, obj: any) {
        this.mode = mode;
        this.point = obj.point;
        this.bounds = obj.bounds;
        this.padding = obj.padding;
        this.width = obj.width;
        this.height = obj.height;
        this.zoom = obj.zoom;
        this.position = obj.position;
    }

    /**
     * Construct the update from a point.
     *
     * @public
     * @static
     * @param {MPPoint} point
     * @returns {MPCameraUpdate}
     */
    public static fromPoint(point: MPPoint): MPCameraUpdate {
        return new MPCameraUpdate(Mode.fromPoint, { point: point });
    }

    /**
     * Construct the update from a bounding box with some padding.
     *
     * @public
     * @static
     * @param {MPBounds} bounds
     * @param {number} padding
     * @param {?MPSize} [size] Can be used to set a specific width/height padding
     * @returns {MPCameraUpdate}
     */
    public static fromBounds(bounds: MPBounds, padding: number, size?: MPSize): MPCameraUpdate {
        return new MPCameraUpdate(Mode.fromBounds, { bounds: bounds, padding: padding, height: size?.height, width: size?.width });
    }

    /**
     * Zooms the camera by the given amount.
     *
     * @public
     * @static
     * @param {number} amount
     * @returns {MPCameraUpdate}
     */
    public static zoomBy(amount: number): MPCameraUpdate {
        return new MPCameraUpdate(Mode.zoomBy, { zoom: amount });
    }

    /**
     * Zooms the camera to the given level.
     *
     * @public
     * @static
     * @param {number} level
     * @returns {MPCameraUpdate}
     */
    public static zoomTo(level: number): MPCameraUpdate {
        return new MPCameraUpdate(Mode.zoomTo, { zoom: level });
    }

    /**
     * Constructs the update from the given position.
     *
     * @public
     * @static
     * @param {MPCameraPosition} position
     * @returns {MPCameraUpdate}
     */
    public static fromCameraPosition(position: MPCameraPosition): MPCameraUpdate {
        return new MPCameraUpdate(Mode.fromCameraPosition, { position: position });
    }

}

/**
 * Internal.
 *
 * @enum {number}
 */
enum Mode {
    fromPoint = "fromPoint",
    fromBounds = "fromBounds",
    zoomBy = "zoomBy",
    zoomTo = "zoomTo",
    fromCameraPosition = "fromCameraPosition",
}
