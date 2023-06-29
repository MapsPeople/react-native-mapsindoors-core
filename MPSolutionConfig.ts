import { MPCollisionHandling, MPSettings3D } from "../../index";
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
     */
    private constructor(
        public readonly id: string,
        public readonly settings3D: MPSettings3D,
        private _enableClustering?: boolean,
        private _mpCollisionHandling?: MPCollisionHandling,
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
            object?.enableClustering,
            object?.collisionHandling,
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
     * Get the type of collisionHandling that is set.
     *
     * @public
     * @type {MPCollisionHandling}
     */
    public get collisionHandling(): MPCollisionHandling {
        return this._mpCollisionHandling ?? MPCollisionHandling.allowOverlap;
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
        return this._enableClustering ?? true;
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
}