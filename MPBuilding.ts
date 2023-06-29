import MPEntity from "./MPEntity";
import { MPPoint, MPPolygon, MPFloor, MPBounds, MPDataField, MPPointParams, MPFloorParams } from "../../index";
import MPBuildingInfo, { MPBuildingInfoParams } from "./MPBuildingInfo";
import { Platform } from "react-native";

/**
 * An entity that contains information about a specific building.
 *
 * @export
 * @class MPBuilding
 * @typedef {MPBuilding}
 * @extends {MPEntity}
 */
export default class MPBuilding extends MPEntity {
    /**
     * Creates an instance of MPBuilding.
     *
     * @constructor
     * @private
     * @param {string} id The building's ID.
     * @param {string} administrativeId The building's readable ID.
     * @param {string} externalId An ID used to map the building to a customer's ID.
     * @param {string} venueId The ID of the venue this building lies within.
     * @param {MPPoint} anchor The anchor point for the building.
     * @param {MPPolygon} geometry The geometry of the building.
     * @param {Map<number, MPFloor>} _floors A map of the floors inside the building.
     * @param {number} defaultFloor The default floor index for the building.
     * @param {string} address The building's address.
     * @param {?MPBuildingInfo} [buildingInfo] A collection of information about the building.
     */
    private constructor(
        private readonly id: string,
        public readonly administrativeId: string,
        public readonly externalId: string,
        public readonly venueId: string,
        private readonly anchor: MPPoint,
        public readonly geometry: MPPolygon,
        private readonly _floors: Map<number, MPFloor>,
        public readonly defaultFloor: number,
        public readonly address: string,
        private readonly buildingInfo?: MPBuildingInfo,
    ) {
        super("MPBuilding");
    }

    /**
     * Creator for MPBounds, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPBuildingParams} object
     * @returns {MPBuilding}
     */
    public static create(object: MPBuildingParams): MPBuilding {
        let floors: Map<number, MPFloor> = new Map();
        if (object?.floors !== undefined) {
            floors = new Map(Object.entries(object?.floors).map(([key, value]) => [Number.parseInt(key), MPFloor.create(value as MPFloorParams)]));
            // Object.keys(object?.floors).forEach(key => {
            //     floors.set(Number.parseInt(key), MPFloor.create(object?.floors[key] as unknown as MPFloorParams))
            // });
        }
        floors.forEach((value: MPFloor) => {
            value.buildingId = object?.id;
        });

        var polygon;

        if(Platform.OS === 'ios') {
            polygon = MPPolygon.create({coordinates: object?.geometry, bbox: [].concat(object?.boundingBox?.northeast, object?.boundingBox?.southwest)});
        }else {
            polygon = MPPolygon.create(object?.geometry);
        }

        return new MPBuilding(
            object?.id,
            object?.administrativeId,
            object?.externalId,
            object?.venueId,
            MPPoint.create(object?.anchor),
            polygon,
            floors,
            object?.defaultFloor,
            object?.address,
            MPBuildingInfo.create(object?.buildingInfo as MPBuildingInfoParams),
        );
    }

    /**
     * Get the building's id.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get buildingId(): string {
        return this.id;
    }

    /**
     * Get the building's bounds.
     *
     * @public
     * @readonly
     * @type {MPBounds}
     */
    public get bounds(): MPBounds {
        return this.geometry.bounds;
    }

    /**
     * Get the position of the building, this will correspond to the building's anchor point.
     *
     * @public
     * @readonly
     * @type {MPPoint}
     */
    public get position(): MPPoint {
        return this.anchor;
    }

    
    /**
     * Overload from MPEntity, will return false.
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get isPoint(): boolean {
        return false;
    }

    /**
     * Get the building's name.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get name(): string {
        return this.buildingInfo?.name ?? "";
    }

    /**
     * Get a list of aliases for the building.
     *
     * @public
     * @readonly
     * @type {string[]}
     */
    public get aliases(): string[] {
        return this.buildingInfo?.aliases ?? [];
    }

    /**
     * Get the number of {@link MPFloor}s in the building.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get floorCount(): number {
        return this._floors.size;
    }

    /**
     * Get a list of the floors in the building.
     *
     * @public
     * @readonly
     * @type {MPFloor[]}
     */
    public get floors(): MPFloor[] {
        return Array.from(this._floors.values());
    }

    /**
     * Get the default floor index.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get initialFloorIndex(): number {
        return this.defaultFloor ?? this.floors[0].floorIndex ?? 0;
    }

    /**
     * Check whether the building contains a floor with the {@link floorIndex}.
     *
     * @public
     * @param {number} floorIndex
     * @returns {boolean}
     */
    public hasFloorIndex(floorIndex: number): boolean {
        return this._floors.has(floorIndex);
    }

    /**
     * Get a floor by its floor index.
     *
     * @public
     * @param {number} floorIndex
     * @returns {MPFloor}
     */
    public getFloorByIndex(floorIndex: number): MPFloor | undefined {
        return this._floors.get(floorIndex);
    }

    /**
     * Fetch a custom field from the building.
     *
     * @public
     * @param {?string} [key]
     * @returns {(MPDataField | undefined)}
     */
    public getField(key?: string): MPDataField | undefined {
        if (key !== undefined) {
            return this.buildingInfo?.fields?.get(key);
        }
    }

    /**
     * Check whether the building's geometry contains the point.
     *
     * @public
     * @async
     * @param {MPPoint} point
     * @returns {Promise<boolean>}
     */
    public async contains(point: MPPoint): Promise<boolean> {
        return this.geometry.contains(point);
    }


    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPBuildingParams}
     */
    public toJSON(): MPBuildingParams {
        return {
            "id": this.id,
            "administrativeId": this.administrativeId,
            "externalId": this.externalId,
            "venueId": this.venueId,
            "anchor": this.anchor.toJSON(),
            "buildingInfo": this.buildingInfo,
            "geometry": this.geometry,
            "floors": this._floors,
            "defaultFloor": this.defaultFloor,
            "address": this.address,
            "boundingBox": this.bounds.toJSON()
        }
    }
}

/**
 * Parameter interface for {@link MPBuilding}.
 *
 * @export
 * @interface MPBuildingParams
 * @typedef {MPBuildingParams}
 */
export interface MPBuildingParams {
    /**
     * The building's ID.
     *
     * @type {string}
     */
    id: string,
    /**
     * The building's readable ID.
     *
     * @type {string}
     */
    administrativeId: string,
    /**
     * An ID used to map the building to a customer's ID.
     *
     * @type {string}
     */
    externalId: string,
    /**
     * The ID of the venue this building lies within.
     *
     * @type {string}
     */
    venueId: string,
    /**
     * The anchor point for the building.
     *
     * @type {MPPointParams}
     */
    anchor: MPPointParams,
    /**
     * The geometry of the building.
     *
     * @type {MPPolygon}
     */
    geometry: MPPolygon | any,
    /**
     * A map of the floors inside the building.
     *
     */
    floors: object,
    /**
     * The default floor index for the building.
     *
     * @type {number}
     */
    defaultFloor: number,
    /**
     * The building's address.
     *
     * @type {string}
     */
    address: string,
    /**
     * A collection of information about the building.
     *
     * @type {?MPBuildingInfo}
     */
    buildingInfo?: MPBuildingInfo,

    /**
     * A object of two arrays representing coordinates
     * Northeast & Southwest
     * 
     * @type {any}
     */
    boundingBox?: any
}