import { Platform } from "react-native";
import { MPGeometry, MPPoint, MPPolygon, MPBuilding, MPVenue, MPMultiPolygon, MPBounds, MPLocationType, MPLocationPropertyNames } from "../../index";
import MPEntity from "./MPEntity";
import MPPropertyData from "./MPPropertyData";

/**
 * A MapsIndoors geographical entity. A location can exist anywhere,
 * but it is usually only used inside {@link MPVenue}s and {@link MPBuilding}s.
 *
 * @export
 * @class MPLocation
 * @typedef {MPLocation}
 * @extends {MPEntity}
 */
export default class MPLocation extends MPEntity {
    /**
     * The locations bounds
     *
     * @private
     * @type {?MPBounds}
     */
    public bounds?: MPBounds;

    /**
     * Get whether this location's geometry is a {@link MPPoint}.
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get isPoint(): boolean {
        return this.geometry instanceof MPPoint;
    }

    /**
     * Get the location's position.
     *
     * @public
     * @override
     * @readonly
     * @type {MPPoint}
     */
    public override get position(): MPPoint {
        return this.properties?.anchor ?? new MPPoint(0, 0);
    }

    /**
     * Creates an instance of MPLocation.
     *
     * @constructor
     * @private
     * @param {string} id The location's ID.
     * @param {string[]} restrictions An array of restrictions placed on the location.
     * @param {?MPGeometry} [geometry] The geometry of the location.
     * @param {?MPPropertyData} [properties] The location's properties.
     */
    private constructor(
        readonly id: string,
        readonly restrictions: string[],
        readonly geometry?: MPGeometry,
        private properties?: MPPropertyData,
    ) {
        super("MPLocation");
        switch (this.geometry?.type) {
            case MPGeometry.multiPolygon:
            case MPGeometry.polygon: {
                this.bounds = (this.geometry as MPPolygon | MPMultiPolygon).bounds;
                break;
            }
            case MPGeometry.point:
            default: {
                this.bounds = new MPBounds(this.position, this.position);
                break;
            }
        }
    }

    /**
     * Creator for MPLocation, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {?*} [object]
     * @returns {MPLocation}
     */
    public static create(object?: any): MPLocation {
        // TODO: make sure iOS sends geometry too

        let geo: MPGeometry | undefined;
        if (object?.geometry) {
            if (Platform.OS === 'ios') {
                switch (object?.geometryType) {
                    case MPGeometry.point:
                        geo = MPPoint.create(object?.geometry);
                        break;
                    case MPGeometry.polygon:
                        geo = MPPolygon.create({coordinates: object?.geometry, bbox: [].concat(object?.entityBounds?.northeast, object?.entityBounds?.southwest)});
                        break;
                    case MPGeometry.multiPolygon:
                        geo = MPMultiPolygon.create({coordinates: object?.geometry, bbox: [].concat(object?.entityBounds?.northeast, object?.entityBounds?.southwest)})
                        break;
                    default: 
                        break;
                }
            }else {
                switch (object?.geometry?.type) {
                    case MPGeometry.point:
                        geo = MPPoint.create(object?.geometry);
                        break;
                    case MPGeometry.polygon:
                        geo = MPPolygon.create(object?.geometry);
                        break;
                    case MPGeometry.multiPolygon:
                        geo = MPMultiPolygon.create(object?.geometry);
                        break;
                    default: 
                        break;
                }
            }
        }

        return new MPLocation(
            object?.id,
            object?.restrictions,
            geo,
            MPPropertyData.create(object?.properties),
        );

    }

    /**
     * Get the location's name.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get name(): string {
        return this.properties?.name!;
    }

    /**
     * Get the location's aliases.
     *
     * @public
     * @readonly
     * @type {string[]}
     */
    public get aliases(): string[] {
        return this.properties?.aliases!;
    }

