/**
 * Custom icons drawn where a route crosses a connector, selected by connector type.
 *
 * Assigned to {@link MPDirectionsRendererOptionsParams.legBoundaryIcons}.
 *
 * Each icon is a media library URL, which the SDK downloads and caches. Every property
 * is optional and resolves on its own, so only the connector types set here are
 * overridden, the rest keep the icon configured for the solution, or the built-in glyph.
 * A connector without its own icon falls back to {@link defaultIcon}.
 *
 * @export
 * @class MPLegBoundaryIcons
 * @typedef {MPLegBoundaryIcons}
 */
export default class MPLegBoundaryIcons {

    /**
     * Creates an instance of MPLegBoundaryIcons.
     *
     * @constructor
     * @private
     */
    private constructor(
        public readonly defaultIcon?: string,
        public readonly elevator?: string,
        public readonly escalator?: string,
        public readonly stairs?: string,
        public readonly ramp?: string,
        public readonly wheelchairRamp?: string,
        public readonly wheelchairLift?: string,
        public readonly ladder?: string,
        public readonly entry?: string,
        public readonly scale?: number,
    ) { }

    /**
     * Creator for MPLegBoundaryIcons.
     *
     * @public
     * @static
     * @param {MPLegBoundaryIconsParams} object
     * @returns {MPLegBoundaryIcons}
     */
    public static create(object: MPLegBoundaryIconsParams): MPLegBoundaryIcons {
        return new MPLegBoundaryIcons(
            object?.defaultIcon,
            object?.elevator,
            object?.escalator,
            object?.stairs,
            object?.ramp,
            object?.wheelchairRamp,
            object?.wheelchairLift,
            object?.ladder,
            object?.entry,
            object?.scale,
        );
    }
}

/**
 * Parameter interface for {@link MPLegBoundaryIcons}.
 *
 * Every icon is a media library URL.
 *
 * @export
 * @interface MPLegBoundaryIconsParams
 * @typedef {MPLegBoundaryIconsParams}
 */
export interface MPLegBoundaryIconsParams {
    /**
     * Fallback icon for any connector type without its own icon.
     *
     * @type {?string}
     */
    defaultIcon?: string,
    /**
     * Icon for elevator floor changes.
     *
     * @type {?string}
     */
    elevator?: string,
    /**
     * Icon for escalator floor changes.
     *
     * @type {?string}
     */
    escalator?: string,
    /**
     * Icon for stairs floor changes.
     *
     * @type {?string}
     */
    stairs?: string,
    /**
     * Icon for ramp floor changes.
     *
     * @type {?string}
     */
    ramp?: string,
    /**
     * Icon for wheelchair ramp floor changes.
     *
     * @type {?string}
     */
    wheelchairRamp?: string,
    /**
     * Icon for wheelchair lift floor changes.
     *
     * @type {?string}
     */
    wheelchairLift?: string,
    /**
     * Icon for ladder floor changes.
     *
     * @type {?string}
     */
    ladder?: string,
    /**
     * Icon for building entrances, where the route crosses an external door.
     *
     * @type {?string}
     */
    entry?: string,
    /**
     * Scale multiplier applied to every connector icon, where 1.0 is the intrinsic size.
     *
     * @type {?number}
     */
    scale?: number,
}
