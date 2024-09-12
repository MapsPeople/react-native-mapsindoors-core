import { MPBounds, MPRouteLeg, MPBoundsParams, MPRouteLegParams } from "../../index";

/**
 * A route from a origin to a destination broken up into {@link legs}.
 *
 * @export
 * @class MPRoute
 * @typedef {MPRoute}
 */
export default class MPRoute {
    /**
     * Creates an instance of MPRoute.
     *
     * @constructor
     * @private
     * @param {?MPRouteLeg[]} [legs] The legs the route consists of.
     * @param {?string} [copyrights] The copyrights for this route, if any exists.
     * @param {?string} [summary] A summary of the route.
     * @param {?string[]} [warnings] Any warnings issued for any paths on the route.
     * @param {?string[]} [restrictions] All restrictions in place for the route.
     * @param {?MPBounds} [bounds] The outer bounds of the route.
     * @param {?number[]} [orderedStopIndexes] The original indexes of the stops in the route.
     */
    private constructor(
        public readonly legs?: MPRouteLeg[],
        public readonly copyrights?: string,
        public readonly summary?: string,
        public readonly warnings?: string[],
        public readonly restrictions?: string[],
        public readonly bounds?: MPBounds,
        public readonly ordered_stop_indexes?: number[],
    ) { }

    /**
     * Creator for MPRoute, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {MPRouteParams} object
     * @returns {MPRoute}
     */
    static create(object: MPRouteParams): MPRoute {
        return new MPRoute(
            object?.legs ? object?.legs.map((leg: any) => MPRouteLeg.create(leg)) : undefined,
            object?.copyrights,
            object?.summary,
            object?.warnings,
            object?.restrictions,
            object?.bounds ? MPBounds.create(object?.bounds) : undefined,
            object?.ordered_stop_indexes,
        );
    }
}

/**
 * Parameter interface for {@link MPRoute}.
 *
 * @export
 * @interface MPRouteParams
 * @typedef {MPRouteParams}
 */
export interface MPRouteParams {
    /**
     * The legs the route consists of.
     *
     * @type {?MPRouteLegParams[]}
     */
    legs?: MPRouteLegParams[],
    /**
     * The copyrights for this route, if any exists.
     *
     * @type {?string}
     */
    copyrights?: string,
    /**
     * A summary of the route.
     *
     * @type {?string}
     */
    summary?: string,
    /**
     * Any warnings issued for any paths on the route.
     *
     * @type {?string[]}
     */
    warnings?: string[],
    /**
     * All restrictions in place for the route.
     *
     * @type {?string[]}
     */
    restrictions?: string[],
    /**
     * The outer bounds of the route.
     *
     * @type {?MPBoundsParams}
     */
    bounds?: MPBoundsParams,

    /**
     * The original indexes of the stops in the route.
     *
     * @type {?number[]}
     */
    ordered_stop_indexes?: number[],
}