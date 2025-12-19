import { Platform } from "react-native";
import { MPRouteProperty, MPRoutePropertyParams, MPRouteCoordinate, MPRouteCoordinateParams } from "../../index";

/**
 * Description placeholder.
 *
 * @export
 * @class MPRouteStep
 * @typedef {MPRouteStep}
 */
export default class MPRouteStep {

    /**
     * Creates an instance of MPRouteStep.
     *
     * @constructor
     * @private
     * @param {?MPRouteProperty} [distance]
     * @param {?MPRouteProperty} [duration]
     * @param {?MPRouteStep[]} [steps]
     * @param {?MPRouteCoordinate[]} [geometry]
     * @param {?string} [highway]
     * @param {?string} [abutters]
     * @param {?string} [maneuver]
     * @param {?MPRouteCoordinate} [startLocation]
     * @param {?MPRouteCoordinate} [endLocation]
     * @param {?string} [htmlInstructions]
     * @param {?string} [travelMode]
     * @param {?string[]} [availableTravelModes]
     */
    private constructor(
        public readonly distance?: MPRouteProperty,
        public readonly duration?: MPRouteProperty,
        public readonly steps?: MPRouteStep[],
        public readonly geometry?: MPRouteCoordinate[],
        public readonly highway?: string,
        public readonly abutters?: string,
        public readonly maneuver?: string,
        public readonly startLocation?: MPRouteCoordinate,
        public readonly endLocation?: MPRouteCoordinate,
        public readonly htmlInstructions?: string,
        public readonly travelMode?: string,
        public readonly availableTravelModes?: string[],
    ) { }


    /**
     * Creator for MPRouteStep, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPRouteStepParams} object
     * @returns {MPRouteStep}
     */
    public static create(object: MPRouteStepParams): MPRouteStep {
        return new MPRouteStep(
            MPRouteProperty.create(object?.distance as MPRoutePropertyParams),
            MPRouteProperty.create(object?.duration as MPRoutePropertyParams),
            object?.steps ? object?.steps.map((subStep: any) => MPRouteStep.create(subStep)): undefined,
            object?.geometry ? object?.geometry.map((geo: any) => MPRouteCoordinate.create(geo)): undefined,
            Platform.OS === "ios" ? (object as any).highway?.type: object?.highway,
            object?.abutters,
            object?.maneuver,
            MPRouteCoordinate.create(object?.start_location as MPRouteCoordinateParams),
            MPRouteCoordinate.create(object?.end_location as MPRouteCoordinateParams),
            object?.html_instructions,
            object?.travel_mode,
            object?.available_travel_modes,
        );
    }


    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPRouteStepParams}
     */
    public toJSON(): MPRouteStepParams {
        return {
            distance: this.distance,
            duration: this.duration,
            start_location: this.startLocation,
            end_location: this.endLocation,
            geometry: this.geometry,
            highway: this.highway,
            abutters: this.abutters,
            html_instructions: this.htmlInstructions,
            maneuver: this.maneuver,
            travel_mode: this.travelMode,
            steps: this.steps,
            available_travel_modes: this.availableTravelModes,
        };
    }
}

/**
 * Parameter interface for {@link MPRouteStep}.
 *
 * @export
 * @interface MPRouteStepParams
 * @typedef {MPRouteStepParams}
 */
export interface MPRouteStepParams {
    /**
     * The distance of the route step.
     *
     * @type {?MPRouteProperty}
     */
    distance?: MPRouteProperty,
    /**
     * The duration of the route step.
     *
     * @type {?MPRouteProperty}
     */
    duration?: MPRouteProperty,
    /**
     * An array of sub-steps for the route step.
     *
     * @type {?MPRouteStep[]}
     */
    steps?: MPRouteStep[],
    /**
     * An array of coordinates representing the geometry of the route step.
     *
     * @type {?MPRouteCoordinate[]}
     */
    geometry?: MPRouteCoordinate[],
    /**
     * The highway associated with the route step.
     *
     * @type {?string}
     */
    highway?: string,
    /**
     * The abutters associated with the route step.
     *
     * @type {?string}
     */
    abutters?: string,
    /**
     * The maneuver associated with the route step.
     * 
     * Possible values incldue:
     * - "turn-left"
     * - "turn-right"
     * - "straight"
     * - "uturn-left"
     * - "uturn-right"
     * - "turn-sharp-left"
     * - "turn-sharp-right"
     *
     * @type {?string}
     */
    maneuver?: string,
    /**
     * The starting location of the route step.
     *
     * @type {?MPRouteCoordinate}
     */
    start_location?: MPRouteCoordinate,
    /**
     * The ending location of the route step.
     *
     * @type {?MPRouteCoordinate}
     */
    end_location?: MPRouteCoordinate,
    /**
     * Textual instructions for the step
     *
     * @type {?string}
     */
    html_instructions?: string,
    /**
     * The travel mode for the route step.
     *
     * @type {?string}
     */
    travel_mode?: string,
    /**
     * An array of available travel modes for the route step.
     *
     * @type {?string[]}
     */
    available_travel_modes?: string[],
}