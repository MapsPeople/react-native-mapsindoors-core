import MapControl from "../../index";
import { Platform } from 'react-native';

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
     * @param {number} maxZoom
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
     * Creator for MPSelectionBehavior, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {MPSelectionBehaviorParams} object
     * @returns {MPSelectionBehavior}
     */
    static create(object: MPSelectionBehaviorParams): MPSelectionBehavior {
        if(Platform.OS === 'ios') {
            return new MPSelectionBehavior(
                object?.allowFloorChange ?? false,
                object?.moveCamera ?? false,
                object?.animationDuration ?? 0,
                object?.showInfoWindow ?? false,
                object?.zoomToFit ?? true,
                object?.maxZoom ?? 999
            );
        }
        return new MPSelectionBehavior(
            object?.allowFloorChange ?? true,
            object?.moveCamera ?? true,
            object?.animationDuration ?? 500,
            object?.showInfoWindow ?? true,
            object?.zoomToFit ?? true,
            object?.maxZoom
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

    /**
     * The maximum zoom level to zoom to when zoomToFit is enabled.
     *
     * @type {?number}
     */
    maxZoom?: number
}