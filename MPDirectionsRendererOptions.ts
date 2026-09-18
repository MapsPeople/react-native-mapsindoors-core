import { MPLegBoundaryIcons, MPRouteAnimationType, MPRouteArrowStyle, MPRouteMarkerDisplayRule, MPRouteStampType, MPStrokeStyle } from "../../index";

/**
 * The styling and camera options for a route rendered by {@link MPDirectionsRenderer}.
 *
 * Applied with {@link MPDirectionsRenderer.setOptions}, which restyles an already
 * rendered route in place.
 *
 * Every property is optional and resolves on its own, in this order: the value set
 * here, then the solution level default configured in the CMS, then the SDK's built-in
 * default. An omitted property is therefore inherited rather than reset, so only the
 * properties to override need to be given. Applying a fresh set of options clears all
 * previous overrides.
 *
 * @export
 * @class MPDirectionsRendererOptions
 * @typedef {MPDirectionsRendererOptions}
 */
export default class MPDirectionsRendererOptions {

    /**
     * Creates an instance of MPDirectionsRendererOptions.
     *
     * @constructor
     * @private
     */
    private constructor(
        public readonly strokeColor?: string,
        public readonly strokeOpacity?: number,
        public readonly strokeWeight?: number,
        public readonly strokeStyle?: MPStrokeStyle,
        public readonly backgroundColorEnabled?: boolean,
        public readonly backgroundColor?: string,
        public readonly backgroundColorOpacity?: number,
        public readonly backgroundColorWeight?: number,
        public readonly animationType?: MPRouteAnimationType,
        public readonly animationSpeed?: number,
        public readonly animationMinDuration?: number,
        public readonly animationRepeating?: boolean,
        public readonly forceAnimation?: boolean,
        public readonly animatedOverlayColor?: string,
        public readonly animatedOverlayOpacity?: number,
        public readonly animatedOverlayWeight?: number,
        public readonly stampType?: MPRouteStampType,
        public readonly stampImageUrl?: string,
        public readonly stampSpacing?: number,
        public readonly stampScale?: number,
        public readonly arrowStyle?: MPRouteArrowStyle,
        public readonly stampColor?: string,
        public readonly startDisplayRule?: MPRouteMarkerDisplayRule,
        public readonly endDisplayRule?: MPRouteMarkerDisplayRule,
        public readonly legBoundaryIcons?: MPLegBoundaryIcons,
        public readonly elevated?: boolean,
        public readonly elevationHeight?: number,
        public readonly fitBoundsMaxZoom?: number,
    ) { }

    /**
     * Creator for MPDirectionsRendererOptions, also used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPDirectionsRendererOptionsParams} object
     * @returns {MPDirectionsRendererOptions}
     */
    public static create(object: MPDirectionsRendererOptionsParams): MPDirectionsRendererOptions {
        return new MPDirectionsRendererOptions(
            object?.strokeColor,
            object?.strokeOpacity,
            object?.strokeWeight,
            object?.strokeStyle,
            object?.backgroundColorEnabled,
            object?.backgroundColor,
            object?.backgroundColorOpacity,
            object?.backgroundColorWeight,
            object?.animationType,
            object?.animationSpeed,
            object?.animationMinDuration,
            object?.animationRepeating,
            object?.forceAnimation,
            object?.animatedOverlayColor,
            object?.animatedOverlayOpacity,
            object?.animatedOverlayWeight,
            object?.stampType,
            object?.stampImageUrl,
            object?.stampSpacing,
            object?.stampScale,
            object?.arrowStyle,
            object?.stampColor,
            object?.startDisplayRule ? MPRouteMarkerDisplayRule.create(object.startDisplayRule) : undefined,
            object?.endDisplayRule ? MPRouteMarkerDisplayRule.create(object.endDisplayRule) : undefined,
            object?.legBoundaryIcons ? MPLegBoundaryIcons.create(object.legBoundaryIcons) : undefined,
            object?.elevated,
            object?.elevationHeight,
            object?.fitBoundsMaxZoom,
        );
    }
}

/**
 * Parameter interface for {@link MPDirectionsRendererOptions}.
 *
 * All colors are given as hex strings in the form "#RRGGBB" (e.g. "#3071D9").
 * Transparency is set with the matching opacity property rather than in the color itself.
 *
 * @export
 * @interface MPDirectionsRendererOptionsParams
 * @typedef {MPDirectionsRendererOptionsParams}
 */
