import MapControl from "../../index";

/**
 * Sets a behavior for the map when calling {@link MapControl#selectLocation}.
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
export default class MPSelectionBehavior {
    /**
     * Creates an instance of MPSelectionBehavior.
     *
     * @constructor
     * @private
     * @param {boolean} allowFloorChange
     * @param {boolean} moveCamera
     * @param {number} animationDuration
     * @param {boolean} showInfoWindow
     * @param {boolean} zoomToFit
     */
    private constructor(
        public allowFloorChange: boolean,
        public moveCamera: boolean,
        public animationDuration: number,
        public showInfoWindow: boolean,
        public zoomToFit: boolean,
    ) { }

    /**
     * Creator for MPSelectionBehavior, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {MPSelectionBehaviorParams} object
     * @returns {MPSelectionBehavior}
     */
    static create(object: MPSelectionBehaviorParams): MPSelectionBehavior {
        return new MPSelectionBehavior(
            object?.allowFloorChange ? object.allowFloorChange : true,
            object?.moveCamera ? object.moveCamera : true,
            object?.animationDuration ? object.animationDuration : 500,
            object?.showInfoWindow ? object.showInfoWindow : true,
            object?.zoomToFit ? object.zoomToFit : true
        );
    }
}

/**
 * Parameter interface for {@link MPSelectionBehavior}.
 *
 * @export
 * @interface MPSelectionBehaviorParams
 * @typedef {MPSelectionBehaviorParams}
 */
export interface MPSelectionBehaviorParams {
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