import MPUtils from "./MPUtils";
import { MPSolutionConfig } from "../../index"

/**
 * A configuration object that governs layer settings for 3D features.
 * 
 * Can be aquired with {@link MPSolutionConfig.settings3D}.
 *
 * @export
 * @class MPSettings3D
 * @typedef {MPSettings3D}
 */
export default class MPSettings3D {

    /**
     * Creates an instance of MPSettings3D.
     *
     * @constructor
     * @private
     * @param {?number} [_extrusionOpacity]
     * @param {?number} [_wallOpacity]
     */
    private constructor(
        private _extrusionOpacity?: number,
        private _wallOpacity?: number,
    ) { }


    /**
     * Creator for MPSettings3D, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPSettings3DParams} object
     * @returns {MPSettings3D}
     */
    public static create(object: MPSettings3DParams): MPSettings3D {
        return new MPSettings3D(
            object?.extrusionOpacity,
            object?.wallOpacity,
        );
    }

    /**
     * Set the opacity of extruded rooms.
     *
     * @public
     * @type {number}
     */
    public set extrusionOpacity(opacity: number) {
        this._extrusionOpacity = opacity;
        MPUtils.setExtrusionOpacity(opacity)
    }

    /**
     * Get the opacity of extruded rooms.
     *
     * @public
     * @type {number}
     */
    public get extrusionOpacity(): number {
        return this._extrusionOpacity!;
    }

    /**
     * Set the opacity of extruded walls.
     *
     * @public
     * @type {number}
     */
    public set wallOpacity(opacity: number) {
        this._wallOpacity = opacity;
        MPUtils.setWallOpacity(opacity);
    }

    /**
     * Get the opacity of extruded walls.
     *
     * @public
     * @type {number}
     */
    public get wallOpacity(): number {
        return this._wallOpacity!;
    }
}

/**
 * Parameter interface for {@link MPSettings3D}.
 *
 * @export
 * @interface MPSettings3DParams
 * @typedef {MPSettings3DParams}
 */
export interface MPSettings3DParams {
    /**
     * The opacity of extruded rooms.
     *
     * @type {?number}
     */
    extrusionOpacity?: number,
    /**
     * The opacity of extruded walls.
     *
     * @type {?number}
     */
    wallOpacity?: number,
}