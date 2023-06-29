import MPRouteStep from "../../index";

/**
 * A coordinate used for routing, it is contained within a {@link MPRouteStep}.
 *
 * @export
 * @class MPRouteCoordinate
 * @typedef {MPRouteCoordinate}
 */
export default class MPRouteCoordinate {

    /**
     * Creates an instance of MPRouteCoordinate.
     *
     * @constructor
     * @private
     * @param {?number} [latitude] The latitude part of the coordinate.
     * @param {?number} [longitude] The longitude part of the coordinate.
     * @param {?number} [floorIndex] The index of the floor the coordinate is on.
     * @param {?string} [floorName] The name of the floor the coordinate is on.
     */
    private constructor(
        public readonly latitude?: number,
        public readonly longitude?: number,
        public readonly floorIndex?: number,
        public readonly floorName?: string,
    ) { }

    /**
     * Creator for MPRouteCoordinate, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPRouteCoordinateParams} object
     * @returns {MPRouteCoordinate}
     */
    public static create(object: MPRouteCoordinateParams): MPRouteCoordinate {
        return new MPRouteCoordinate(
            object?.lat,
            object?.lng,
            object?.zLevel,
            object?.floor_name,
        );
    }


    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPRouteCoordinateParams}
     */
    public toJSON(): MPRouteCoordinateParams {
        return {
            lat: this.latitude,
            lng: this.longitude,
            zLevel: this.floorIndex,
            floor_name: this.floorName,
        };
    }
}

/**
 * Parameter interface for {@link MPRouteCoordinate}.
 *
 * @export
 * @interface MPRouteCoordinateParams
 * @typedef {MPRouteCoordinateParams}
 */
export interface MPRouteCoordinateParams {
    /**
     * The latitude part of the coordinate.
     *
     * @type {?number}
     */
    lat?: number;
    /**
     * The longitude part of the coordinate.
     *
     * @type {?number}
     */
    lng?: number;
    /**
     * The index of the floor the coordinate is on.
     *
     * @type {?number}
     */
    zLevel?: number;
    /**
     * The name of the floor the coordinate is on.
     *
     * @type {?string}
     */
    floor_name?: string;
}