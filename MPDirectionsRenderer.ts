import { EmitterSubscription, NativeEventEmitter, NativeModules } from 'react-native';
import { MPCameraViewFitMode, MPError, MPRoute, OnLegSelectedListener } from "../../index";
import { EventNames } from './EventNames';

const { DirectionsRenderer } = NativeModules;

/**
 * Renders a {@link MPRoute} on the map.
 *
 * @export
 * @class MPDirectionsRenderer
 * @typedef {MPDirectionsRenderer}
 */
export default class MPDirectionsRenderer {
    /**
     * Listener for leg selection events.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onLegSelectedSub?: EmitterSubscription;
    /**
     * Event handler.
     *
     * @private
     * @type {?NativeEventEmitter}
     */
    private eventEmitter?: NativeEventEmitter;

    /**
     * Creates an instance of MPDirectionsRenderer.
     *
     * @constructor
     * @public
     * @param {typeof NativeEventEmitter} nativeEventEmitter
     */
    public constructor(nativeEventEmitter: typeof NativeEventEmitter) {
        this.eventEmitter = new nativeEventEmitter(DirectionsRenderer);
    }

    /**
     * Clears the route from the map.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async clear(): Promise<void> {
        await DirectionsRenderer.clear();
    }

    /**
     * Selects the next leg if possible.
     * 
     * Has no effect if the last leg is selected.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async nextLeg(): Promise<void> {
        await DirectionsRenderer.nextLeg();
    }

    /**
     * Selects the previous leg if possible.
     * 
     * Has no effect if the first leg is selected.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async previousLeg(): Promise<void> {
        await DirectionsRenderer.previousLeg();
    }

    /**
     * Set a route to be rendered. This also resets the selected leg and step indices to 0.
     *
     * @public
     * @async
     * @param {?MPRoute} [route]
     * @returns {Promise<void>}
     */
    public async setRoute(route: MPRoute): Promise<void> {
        await DirectionsRenderer.setRoute(JSON.stringify(route))
    }

    /**
     * Enable/Disable the polyline animation when displaying a route element on the map.
     *
     * @public
     * @async
     * @param {boolean} animated
     * @param {boolean} repeating
     * @param {number} durationMs
     * @returns {Promise<void>}
     */
    public async setAnimatedPolyline(animated: boolean, repeating: boolean, durationMs: number): Promise<void> {
        await DirectionsRenderer.setAnimatedPolyline(animated, repeating, durationMs);
    }

    /**
     * Enable/Disable the route end/start label buttons from showing on the route. Default is true
     *
     * @public
     * @async
     * @param {boolean} show
     * @returns {Promise<void>}
     */
    public async showRouteLegButtons(show: boolean): Promise<void> {
        await DirectionsRenderer.showRouteLegButtons(show);
    }
    
    /**
     * Manually set the selected leg index on the route.
     * 
     * This may reject if the resulting internal state is invalid (parsed index is out of bounds).
     *
     * @public
     * @async
     * @param {number} legIndex
     * @returns {Promise<void>}
     */
    public async selectLegIndex(legIndex: number): Promise<void> {
        await DirectionsRenderer.selectLegIndex(legIndex).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Gets the currently selected leg's floor index.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getSelectedLegFloorIndex(): Promise<number> {
        return DirectionsRenderer.getSelectedLegFloorIndex();
    }

    /**
     * Set the duration of camera animations in ms.
     * 
     * If the duration < 0 then camera animations are disabled, and the camera will move instantly.
     * 
     * The value is 1000 ms by default
     *
     * @public
     * @async
     * @param {number} durationMs
     * @returns {Promise<void>}
     */
    public async setCameraAnimationDuration(durationMs: number): Promise<void> {
        await DirectionsRenderer.setCameraAnimationDuration(durationMs);
    }

    /**
     * Set the fitmode of the camera, when displaying route elements on the map.
     *
     * @public
     * @async
     * @param {MPCameraViewFitMode} fitMode
     * @returns {Promise<void>}
     */
    public async setCameraViewFitMode(fitMode: MPCameraViewFitMode): Promise<void> {
        let cameraFitMode: number;
        switch (fitMode) {
            case MPCameraViewFitMode.northAligned: {
                cameraFitMode = 0;
                break;
            }
            case MPCameraViewFitMode.firstStepAligned: {
                cameraFitMode = 1;
                break;
            }
            case MPCameraViewFitMode.startToEndAligned: {
                cameraFitMode = 2;
                break;
            }
        }
        await DirectionsRenderer.setCameraViewFitMode(cameraFitMode);
    }

    /**
     * Set a listener, which will be invoked when a new leg has been selected.
     * 
     * This is used for when the forward/back markers are selected on the map.
     *
     * @public
     * @async
     * @param {?OnLegSelectedListener} [listener]
     * @returns {Promise<void>}
     */
    public async setOnLegSelectedListener(listener?: OnLegSelectedListener): Promise<void> {
        await DirectionsRenderer.setOnLegSelectedListener();
        this.onLegSelectedSub?.remove();
        if (listener !== undefined) {
            this.onLegSelectedSub = this.eventEmitter?.addListener(EventNames.onLegSelected, event => {
                const leg = event.leg;
                listener(leg);
            });
        }
    }
}