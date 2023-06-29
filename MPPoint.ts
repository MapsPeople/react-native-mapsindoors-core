import MPGeometry from "./MPGeometry";
import MPUtils from "./MPUtils";

/**
 * MPPoint is a representation of {@link latitude} and {@link longitude} coordinates packaged with
 * a Z-axis representation in {@link floorIndex}.
 *
 * @export
 * @class MPPoint
 * @typedef {MPPoint}
 * @extends {MPGeometry}
 */
export default class MPPoint extends MPGeometry {

    /**
     * Latitude coordinate.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public readonly latitude: number;
    /**
     * Longitude coordinate.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public readonly longitude: number;
    /**
     * Optional index that defines what floor this point is placed on.
     *
     * If 0 it is placed on the ground floor, or outside.
     *
     * @public
     * @readonly
     * @type {?number}
     */
    public readonly floorIndex?: number;

    /**
     * Creates an instance of MPPoint.
     *
     * @constructor
     * @public
     * @param {number} latitude The position of the point on the latitudal axis (N/S).
     * @param {number} longitude The position of the point on the longitudal axis (E/W).
     * @param {number} [floorIndex=0] The floor index of the point, Will default to 0 if not provided.
     */
    public constructor(latitude: number, longitude: number, floorIndex: number = 0) {
        super();
        this.latitude = latitude;
        this.longitude = longitude;
        this.floorIndex = floorIndex;
    }

    /**
     * Creator for MPPoint, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPPointParams} pointParams
     * @returns {MPPoint}
     */
    public static create(pointParams: MPPointParams): MPPoint | undefined {
        if (pointParams?.coordinates) {
            return new MPPoint(pointParams.coordinates[1], pointParams.coordinates[0], pointParams.coordinates[2]);
        } else if (pointParams as unknown as number[]){
            const pp = pointParams as unknown as number[]
            return new MPPoint(pp[1], pp[0], pp[2]);
        }else {
            return null;
        }
    }

    /**
     * Calculates the angle between this point and another [MPPoint] in degrees from north.
     *
     * @public
     * @async
     * @param {MPPoint} other
     * @returns {Promise<number>}
     */
    public async angleBetween(other: MPPoint): Promise<number> {
        return MPUtils.pointAngleBetween(this, other);
    }

    /**
     * Calculates the shortest distance to another point from this point.
     *
     * @public
     * @async
     * @param {MPPoint} other
     * @returns {Promise<number>}
     */
    public async distanceTo(other: MPPoint): Promise<number> {
        return MPUtils.pointDistanceTo(this, other);
    }

    /**
     * {@link MPGeometry} override, returns this object.
     *
     * @public
     * @readonly
     * @type {MPPoint}
     */
    public get position(): MPPoint {
        return this;
    }

    /**
     * Get the type of the point. see {@link MPGeometry#point}.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get type(): string {
        return MPGeometry.point;
    }

    /**
     * {@link MPGeometry} override, resolves to a non-zero value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getArea(): Promise<number> {
        return Promise.resolve(0.5);
    }


    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPPointParams}
     */
    public toJSON(): MPPointParams {
        return {
            coordinates: [this.longitude, this.latitude, this.floorIndex ?? 0],
        };
    }
}

/**
 * Parameter interface for {@link MPPoint}.
 *
 * @export
 * @interface MPPointParams
 * @typedef {MPPointParams}
 */
export interface MPPointParams {
    /**
     * Coordinate holder for point, on the form:.
     *
     * [LNG, LAT, FLOOR]
     *
     * @type {number[]}
     */
    coordinates: number[],
}
