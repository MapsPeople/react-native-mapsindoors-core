/**
 * Interface used by MapsIndoors to retrieve image for route stops.
 *
 * @export
 * @interface RouteStopIconConfig
 * @typedef {RouteStopIconConfig}
 */
export interface RouteStopIconConfig {
    getImage(): URL;
}