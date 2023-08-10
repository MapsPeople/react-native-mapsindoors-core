import MPPoint from "./MPPoint";

/**
 * A camera position object, used to move the camera to a specific position.
 *
 * @export
 * @class MPCameraPosition
 * @typedef {MPCameraPosition}
 */
export default class MPCameraPosition {


    /**
     * Creates an instance of MPCameraPosition.
     *
     * @constructor
     * @private
     * @param {number} zoom The zoom level of the camera.
     * @param {MPPoint} target The target of the camera.
     * @param {number} tilt The camera's tilt value.
     * @param {number} bearing The camera's heading.
     */
    public constructor(
        public readonly zoom: number,
        public readonly target: MPPoint,
        public readonly tilt: number,
        public readonly bearing: number,
    ) { }

    /**
     * Creator for MPBuildingCollection, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPCameraPositionParams} object
     * @returns {MPCameraPosition}
     */
    public static create(object: MPCameraPositionParams): MPCameraPosition {
        const target = object.target instanceof MPPoint ? object.target : MPPoint.create(object.target);

        return new MPCameraPosition(
            object?.zoom,
            target,
            object?.bearing ? object.bearing : 0,
            object?.tilt ? object.tilt : 0,
        );
    }
}

/**
 * Parameter interface for {@link MPCameraPosition}.
 *
 * @export
 * @interface MPCameraPositionParams
 * @typedef {MPCameraPositionParams}
 */
export interface MPCameraPositionParams {
    /**
     * The zoom level of the camera.
     *
     * @type {number}
     */
    zoom: number,
    /**
     * The target of the camera.
     *
     * @type {MPPoint}
     */
    target: MPPoint | any,
    /**
     * The camera's tilt value.
     *
     * @type {?number}
     */
    tilt?: number,
    /**
     * The camera's heading.
     *
     * @type {?number}
     */
    bearing?: number,
}
