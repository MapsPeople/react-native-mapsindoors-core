import MapControl from "../../index";

/**
 * Sets a behavior for the map when calling {@link MapControl#setHighlight}.
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
 * @typedef {MPHighlightBehavior}
 */
export default class MPHighlightBehavior {

    /**
     * Creates an instance of MPHighlightBehavior.
     *
     * @constructor
     * @private
     * @param {boolean} allowFloorChange Whether the highlighting is allowed to change the floor if no results are visible on the current floor.
     * @param {boolean} moveCamera Whether the highlighting should move the camera to encompass the results.
     * @param {number} animationDuration How long the camera movement should be animated for, set to 0 disables animation.
     * @param {boolean} showInfoWindow Whether to open the info window if a single result is returned.
     * @param {boolean} zoomToFit Whether the highlighting is allowed to zoom in/out the camera.
     */
    private constructor(
        public allowFloorChange: boolean,
        public moveCamera: boolean,
        public animationDuration: number,
        public showInfoWindow: boolean,
        public zoomToFit: boolean,
    ) { }

    /**
     * Creator for MPHighlightBehavior, invoke with 0 parameters to use default behavior.
     *
     * @public
     * @static
     * @param {MPFilterBehaviorParams} object
     * @returns {MPFilterBehavior}
     */
    public static create(object?: MPHighlightBehaviorParams): MPHighlightBehavior {
        return new MPHighlightBehavior(
            object?.allowFloorChange ? object.allowFloorChange : false,
            object?.moveCamera ? object.moveCamera : false,
            object?.animationDuration ? object.animationDuration : 0,
            object?.showInfoWindow ? object.showInfoWindow : false,
            object?.zoomToFit ? object?.zoomToFit : true
        );
    };
}

/**
 * Parameter interface for {@link MPHighlightBehavior}.
 *
 * @export
 * @interface MPHighlightBehaviorParams
 * @typedef {MPHighlightBehaviorParams}
 */
export interface MPHighlightBehaviorParams {
    /**
     * Whether the highlight is allowed to change the floor if no results are visible on the current floor.
     *
     * @type {?boolean}
     */
    allowFloorChange?: boolean,
    /**
     * Whether the Highlight should move the camera to encompass the results.
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
     * Whether the Highlight is allowed to zoom in/out the camera.
     *
     * @type {?boolean}
     */
    zoomToFit?: boolean,
}