import MPPoint from "./MPPoint";
import MPPolygon from "./MPPolygon";
import MPMultiPolygon from "./MPMultiPolygon";
import MPUtils from "./MPUtils";

/**
 * Superclass of all MapsIndoors geometry classes.
 *
 * @export
 * @abstract
 * @class MPGeometry
 * @typedef {MPGeometry}
 */
export default abstract class MPGeometry {
    /**
     * Typename for {@link MPPoint}.
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly point: string = "Point";
    /**
     * Typename for {@link MPPolygon}.
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly polygon: string = "Polygon";
    /**
     * Typename for {@link MPMultiPolygon}.
     *
     * @public
     * @static
     * @readonly
     * @type {string}
     */
    public static readonly multiPolygon: string = "MultiPolygon";
    /**
     * Position of geometry, used as anchor for markers.
     *
     * @public
     * @abstract
     * @readonly
     * @type {MPPoint}
     */
    public abstract readonly position: MPPoint;
    /**
     * Type of geometry, see {@link point}.
     *
     * @public
     * @abstract
     * @readonly
     * @type {string}
     */
    public abstract readonly type: string;

    /**
     * Computes the area of the geometry.
     *
     * @public
     * @abstract
     * @returns {Promise<number>}
     */
    public abstract getArea(): Promise<number>;

    /**
     * Checks whether a point is contained within the geometry.
     *
     * @public
     * @async
     * @param {MPPoint} point
     * @returns {Promise<boolean>}
     */
    public async contains(point: MPPoint): Promise<boolean> {
        return MPUtils.geometryIsInside(point, this);
    }

    /**
     * Stringifies the geometry to JSON.
     *
     * @public
     * @returns {string}
     */
    public toJson(): string {
        return JSON.stringify(this);
    }
}