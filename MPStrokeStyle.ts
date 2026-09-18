/**
 * How the route polyline is drawn.
 *
 * @export
 * @enum {string}
 */
export enum MPStrokeStyle {
    /**
     * A continuous line. Supported by all map providers.
     */
    solid = "solid",
    /**
     * A dashed line.
     *
     * Not supported by Google Maps on iOS, where it falls back to {@link MPStrokeStyle.solid}.
     */
    dashed = "dashed",
    /**
     * A dotted line. Supported by all map providers.
     */
    dotted = "dotted",
}
