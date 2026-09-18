import MPSize from "./MPSize";

/**
 * Styling for the origin (start) or destination (end) marker of a rendered route.
 *
 * Assigned to {@link MPDirectionsRendererOptionsParams.startDisplayRule} or
 * {@link MPDirectionsRendererOptionsParams.endDisplayRule}.
 *
 * Every property is optional, an omitted property is inherited from the solution
 * configuration, or from the built-in default. There is no built-in icon, so a
 * terminus marker is only drawn when an {@link iconUrl} is configured.
 *
 * @export
 * @class MPRouteMarkerDisplayRule
 * @typedef {MPRouteMarkerDisplayRule}
 */
export default class MPRouteMarkerDisplayRule {

    /**
     * Creates an instance of MPRouteMarkerDisplayRule.
     *
     * @constructor
     * @private
     */
    private constructor(
        public readonly iconUrl?: string,
        public readonly iconVisible?: boolean,
        public readonly iconSize?: MPSize,
        public readonly label?: string,
        public readonly labelVisible?: boolean,
        public readonly labelTextSize?: number,
        public readonly labelTextColor?: string,
        public readonly labelHaloColor?: string,
        public readonly labelHaloWidth?: number,
        public readonly zoomFrom?: number,
        public readonly zoomTo?: number,
    ) { }

    /**
     * Creator for MPRouteMarkerDisplayRule.
     *
     * @public
     * @static
     * @param {MPRouteMarkerDisplayRuleParams} object
     * @returns {MPRouteMarkerDisplayRule}
     */
    public static create(object: MPRouteMarkerDisplayRuleParams): MPRouteMarkerDisplayRule {
        return new MPRouteMarkerDisplayRule(
            object?.iconUrl,
            object?.iconVisible,
            object?.iconSize,
            object?.label,
            object?.labelVisible,
            object?.labelTextSize,
            object?.labelTextColor,
            object?.labelHaloColor,
            object?.labelHaloWidth,
            object?.zoomFrom,
            object?.zoomTo,
        );
    }
}

/**
 * Parameter interface for {@link MPRouteMarkerDisplayRule}.
 *
 * @export
 * @interface MPRouteMarkerDisplayRuleParams
 * @typedef {MPRouteMarkerDisplayRuleParams}
 */
export interface MPRouteMarkerDisplayRuleParams {
    /**
     * Media library URL of the marker icon, which the SDK downloads and caches.
     *
     * @type {?string}
     */
    iconUrl?: string,
    /**
     * Whether the icon is shown. Shown by default when an {@link iconUrl} is set.
     *
     * @type {?boolean}
     */
    iconVisible?: boolean,
    /**
     * The on screen size of the icon, in density independent units - points on iOS, dp on
     * Android. Not raw pixels: the SDKs scale by the screen's density, so the same value is the
     * same physical size on a 2x or 3x screen. Defaults to the icon's intrinsic size.
     *
     * @type {?MPSize}
     */
    iconSize?: MPSize,
    /**
     * The text drawn with the marker.
     *
     * @type {?string}
     */
    label?: string,
    /**
     * Whether the label is shown. Shown by default when a {@link label} is set.
     *
     * @type {?boolean}
     */
    labelVisible?: boolean,
    /**
     * The label's text size, in density independent units - points on iOS, dp on Android.
     *
     * @type {?number}
     */
    labelTextSize?: number,
    /**
     * The label's text color, given as a hex string (e.g. "#3071D9").
     *
     * @type {?string}
     */
    labelTextColor?: string,
    /**
     * The label's halo (outline) color, given as a hex string (e.g. "#FFFFFF").
     *
     * @type {?string}
     */
    labelHaloColor?: string,
    /**
     * The label's halo (outline) width, in density independent units - points on iOS, dp on Android.
     *
     * @type {?number}
     */
    labelHaloWidth?: number,
    /**
     * The lowest zoom level at which the marker is shown.
     *
     * @type {?number}
     */
    zoomFrom?: number,
    /**
     * The highest zoom level at which the marker is shown.
     *
     * @type {?number}
     */
    zoomTo?: number,
}
