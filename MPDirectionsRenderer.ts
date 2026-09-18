import { EmitterSubscription, NativeEventEmitter, NativeModules } from 'react-native';
import { MPCameraViewFitMode, MPDirectionsRendererOptions, MPError, MPRoute, OnLegSelectedListener } from "../../index";
import { EventNames } from './EventNames';
import { RouteStopIconConfig } from './RouteStopIconConfig';

const { DirectionsRenderer } = NativeModules;

/**
 * Sent in place of a usage percentage when the app does not supply one, so that the SDK
 * derives the figure from the route's own progress instead.
 *
 * Must stay outside the valid 0-100 range: {@link MPDirectionsRenderer.finishGuidance}
 * clamps a supplied value into that range, which is what keeps this unreachable from the
 * public API, and the native modules branch on it to choose which overload to call.
 */
const NO_USAGE_PERCENTAGE = -1;

/**
 * Renders a {@link MPRoute} on the map.
 *
 * @export
 * @class MPDirectionsRenderer
 * @typedef {MPDirectionsRenderer}
 */
export default class MPDirectionsRenderer {

    private _defaultRouteStopIcon?: RouteStopIconConfig
    get defaultRouteStopIcon(): RouteStopIconConfig {
        return this._defaultRouteStopIcon;
    }
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
     * @param {RouteStopIconConfig[]} [stopIcons]
     * @param {?number} [legIndex] Overwrites the starting leg index, when rendering the route
     * @returns {Promise<void>}
     */
    public async setRoute(route: MPRoute, stopIcons: Map<number, RouteStopIconConfig> = null, legIndex: number = 0): Promise<void> {
        var iconsAsString = new Map<number, string>();
        if (stopIcons !== null) {
            stopIcons.forEach((icon, index) => {
                iconsAsString.set(index, icon.getImage().toString());
            });
        }
        await DirectionsRenderer.setRoute(JSON.stringify(route), JSON.stringify(Object.fromEntries(iconsAsString.entries())), legIndex);
    }

    /**
     * Set the default icon for route stops.
     *
     * @public
     * @async
     * @param {RouteStopIconConfig} icon
     * @returns {Promise<void>}
     */
    public async setDefaultRouteStopIcon(icon: RouteStopIconConfig): Promise<void> {
        this._defaultRouteStopIcon = icon;
        await DirectionsRenderer.setDefaultRouteStopIcon(icon.getImage().toString());
    }

    /**
     * Enable/Disable the polyline animation when displaying a route element on the map.
     *
     * @deprecated Use {@link setOptions} with {@link MPDirectionsRendererOptionsParams.animationType},
     * {@link MPDirectionsRendererOptionsParams.animationRepeating} and
     * {@link MPDirectionsRendererOptionsParams.animationSpeed} instead.
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
     * Set the colors of the route polyline.
     *
     * Colors are given as hex strings (e.g. "#3071D9").
     *
     * @deprecated Use {@link setOptions} with {@link MPDirectionsRendererOptionsParams.animatedOverlayColor}
     * (foreground) and {@link MPDirectionsRendererOptionsParams.strokeColor} (background) instead.
     *
     * @public
     * @async
     * @param {string} foregroundColor the primary color (animated polyline)
     * @param {string} backgroundColor the secondary color (static polyline)
     * @returns {Promise<void>}
     */
    public async setPolylineColors(foregroundColor: string, backgroundColor: string): Promise<void> {
        await DirectionsRenderer.setPolyLineColors(foregroundColor, backgroundColor);
    }

    /**
     * Set the styling and camera options of the rendered route.
     *
     * Applies immediately, restyling an already rendered route in place. Every option
     * resolves on its own, in this order: the value set here, then the solution level
     * default configured in the CMS, then the SDK's built-in default. Options left
     * unset are therefore inherited rather than reset.
     *
     * @public
     * @async
     * @param {MPDirectionsRendererOptions} options
     * @returns {Promise<void>}
     */
    public async setOptions(options: MPDirectionsRendererOptions): Promise<void> {
        await DirectionsRenderer.setOptions(JSON.stringify(options));
    }

    /**
     * Gets the currently effective styling and camera options of the rendered route.
     *
     * Each option is resolved as: the value set with {@link setOptions}, then the
     * solution level default configured in the CMS, then the SDK's built-in default.
     * An option reading back as undefined has no default in force for it yet.
     *
     * @public
     * @async
     * @returns {Promise<MPDirectionsRendererOptions>}
     */
    public async getOptions(): Promise<MPDirectionsRendererOptions> {
        const options: string = await DirectionsRenderer.getOptions();
        return MPDirectionsRendererOptions.create(JSON.parse(options));
    }

    /**
     * Signals that guidance on the current route has finished, either because the user
     * arrived or because they ended navigation.
     *
     * Has no effect when no route is set, or when guidance on the current route has
     * already finished. {@link clear} finishes guidance implicitly, so there is no need
     * to call both.
     *
     * @public
     * @async
     * @param {?number} [usagePercentage] How much of the route was travelled, from 0 to 100.
     * Values outside that range are clamped. Omit it to let the SDK derive the figure from
     * the route's own progress.
     * @returns {Promise<void>}
     */
    public async finishGuidance(usagePercentage?: number): Promise<void> {
        // A non-finite value cannot be clamped into range - NaN in particular survives Math.min/max,
        // and every comparison against it is false, so it would slip past the natives' `< 0` sentinel
        // check and reach the SDK as a usage figure. Treat it as "not supplied" instead.
        const usage = usagePercentage != null && Number.isFinite(usagePercentage)
            ? Math.max(0, Math.min(100, usagePercentage))
            : NO_USAGE_PERCENTAGE;
        await DirectionsRenderer.finishGuidance(usage);
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
            case MPCameraViewFitMode.none: {
                cameraFitMode = 3;
                break;
            }
        }
        
        return await DirectionsRenderer.setCameraViewFitMode(cameraFitMode);
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