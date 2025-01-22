import MapControl from "../../index";
import { Platform } from 'react-native';

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
     * @param {number} maxZoom The maximum zoom level to zoom to when zoomToFit is enabled.
     */
    private constructor(
        public allowFloorChange: boolean,
        public moveCamera: boolean,
        public animationDuration: number,
        public showInfoWindow: boolean,
        public zoomToFit: boolean,
        public maxZoom?: number
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
        if(Platform.OS === 'ios') {
            return new MPFilterBehavior(
                object?.allowFloorChange ?? false,
                object?.moveCamera ?? false,
                object?.animationDuration ?? 0,
                object?.showInfoWindow ?? false,
                object?.zoomToFit ?? true,
                object?.maxZoom ?? 999
            );
        }
        return new MPFilterBehavior(
            object?.allowFloorChange ? object.allowFloorChange : false,
            object?.moveCamera ? object.moveCamera : false,
            object?.animationDuration ? object.animationDuration : 0,
            object?.showInfoWindow ? object.showInfoWindow : false,
            object?.zoomToFit ? object?.zoomToFit : true,
            object?.maxZoom
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
    /**
     * The maximum zoom level to zoom to when zoomToFit is enabled.
     *
     * @type {?number}
     */
    maxZoom?: number
}