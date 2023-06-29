import { MPFloorSelectorInterface, MapControl } from "../../index";

/**
 * This configuration object is used when creating a new {@link MapControl} instance.
 *
 * @export
 * @class MPMapConfig
 * @typedef {MPMapConfig}
 */
export default class MPMapConfig {
    /**
     * Whether to use the default map styling used by MapsIndoors, true by default.
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public readonly useDefaultMapsIndoorsStyle: boolean
    /**
     * The name of the typeface family to use on the map (the typeface must be supported on the native platform).
     *
     * @public
     * @readonly
     * @type {?string}
     */
    public readonly typeface?: string;
    /**
     * The color of the label text (a Hex color String (#1f1f1f))
     *
     * @public
     * @readonly
     * @type {?string}
     */
    public readonly color?: string;
    /**
     * Whether to show a white shadow behind the text to make it more readable.
     *
     * @public
     * @readonly
     * @type {?boolean}
     */
    public readonly showHalo?: boolean;
    /**
     * Changes the text size of the maps marker labels.
     * 
     * The size is in dense pixels (DP).
     *
     * @public
     * @readonly
     * @type {?number}
     */
    public readonly textSize?: number;
    /**
     * Enable/Disable showing the floor selector.
     *
     * @public
     * @readonly
     * @type {?boolean}
     */
    public readonly showFloorSelector?: boolean;
    /**
     * Enables/Disables the info window on user-selected locations.
     * 
     * The info window is shown by default when the user selects a location (by tapping on it).
     *
     * @public
     * @readonly
     * @type {?boolean}
     */
    public readonly showInfoWindowOnClick?: boolean;
    /**
     * Renders the positioning puck (blue dot) at the last known user position on the map.
     *
     * @public
     * @readonly
     * @type {?boolean}
     */
    public readonly showUserPosition?: boolean;
    /**
     * Enable fade-in effect on MapsIndoors tiles.
     * Changes will be reflected on the map upon changing floors.
     * 
     * Default behavior is enabled fade-in.
     *
     * @public
     * @readonly
     * @type {?boolean}
     */
    public readonly enableTileFadeIn?: boolean;
    /**
     * Replaces the default FloorSelector with a custom one.
     *
     * @public
     * @readonly
     * @type {?MPFloorSelectorInterface}
     */
    public readonly floorSelector?: MPFloorSelectorInterface;

    /**
     * Creates an instance of MPMapConfig.
     *
     * @constructor
     * @public
     * @param {MPMapConfigParams} params
     */
    public constructor(params: MPMapConfigParams) {
        this.useDefaultMapsIndoorsStyle = params.useDefaultMapsIndoorsStyle;
        this.typeface = params.mapLabelFont?.typeface;
        this.color = params.mapLabelFont?.color;
        this.showHalo = params.mapLabelFont?.showHalo;
        this.textSize = params.textSize;
        this.showFloorSelector = params.showFloorSelector;
        this.showInfoWindowOnClick = params.showInfoWindowOnClick;
        this.showUserPosition = params.showUserPosition;
        this.enableTileFadeIn = params.enableTileFadeIn;
        this.floorSelector = params.floorSelector;
    }
}

/**
 * Collection of label apperance settigns
 *
 * @export
 * @interface MapLabelFont
 * @typedef {MapLabelFont}
 */
export interface MapLabelFont {
    /**
     * The name of the typeface family to use on the map (the typeface must be supported on the native platform).
     *
     * @type {string}
     */
    typeface: string,
    /**
     * The color of the label text (a Hex color String (#1f1f1f))
     *
     * @type {string}
     */
    color: string,
    /**
     * Whether to show a white shadow behind the text to make it more readable.
     *
     * @type {boolean}
     */
    showHalo: boolean,
}

/**
 * Parameter interface for {@link MPMapConfig}.
 *
 * @export
 * @interface MPMapConfigParams
 * @typedef {MPMapConfigParams}
 */
export interface MPMapConfigParams {
    /**
     * Whether to use the default map styling used by MapsIndoors, true by default.
     *
     * @type {boolean}
     */
    useDefaultMapsIndoorsStyle: boolean,
    /**
     * A map label configuration object.
     *
     * @type {?MapLabelFont}
     */
    mapLabelFont?: MapLabelFont,
    /**
     * Changes the text size of the maps marker labels.
     * 
     * The size is in dense pixels (DP).
     *
     * @type {?number}
     */
    textSize?: number,
    /**
     * Enable/Disable showing the floor selector.
     *
     * @type {?boolean}
     */
    showFloorSelector?: boolean,
    /**
     * Enables/Disables the info window on user-selected locations.
     * 
     * The info window is shown by default when the user selects a location (by tapping on it).
     *
     * @type {?boolean}
     */
    showInfoWindowOnClick?: boolean,
    /**
     * Renders the positioning puck (blue dot) at the last known user position on the map.
     *
     * @type {?boolean}
     */
    showUserPosition?: boolean,
    /**
     * Enable fade-in effect on MapsIndoors tiles.
     * Changes will be reflected on the map upon changing floors.
     * 
     * Default behavior is enabled fade-in.
     *
     * @type {?boolean}
     */
    enableTileFadeIn?: boolean,
    /**
     * Replaces the default FloorSelector with a custom one.
     *
     * @type {?MPFloorSelectorInterface}
     */
    floorSelector?: MPFloorSelectorInterface,
}