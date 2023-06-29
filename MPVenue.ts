import { Platform } from "react-native";
import { MPPoint, MPPointParams, MPBounds, MPMapStyle, MPPolygon, MPVenueInfo, MPDataField, MPBuilding, MPLocation } from '../../index';
import MPEntity from "./MPEntity";
import MPUtils from "./MPUtils";

/**
 * A MapsIndoors geographical entity. A venue can exist anywhere,
 * and it can contain a number of {@link MPBuilding}s and {@link MPLocation}s.
 *
 * @export
 * @class MPVenue
 * @typedef {MPVenue}
 * @extends {MPEntity}
 */
export default class MPVenue extends MPEntity {

    /**
     * Creates an instance of MPVenue.
     *
     * @constructor
     * @param {string} id The venue's ID.
     * @param {string} administrativeId The venue's readable ID.
     * @param {string} tilesUrl The URL that is used to fetch tiles for the venue.
     * @param {MPMapStyle[]} mapStyles An array of mapStyles that can be used on this venue.
     * @param {MPPolygon} geometry The geometry of the venue.
     * @param {number} defaultFloor The venue's defalt floor index.
     * @param {MPVenueInfo} venueInfo A collection of information about the venue.
     * @param {MPPoint} anchor The anchor point for the location.
     * @param {MPPoint[]} entryPoints Points of entry that are used to create routes between MapsIndoors and the underlying map.
     * @param {string} [externalId] An optional ID used to map the venue to a customer's ID.
     * @param {?string} [graphId] The ID of the graph used to route on this venue.
     */
    constructor(
        public readonly id: string,
        public readonly administrativeId: string,
        public readonly tilesUrl: string,
        public readonly mapStyles: MPMapStyle[],
        public readonly geometry: MPPolygon,
        public readonly defaultFloor: number,
        public readonly venueInfo: MPVenueInfo,
        public readonly anchor: MPPoint,
        public readonly entryPoints: MPPoint[],
        public readonly externalId: string,
        public readonly graphId?: string,
    ) {
        super("MPVenue");
    }

    /**
     * Creator for MPVenue, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPVenueParams} object
     * @returns {MPVenue}
     */
    public static create(object: MPVenueParams): MPVenue {
        var polygon;

        if (Platform.OS === 'ios') {
            polygon = MPPolygon.create({coordinates: object?.geometry, bbox: [].concat(object?.bbox?.northeast, object?.bbox?.southwest)});
        }else {
            polygon = MPPolygon.create(object?.geometry);
        }
        return new MPVenue(
            object?.id,
            object?.name,
            object?.tilesUrl,
            object?.styles?.map((style: any) => MPMapStyle.create(style)),
            polygon,
            object?.defaultFloor,
            MPVenueInfo.create(object?.venueInfo),
            MPPoint.create(object?.anchor),
            object?.entryPoints?.map((entryPoint: any) => MPPoint.create(entryPoint)),
            object?.externalId,
            object?.graphId,
        );
    }

    /**
     * Get the venue's name.
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get name(): string {
        return this.venueInfo?.name;
    }

    /**
     * Get the venue's bounds.
     *
     * @public
     * @readonly
     * @type {MPBounds}
     */
    public get bounds(): MPBounds {
        return this.geometry.bounds;
    }

    /**
     * Get the position of the venue, this will correspond to the venue's anchor point.
     *
     * @public
     * @readonly
     * @type {MPPoint}
     */
    public get position(): MPPoint {
        return this.anchor;
    }

    /**
     * Inherited from {@link MPEntity}, a venue's geometry is never a {@link MPPoint}.
     *
     * @public
     * @readonly
     * @type {boolean}
     */
    public get isPoint(): boolean {
        return false;
    }

    /**
     * Get the venue's default mapstyle.
     *
     * @public
     * @readonly
     * @type {MPMapStyle}
     */
    public get defaultMapStyle(): MPMapStyle {
        return this.mapStyles[0];
    }

    /**
     * Fetch a field from the venue's info member.
     *
     * @public
     * @param {?string} [key]
     * @returns {(MPDataField | undefined)}
     */
    public getField(key?: string): MPDataField | undefined {
        if (key !== undefined) {
            return this.venueInfo.fields?.get(key);
        }
    }

    /**
     * Check whether a given mapstyle is valid for the venue.
     *
     * @public
     * @param {?MPMapStyle} [style]
     * @returns {boolean}
     */
    public isMapStyleValid(style?: MPMapStyle) : boolean {
        if (style) {
            this.mapStyles.forEach((value: MPMapStyle) => {
                if (style == value) {
                    return true;
                }
            });
        }
        return false;
    }

    /**
     * Check whether the venue has a valid routing graph.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async hasGraph(): Promise<boolean> {
        return MPUtils.venueHasGraph(this.id);
    }

    /**
     * Check whether the venue contains a point.
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
     * @returns {MPVenueParams}
     */
    public toJSON(): MPVenueParams {
        return {
            id: this.id,
            graphId: this.graphId,
            name: this.administrativeId,
            tilesUrl: this.tilesUrl,
            styles: this.mapStyles,
            geometry: this.geometry,
            defaultFloor: this.defaultFloor,
            venueInfo: this.venueInfo,
            anchor: this.anchor.toJSON(),
            entryPoints: this.entryPoints,
            externalId: this.externalId,
        }
    }
}

/**
 * Parameter interface for {@link MPVenue}.
 *
 * @export
 * @interface MPVenueParams
 * @typedef {MPVenueParams}
 */
export interface MPVenueParams {
    /**
     * The venue's ID.
     *
     * @type {string}
     */
    id: string,
    /**
     * The venue's readable ID.
     *
     * @type {string}
     */
    name: string,
        /**
     * An ID used to map the venue to a customer's ID.
     *
     * @type {?string}
     */
    externalId: string,
    /**
     * The URL that is used to fetch tiles for the venue.
     *
     * @type {string}
     */
    tilesUrl: string,
    /**
     * An array of mapStyles that can be used on this venue.
     *
     * @type {MPMapStyle[]}
     */
    styles: MPMapStyle[],
    /**
     * The geometry of the venue.
     *
     * @type {MPPolygon}
     */
    geometry: MPPolygon | any,
    /**
     * The venue's defalt floor index.
     *
     * @type {number}
     */
    defaultFloor: number,
    /**
     * A collection of information about the venue.
     *
     * @type {MPVenueInfo}
     */
    venueInfo: MPVenueInfo,
    /**
     * The anchor point for the venue.
     *
     * @type {MPPointParams}
     */
    anchor: MPPointParams,
    /**
     * Points of entry that are used to create routes between MapsIndoors and the underlying map.
     *
     * @type {MPPoint[]}
     */
    entryPoints: MPPoint[],
    /**
     * The ID of the graph used to route on this venue.
     *
     * @type {?string}
     */
    graphId?: string,
    /**
     * A object of two arrays representing coordinates
     * Northeast & Southwest
     * 
     * @type {any}
     */
    bbox?: any
}