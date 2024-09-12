import { RouteStopIconConfig } from "./RouteStopIconConfig";

/**
 * A class that creates a route stop icon for the {@link MPDirectionsRenderer}.
 *
 * @export
 * @class MPRouteStopIconConfig
 * @typedef {MPRouteStopIconConfig}
 */
export default class MPRouteStopIconConfig implements RouteStopIconConfig{

    readonly numbered: boolean;
    readonly label: string;
    readonly color: string;

    /**
     * Creates an instance of MPRouteStopIconConfig.
     *
     * @constructor
     * @private
     * @param {Mode} mode
     * @param {*} obj
     */
    private constructor(numberd: boolean, label: string, color: string) {
        this.numbered = numberd;
        this.label = label;
        this.color = color;
    }

    /**
     * Internal
     *
     * @returns {URL}
     */
    getImage(): URL {
        return new URL(JSON.stringify(this));
    }

    /**
     * Creator for MPRouteStopIconConfig, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {MPRouteStopIconConfigParams} obj
     * @returns {MPRouteStopIconConfig}
     */
    static create(obj: MPRouteStopIconConfigParams): MPRouteStopIconConfig {
        return new MPRouteStopIconConfig(
            obj.numbered,
            obj.label,
            obj.color
        );
    }
}

/**
 * Parameter interface for {@link MPRouteStopIconConfig}.
 *
 * @export
 * @interface MPRouteStopIconConfigParams
 * @typedef {MPRouteStopIconConfigParams}
 */
export interface MPRouteStopIconConfigParams {
    /**
     * Whether the icon should be numbered.
     *
     * @type {boolean}
     */
    numbered: boolean,
    /**
     * The label for the icon.
     *
     * @type {string}
     */
    label: string,
    /**
     * The color for the icon.
     *
     * @type {string}
     */
    color: string
}

