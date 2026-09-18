/**
 * The repeating marker drawn along the route polyline.
 *
 * @export
 * @enum {string}
 */
export enum MPRouteStampType {
    /**
     * No stamp, only the route line and any animation is drawn.
     */
    none = "none",
    /**
     * A built-in direction indicating arrow, repeated along the line.
     * 
     * The shape is chosen with {@link MPRouteArrowStyle}.
     */
    arrow = "arrow",
    /**
     * A custom icon, repeated along the line.
     * 
     * The icon is set with {@link MPDirectionsRendererOptionsParams.stampImageUrl}.
     */
    custom = "custom",
}