    /**
     * Get the location's categories.
     *
     * @public
     * @readonly
     * @type {(string[] | undefined)}
     */
    public get categories(): string[] | undefined {
        return (this.properties?.categories !== undefined) ?
            Array.from(this.properties!.categories!.values()) :
            undefined;
    }

    /**
     * Get the location's floorIndex.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get floorIndex(): number {
        return this.properties?.floor!;
    }

    /**
     * Get the name of the floor the location is on.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get floorName(): string {
        return this.properties?.floorName!;
    }

    /**
     * Get the name of the building the location is in.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get buildingName(): string {
        return this.properties?.building!;
    }

    /**
     * Get the name of the venue the location is on.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get venueName(): string {
        return this.properties?.venue!;
    }

    /**
     * Get the location's type name.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get typeName(): string {
        return this.properties?.type!;
    }

    /**
     * Get the location's description.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get description(): string {
        return this.properties?.description!;
    }

    /**
     * Get the location's external identifier.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get externalId(): string {
        return this.properties?.externalId!;
    }

    /**
     * Get the time location is active from.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get activeFrom(): number {
        return this.properties?.activeFrom!;
    }

    /**
     * Get the time location is active to.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get activeTo(): number {
        return this.properties?.activeTo!;
    }

    /**
     * Get the URL of the location's icon image.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get imageUrl(): string {
        return this.properties?.imageUrl!;
    }

    /**
     * Get whether the location is bookable.
     *
     * @public
     * @returns {boolean}
     */
    public isBookable(): boolean {
        return this.properties?.bookable ?? false;
    }

    /**
     * Get the location's basetype.
     *
     * @public
     * @readonly
     * @type {MPLocationType}
     */
    public get baseType(): MPLocationType {
        switch (this.properties?.type) {
            case "area": {
                return MPLocationType.area;
            }
            case "venue": {
                return MPLocationType.venue;
            }
            case "building": {
                return MPLocationType.building;
            }
            case "room": {
                return MPLocationType.room;
            }
            case "floor": {
                return MPLocationType.floor;
            }
            case "asset": {
                return MPLocationType.asset;
            }
            case "poi":
            default: {
                return MPLocationType.poi;
            }
        }
    }

    /**
     * Get a property of the location.
     *
     * @public
     * @param {MPLocationPropertyNames} key
     * @returns {*}
     */
    public getProperty(key: MPLocationPropertyNames): any {
        switch (key) {
            case MPLocationPropertyNames.name: {
                return this.properties?.name;
            }
            case MPLocationPropertyNames.aliases: {
                return this.properties?.aliases;
            }
            case MPLocationPropertyNames.categories: {
                return this.properties?.categories;
            }
            case MPLocationPropertyNames.floor: {
                return this.properties?.floor;
            }
            case MPLocationPropertyNames.floorName: {
                return this.properties?.floorName;
            }
            case MPLocationPropertyNames.building: {
                return this.properties?.building;
            }
            case MPLocationPropertyNames.venue: {
                return this.properties?.venue;
            }
            case MPLocationPropertyNames.type: {
                return this.properties?.type;
            }
            case MPLocationPropertyNames.description: {
                return this.properties?.description;
            }
            case MPLocationPropertyNames.roomId:
            case MPLocationPropertyNames.externalId: {
                return this.properties?.externalId;
            }
            case MPLocationPropertyNames.activeFrom: {
                return this.properties?.activeFrom;
            }
            case MPLocationPropertyNames.activeTo: {
                return this.properties?.activeTo;
            }
            case MPLocationPropertyNames.contact: {
                return this.properties?.contact;
            }
            case MPLocationPropertyNames.fields: {
                return this.properties?.fields;
            }
            case MPLocationPropertyNames.imageURL: {
                return this.properties?.imageUrl;
            }
            case MPLocationPropertyNames.locationType: {
                return this.properties?.locationType;
            }
            case MPLocationPropertyNames.anchor: {
                return this.properties?.anchor;
            }
            case MPLocationPropertyNames.bookable: {
                return this.properties?.bookable;
            }
        }
    }
}