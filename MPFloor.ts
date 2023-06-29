import MPEntity from "./MPEntity";
import { MPMultiPolygon, MPMultiPolygonParams, MPBounds, MPPoint, MPBuilding } from "../../index";
import { Platform } from "react-native";

/**
 * A MapsIndoors geographical entity. A floor is contained within a {@link MPBuilding}.
 *
 * @export
 * @class MPFloor
 * @typedef {MPFloor}
 * @extends {MPEntity}
 */
export default class MPFloor extends MPEntity {

    /**
     * The default floor index is 0, as that is the index of ground floors and any point outside a building.
     *
     * @public
     * @static
     * @readonly
     * @type {number}
     */
    public static readonly defaultGroundFloorIndex: number = 0;

    /**
     * Creates an instance of MPFloor.
     *
     * @constructor
     * @private
     * @param {string} [id] The floor's ID.
     * @param {string} [name] The floor's name.
     * @param {?MPMultiPolygon} [geometry] The geometry of the floor.
     * @param {?string[]} [aliases] An array of aliases used by the floor.
     * @param {?number} [floorIndex] The floor index of the floor.
     * @param {?string} [buildingId] The ID of the building this floor lies within.
     */
    private constructor(
        private readonly id: string,
        private readonly name: string,
        public readonly geometry?: MPMultiPolygon,
        public readonly aliases?: string[],
        public readonly floorIndex?: number,
        public buildingId?: string,

    ) {
        super("MPFloor");
    }

    public get isPoint(): boolean {
        return false;
    }

    /**
     * Creator for MPFloor, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPFloorParams} object
     * @returns {MPFloor}
     */
    public static create(object: MPFloorParams): MPFloor {
        var multiPolygon;
        if (Platform.OS === 'ios') {
            multiPolygon = MPMultiPolygon.create({coordinates: object?.geometry, bbox: [].concat(object?.entityBounds?.northeast, object?.entityBounds?.southwest)});
        }else {
            multiPolygon = MPMultiPolygon.create(object?.geometry);
        }
        return new MPFloor(
            object?.id,
            object?.name,
            multiPolygon,
            object?.aliases,
            object?.floorIndex,
            object?.buildingId,
        );
    }

    /**
     * Get the floor's id.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get floorId(): string {
        return this.id;
    }

    /**
     * Get the floor's displayName.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get displayName(): string {
        return this.name;
    }

    /**
     * Get the floor's bounds.
     *
     * @public
     * @readonly
     * @type {MPBounds}
     */
    public get bounds(): MPBounds {
        return this.geometry!.bounds;
    }

    /**
     * Get the floor's position, this is usually the center of the floors {@link geometry}.
     *
     * @public
     * @readonly
     * @type {MPPoint}
     */
    public get position(): MPPoint {
        return this.geometry!.bounds.center;
    }

}

/**
 * Parameter interface for {@link MPFloor}.
 *
 * @export
 * @interface MPFloorParams
 * @typedef {MPFloorParams}
 */
export interface MPFloorParams {
    /**
     * The floor's ID.
     *
     * @type {string}
     */
    id: string,
    /**
     * The floor's name.
     *
     * @type {string}
     */
    name: string,
    /**
     * The geometry of the floor.
     *
     * @type {?MPMultiPolygon}
     */
    geometry: MPMultiPolygon | any,
    /**
     * An array of aliases used by the floor.
     *
     * @type {?string[]}
     */
    aliases?: string[],
    /**
     * The floor index of the floor.
     *
     * @type {?number}
     */
    floorIndex?: number,
    /**
     * The ID of the building this floor lies within.
     *
     * @type {?string}
     */
    buildingId?: string,

    entityBounds: any
}