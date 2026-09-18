/**
 * The animation applied to the overlay travelling along the route polyline.
 *
 * @export
 * @enum {string}
 */
export enum MPRouteAnimationType {
    /**
     * No travelling animation, only the static styled route line is drawn.
     */
    none = "none",
    /**
     * The overlay is revealed progressively along the route, then repeats.
     */
    flow = "flow",
    /**
     * The overlay blinks in place, oscillating its opacity.
     */
    pulse = "pulse",
    /**
     * A short bright segment travels along the route, then repeats.
     */
    comet = "comet",
}