export interface MPDirectionsRendererOptionsParams {
    /**
     * The color of the route line.
     *
     * @type {?string}
     */
    strokeColor?: string,
    /**
     * The opacity of the route line, in the range 0.0 - 1.0.
     *
     * @type {?number}
     */
    strokeOpacity?: number,
    /**
     * The width of the route line, in pixels.
     *
     * @type {?number}
     */
    strokeWeight?: number,
    /**
     * How the route line is drawn.
     *
     * @type {?MPStrokeStyle}
     */
    strokeStyle?: MPStrokeStyle,
    /**
     * Whether the background halo is drawn beneath the route line.
     *
     * @type {?boolean}
     */
    backgroundColorEnabled?: boolean,
    /**
     * The color of the background halo drawn beneath the route line.
     *
     * @type {?string}
     */
    backgroundColor?: string,
    /**
     * The opacity of the background halo, in the range 0.0 - 1.0.
     *
     * @type {?number}
     */
    backgroundColorOpacity?: number,
    /**
     * The halo padding on each side of the route line, in pixels.
     *
     * @type {?number}
     */
    backgroundColorWeight?: number,
    /**
     * The animation applied to the overlay travelling along the route line.
     *
     * @type {?MPRouteAnimationType}
     */
    animationType?: MPRouteAnimationType,
    /**
     * The animation speed, in meters per second.
     *
     * @type {?number}
     */
    animationSpeed?: number,
    /**
     * The lower bound for the animation duration, in seconds, which keeps short
     * routes from animating too fast.
     *
     * @type {?number}
     */
    animationMinDuration?: number,
    /**
     * Whether the animation repeats.
     *
     * @type {?boolean}
     */
    animationRepeating?: boolean,
    /**
     * Whether the animation plays even when the system's reduce motion setting is enabled.
     *
     * @type {?boolean}
     */
    forceAnimation?: boolean,
    /**
     * The color of the animated overlay. Defaults to {@link strokeColor}.
     *
     * @type {?string}
     */
    animatedOverlayColor?: string,
    /**
     * The opacity of the animated overlay, in the range 0.0 - 1.0.
     *
     * @type {?number}
     */
    animatedOverlayOpacity?: number,
    /**
     * The width of the animated overlay, in pixels.
     *
     * @type {?number}
     */
    animatedOverlayWeight?: number,
    /**
     * The repeating stamp drawn along the route line.
     *
     * @type {?MPRouteStampType}
     */
    stampType?: MPRouteStampType,
    /**
     * The URL of the icon repeated along the route line when {@link stampType}
     * is {@link MPRouteStampType.custom}.
     *
     * @type {?string}
     */
    stampImageUrl?: string,
    /**
     * The distance between repeated stamps, in pixels.
     *
     * @type {?number}
     */
    stampSpacing?: number,
    /**
     * The scale multiplier applied to the stamp icon, where 1.0 is the intrinsic size.
     *
     * @type {?number}
     */
    stampScale?: number,
    /**
     * The arrow shape drawn when {@link stampType} is {@link MPRouteStampType.arrow}.
     *
     * @type {?MPRouteArrowStyle}
     */
    arrowStyle?: MPRouteArrowStyle,
    /**
     * The tint of the built-in arrow stamp. Ignored by a custom {@link stampImageUrl}.
     *
     * @type {?string}
     */
    stampColor?: string,
    /**
     * The styling of the route's origin marker.
     *
     * @type {?MPRouteMarkerDisplayRule}
     */
    startDisplayRule?: MPRouteMarkerDisplayRule,
    /**
     * The styling of the route's destination marker.
     *
     * @type {?MPRouteMarkerDisplayRule}
     */
    endDisplayRule?: MPRouteMarkerDisplayRule,
    /**
     * The icons drawn where the route crosses a connector, by connector type.
     *
     * @type {?MPLegBoundaryIcons}
     */
    legBoundaryIcons?: MPLegBoundaryIcons,
    /**
     * Whether the whole route is lifted off the base map for a 3D effect. The lift
     * is only visible when the camera is tilted.
     *
     * Mapbox only, the Google Maps SDKs keep the route flat.
     *
     * @type {?boolean}
     */
    elevated?: boolean,
    /**
     * How far the route is lifted above the ground, in meters, when {@link elevated}
     * is true.
     *
     * Mapbox only, the Google Maps SDKs keep the route flat.
     *
     * @type {?number}
     */
    elevationHeight?: number,
    /**
     * The upper bound for the zoom level used when fitting the camera to the route.
     *
     * @type {?number}
     */
    fitBoundsMaxZoom?: number,
}
