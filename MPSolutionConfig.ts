import { MPCollisionHandling, MPSettings3D } from "../../index";
import MPLocationSettings from "./MPLocationSettings";
import MPUtils from "./MPUtils";

/**
 * An object that governs solution level settings such as:
 * * Marker clustering
 * * Marker collision handling
 * * {@link MPSettings3D}
 *
 * @export
 * @class MPSolutionConfig
 * @typedef {MPSolutionConfig}
 */
export default class MPSolutionConfig {


    /**
     * Creates an instance of MPSolutionConfig.
     *
     * @constructor
     * @private
     * @param {string} id
     * @param {MPSettings3D} settings3D
     * @param {?boolean} [_enableClustering]
     * @param {?MPCollisionHandling} [_mpCollisionHandling]
     * @param {?boolean} [_isNewSelection]
     * @param {?number} [_automatedZoomLimit]
     * @param {?number} [_iconScaleZoomFrom]
     * @param {?number} [_iconScaleZoomTo]
     */
    private constructor(
        public readonly id: string,
        public readonly settings3D: MPSettings3D,
        public readonly locationSettings: MPLocationSettings,
        private _enableClustering?: boolean,
        private _mpCollisionHandling?: MPCollisionHandling,
        private _isNewSelection?: boolean,
        private _automatedZoomLimit?: number,
        private _iconScaleZoomFrom?: number,
        private _iconScaleZoomTo?: number,
    ) { }


    /**
     * Creator for MPSolutionConfig, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPSolutionConfigParams} object
     * @returns {MPSolutionConfig}
     */
    public static create(object: MPSolutionConfigParams): MPSolutionConfig {
        return new MPSolutionConfig(
            object?.id,
            MPSettings3D.create(object?.settings3D),
            MPLocationSettings.create("solution", object?.locationSettings),
            object?.enableClustering,
            object?.collisionHandling,
            object?.isNewSelection,
            object?.automatedZoomLimit,
            object?.iconScaleZoomFrom,
            object?.iconScaleZoomTo,
        );
    }

    /**
     * Set the type of collisionHandling.
     *
     * @public
     * @type {*}
     */
    public set collisionHandling(collisionHandling: MPCollisionHandling) {
        this._mpCollisionHandling = collisionHandling;
        MPUtils.setCollisionHandling(collisionHandling);
    }

    /**
     * Set the automated zoom limit.
     * 
     * @public
     * @type {number}
     */
    public set automatedZoomLimit(automatedZoomLimit: number) {
        this._automatedZoomLimit = automatedZoomLimit;
        if (automatedZoomLimit == null) {
            MPUtils.setAutomatedZoomLimit(-1);
        }else {
            MPUtils.setAutomatedZoomLimit(automatedZoomLimit);
        }
    }

    /**
     * Get the type of collisionHandling that is set.
     *
     * @public
     * @type {MPCollisionHandling}
     */
    public get collisionHandling(): MPCollisionHandling {
        return this._mpCollisionHandling ? this._mpCollisionHandling : MPCollisionHandling.allowOverlap;
    }

    /**
     * Set whether clustering is enabled.
     *
     * @public
     * @type {boolean}
     */
    public set enableClustering(enable: boolean) {
        this._enableClustering = enable;
        MPUtils.setEnableClustering(enable);
    }

    /**
     * Get whether clustering is enabled.
     *
     * @public
     * @type {boolean}
     */
    public get enableClustering(): boolean {
        return this._enableClustering ? this._enableClustering : true;
    }

    public set isNewSelection(enable: boolean) {
        this._isNewSelection = enable;
        MPUtils.setNewSelection(enable);
    }

    public get isNewSelection(): boolean {
        return this._isNewSelection ? this._isNewSelection : true;
    }

    public get selectable(): boolean | undefined {
        return this.locationSettings.selectable;
    }

    public set selectable(selectable: boolean | undefined) {
        this.locationSettings.selectable = selectable;
    }

    /**
     * Get the bottom of this solution's icon-scale zoom band, in MapsIndoors zoom.
     *
     * Below this zoom level every icon renders at its normal size; from here up to
     * {@link MPSolutionConfig.iconScaleZoomTo} it grows towards its display rule's
     * {@link MPDisplayRule.getIconZoomFactor}.
     *
     * Returns exactly what the solution stored, `undefined` included. Absence of the band **is**
     * the signal that this solution has not opted in to zoom-responsive icon scaling, so it is
     * never default-hydrated: do not read an absent bound as 18.
     *
     * Read-only. The band is a solution-level setting authored in the MapsIndoors CMS; the native
     * SDKs' runtime band setters are not exposed through this wrapper.
     *
     * @public
     * @readonly
     * @type {number | undefined}
     */
    public get iconScaleZoomFrom(): number | undefined {
        return this._iconScaleZoomFrom;
    }

    /**
     * Get the top of this solution's icon-scale zoom band, in MapsIndoors zoom.
     *
     * At and above this zoom level every icon renders at its display rule's
     * {@link MPDisplayRule.getIconZoomFactor} times its normal size.
     *
     * @public
     * @readonly
     * @type {number | undefined}
     * @see {@link MPSolutionConfig.iconScaleZoomFrom}
     */
    public get iconScaleZoomTo(): number | undefined {
        return this._iconScaleZoomTo;
    }
}

/**
 * Parameter interface for {@link MPSolutionConfig}.
 *
 * @export
 * @interface MPSolutionConfigParams
 * @typedef {MPSolutionConfigParams}
 */
export interface MPSolutionConfigParams {
    /**
     * The configuration object's ID.
     *
     * @type {string}
     */
    id: string,
    /**
     * Settings related to 3D rendering.
     *
     * @type {MPSettings3D}
     */
    settings3D: MPSettings3D,
    /**
     * Clustering setting.
     *
     * @type {?boolean}
     */
    enableClustering?: boolean,
    /**
     * Collision setting.
     *
     * @type {?MPCollisionHandling}
     */
    collisionHandling?: MPCollisionHandling,
    /**
     * New selection setting
     * 
     * @type {?boolean}
     */
    isNewSelection?: boolean,

    /**
     * Location settings
     * 
     * @type {MPLocationSettings}
     */
    locationSettings: MPLocationSettings,

    /**
     * Automated zoom limit
     * 
     * @type {number}
     */
    automatedZoomLimit?: number,

    /**
     * Bottom of the icon-scale zoom band, in MapsIndoors zoom, exactly as the solution stored it.
     *
     * Nullable and never default-hydrated: absence of the band is the signal that the solution has
     * not opted in to zoom-responsive icon scaling.
     *
     * @type {?number}
     */
    iconScaleZoomFrom?: number,

    /**
     * Top of the icon-scale zoom band, in MapsIndoors zoom, exactly as the solution stored it.
     *
     * @type {?number}
     */
    iconScaleZoomTo?: number,
}