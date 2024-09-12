import { NativeModules } from 'react-native';
import { MPGeometry, MPPoint, MPCollisionHandling } from '../../index';
const { UtilsModule } = NativeModules;

/**
 * Internal - Documentation will follow.
 *
 * @export
 * @class MPUtils
 * @typedef {MPUtils}
 */
export default class MPUtils {
    /**
     * Creates an instance of MPUtils.
     *
     * @constructor
     * @private
     */
    private constructor() { }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {string} venueId
     * @returns {Promise<boolean>}
     */
    static async venueHasGraph(venueId: string): Promise<boolean> {
        return UtilsModule.venueHasGraph(venueId);
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {MPPoint} it
     * @param {MPPoint} other
     * @returns {Promise<number>}
     */
    static async pointAngleBetween(it: MPPoint, other: MPPoint): Promise<number> {
        return UtilsModule.pointAngleBetween(JSON.stringify(it), JSON.stringify(other));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {MPPoint} it
     * @param {MPPoint} other
     * @returns {Promise<number>}
     */
    static async pointDistanceTo(it: MPPoint, other: MPPoint): Promise<number> {
        return UtilsModule.pointDistanceTo(JSON.stringify(it), JSON.stringify(other));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {MPPoint} point
     * @param {MPGeometry} geometry
     * @returns {Promise<boolean>}
     */
    static async geometryIsInside(point: MPPoint, geometry: MPGeometry): Promise<boolean> {
        return UtilsModule.geometryIsInside(JSON.stringify(point), JSON.stringify(geometry));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {MPGeometry} geometry
     * @returns {Promise<number>}
     */
    static async geometryArea(geometry: MPGeometry): Promise<number> {
        return UtilsModule.geometryArea(JSON.stringify(geometry));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {MPPoint} point
     * @param {MPGeometry} polygon
     * @returns {Promise<number>}
     */
    static async polygonDistanceToClosestEdge(point: MPPoint, polygon: MPGeometry): Promise<number> {
        return UtilsModule.polygonDistanceToClosestEdge(JSON.stringify(point), JSON.stringify(polygon));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {string} venueId
     * @param {string} locationId
     * @returns {Promise<string>}
     */
    static async parseMapClientUrl(venueId: string, locationId: string): Promise<string> {
        return UtilsModule.parseMapClientUrl(venueId, locationId);
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {MPCollisionHandling} collisionHandling
     * @returns {Promise<void>}
     */
    static async setCollisionHandling(collisionHandling: MPCollisionHandling): Promise<void> {
        return UtilsModule.setCollisionHandling(collisionHandling.valueOf());
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {boolean} enableClustering
     * @returns {Promise<void>}
     */
    static async setEnableClustering(enableClustering: boolean): Promise<void> {
        return UtilsModule.enableClustering(enableClustering);
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {boolean} enableClustering
     * @returns {Promise<void>}
     */
    static async setNewSelection(isNewSelection: boolean): Promise<void> {
        return Promise.resolve(UtilsModule.setNewSelection(isNewSelection));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {number} opacity
     * @returns {Promise<void>}
     */
    static async setExtrusionOpacity(opacity: number): Promise<void> {
        return UtilsModule.setExtrusionOpacity(opacity);
    }

    /**
     * Internal - Documentation will follow.
     *
     * @static
     * @async
     * @param {number} opacity
     * @returns {Promise<void>}
     */
    static async setWallOpacity(opacity: number): Promise<void> {
        return UtilsModule.setWallOpacity(opacity);
    }

    static async setSelectable(id: string, selectable: boolean): Promise<void> {
        return UtilsModule.setSelectable(id, selectable);
    }
    
}