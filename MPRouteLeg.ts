import { MPRouteStep, MPRouteProperty, MPRoutePropertyParams, MPRouteCoordinate, MPRouteCoordinateParams, MPRoute } from "../../index";

/**
 * A leg of a {@link MPRoute} is defined as all steps between any context shifts (entering/exiting buildings, changing floors).
 * 
 * A leg is comprised of a list of {@link steps} as well as a {@link startLocation} and an {@link endLocation}.
 *
 * @export
 * @class MPRouteLeg
 * @typedef {MPRouteLeg}
 */
export default class MPRouteLeg {

    /**
     * Creates an instance of MPRouteLeg.
     *
     * @constructor
     * @private
     * @param {?MPRouteStep[]} [steps] The steps the leg consists of.
     * @param {?MPRouteProperty} [distance] The distance of the leg.
     * @param {?MPRouteProperty} [duration] The expected time it takes to traverse the leg.
     * @param {?string} [startAddress] The address at the start of the leg.
     * @param {?string} [endAdress] The address at the end of the leg.
     * @param {?MPRouteCoordinate} [startLocation] The start coordinate of the leg.
     * @param {?MPRouteCoordinate} [endLocation] The end coordinate of the leg.
     */
    private constructor(
        public readonly steps?: MPRouteStep[],
        public readonly distance?: MPRouteProperty,
        public readonly duration?: MPRouteProperty,
        public readonly startAddress?: string,
        public readonly endAdress?: string,
        public readonly startLocation?: MPRouteCoordinate,
        public readonly endLocation?: MPRouteCoordinate,
    ) { }


    /**
     * Creator for MPRouteLeg, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPRouteLegParams} object
     * @returns {MPRouteLeg}
     */
    public static create(object: MPRouteLegParams): MPRouteLeg {
        return new MPRouteLeg(
            object?.steps ? object?.steps.map((step: any) => MPRouteStep.create(step)) : undefined,
            MPRouteProperty.create(object?.distance as MPRoutePropertyParams),
            MPRouteProperty.create(object?.duration as MPRoutePropertyParams),
            object?.start_address,
            object?.end_address,
            MPRouteCoordinate.create(object?.start_location as MPRouteCoordinateParams),
            MPRouteCoordinate.create(object?.end_location as MPRouteCoordinateParams),
        );
    }


    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPRouteLegParams}
     */
    public toJSON(): MPRouteLegParams {
        return {
            start_address: this.startAddress,
            end_address: this.endAdress,
            start_location: this.startLocation,
            end_location: this.endLocation,
            steps: this.steps,
            distance: this.distance,
            duration: this.duration,
        };
    }
}

/**
 * Parameter interface for {@link MPRouteLeg}.
 *
 * @export
 * @interface MPRouteLegParams
 * @typedef {MPRouteLegParams}
 */
export interface MPRouteLegParams {
    /**
     * The steps the leg consists of.
     *
     * @type {?MPRouteStep[]}
     */
    steps?: MPRouteStep[];
    /**
     * The distance of the leg.
     *
     * @type {?MPRouteProperty}
     */
    distance?: MPRouteProperty;
    /**
     * The expected time it takes to traverse the leg.
     *
     * @type {?MPRouteProperty}
     */
    duration?: MPRouteProperty;
    /**
     * The address at the start of the leg.
     *
     * @type {?string}
     */
    start_address?: string;
    /**
     * The address at the end of the leg.
     *
     * @type {?string}
     */
    end_address?: string;
    /**
     * The start coordinate of the leg.
     *
     * @type {?MPRouteCoordinate}
     */
    start_location?: MPRouteCoordinate;
    /**
     * The end coordinate of the leg.
     *
     * @type {?MPRouteCoordinate}
     */
    end_location?: MPRouteCoordinate;
}