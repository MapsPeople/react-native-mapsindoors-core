import MapControl from "../../index";

/**
 * Sets a behavior for the map when calling {@link MapControl#setFilter}.
 * 
 * Has a default behavior:
 * * MoveCamera = false
 * * ShowInfoWindow = false
 * * AnimationDuration = 0
 * * AllowFloorChange = false
 * * ZoomToFit = true
 *
 * @export
 * @class MPFilterBehavior
 * @typedef {MPFilterBehavior}
 */
export default class MPFilterBehavior {

    /**
     * Creates an instance of MPFilterBehavior.
     *
     * @constructor
     * @private
     * @param {boolean} allowFloorChange Whether the filtering is allowed to change the floor if no results are visible on the current floor.
     * @param {boolean} moveCamera Whether the filtering should move the camera to encompass the results.
     * @param {number} animationDuration How long the camera movement should be animated for, set to 0 disables animation.
     * @param {boolean} showInfoWindow Whether to open the info window if a single result is returned.
     * @param {boolean} zoomToFit Whether the filtering is allowed to zoom in/out the camera.
     */
    private constructor(
        public allowFloorChange: boolean,
        public moveCamera: boolean,
        public animationDuration: number,
        public showInfoWindow: boolean,
        public zoomToFit: boolean,
    ) { }

    /**
     * Creator for MPFilterBehavior, invoke with 0 parameters to use default behavior.
     *
     * @public
     * @static
     * @param {MPFilterBehaviorParams} object
     * @returns {MPFilterBehavior}
     */
    public static create(object?: MPFilterBehaviorParams): MPFilterBehavior {
        return new MPFilterBehavior(
            object?.allowFloorChange ? object.allowFloorChange : false,
            object?.moveCamera ? object.moveCamera : false,
            object?.animationDuration ? object.animationDuration : 0,
            object?.showInfoWindow ? object.showInfoWindow : false,
            object?.zoomToFit ? object?.zoomToFit : true
        );
    };
}

/**
 * Parameter interface for {@link MPFilterBehavior}.
 *
 * @export
 * @interface MPFilterBehaviorParams
 * @typedef {MPFilterBehaviorParams}
 */
export interface MPFilterBehaviorParams {
    /**
     * Whether the filtering is allowed to change the floor if no results are visible on the current floor.
     *
     * @type {?boolean}
     */
    allowFloorChange?: boolean,
    /**
     * Whether the filtering should move the camera to encompass the results.
     *
     * @type {?boolean}
     */
    moveCamera?: boolean,
    /**
     * How long the camera movement should be animated for, set to 0 disables animation.
     *
     * @type {?number}
     */
    animationDuration?: number,
    /**
     * Whether to open the info window if a single result is returned.
     *
     * @type {?boolean}
     */
    showInfoWindow?: boolean,
    /**
     * Whether the filtering is allowed to zoom in/out the camera.
     *
     * @type {?boolean}
     */
    zoomToFit?: boolean,
}