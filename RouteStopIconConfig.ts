/**
 * Interface used by MapsIndoors to retrieve image for route stops.
 *
 * @export
 * @interface RouteStopIconConfig
 * @typedef {RouteStopIconConfig}
 */
export interface RouteStopIconConfig {
    /**
     * The icon image. An http(s) URL is downloaded by the native SDK; anything else is passed on as
     * an encoded MPRouteStopIconConfig.
     */
    getImage(): URL | string;
}