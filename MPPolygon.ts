import { MPPoint, MPGeometry, MPBounds } from "../../index";
import MPUtils from "./MPUtils";

/**
 * MPPolygon is a collection of {@link MPPoint}s that combine
 * to form a single geographical area with a single body.
 *
 * @export
 * @class MPPolygon
 * @typedef {MPPolygon}
 * @extends {MPGeometry}
 */
export default class MPPolygon extends MPGeometry {
    /**
     * bounds cache.
     *
     * @private
     * @type {?MPBounds}
     */
    private _bounds?: MPBounds;
    /**
     * area cache.
     *
     * @private
     * @type {?number}
     */
    private _area?: number;

    /**
     * Creates an instance of MPPolygon.
     *
     * @constructor
     * @private
     * @param {number[][][]} _coordinates
     * @param {number[]} _bbox
     */
    private constructor(
        private _coordinates: number[][][], 
        private _bbox: number[]
    ) {
        super();
    }

    /**
     * Update the polygon's bounding box, the bounding box must be in 
     * [GeoJson format]{@link https://stevage.github.io/geojson-spec/#section-5}
     *
     * @public
     * @type {{}}
     */
    public set bbox(box: number[]) {
        this._bbox = box;
        this.clearCache();
    }

    /**
     * Get the polygon's bounding box, the bounding box is in 
     * [GeoJson format]{@link https://stevage.github.io/geojson-spec/#section-5}
     *
     * @public
     * @type {number[]}
     */
    public get bbox(): number[] {
        return this._bbox;
    }

    /**
     * Update the coordinates list for the polygon, the coordinates must be in 
     * [GeoJSON format]{@link https://stevage.github.io/geojson-spec/#section-3.1.6}
     *
     * @public
     * @type {number[][][]}
     */
    public set coordinates(coordinates: number[][][]) {
        this._coordinates = coordinates;
        this.clearCache();
    }

    /**
     * Get the coordinates as a collection in 
     * [GeoJSON format]{@link https://stevage.github.io/geojson-spec/#section-3.1.6}.
     *
     * @public
     * @type {number[][][]}
     */
    public get coordinates(): number[][][] {
        return this._coordinates;
    }

    /**
     * Get the polygon's bounds. If {@link bbox} is present then that will be used.
     *
     * @public
     * @readonly
     * @type {MPBounds}
     */
    public get bounds(): MPBounds {
        if (this._bounds == undefined) {
            this._bounds = MPBounds.fromBBox(this._bbox)
        }
        return this._bounds;
    }

    /**
     * Get the polygon's area.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getArea(): Promise<number> {
        if (this._area == undefined) {
            this._area = await MPUtils.geometryArea(this);
        }
        return Promise.resolve(this._area);
    }

    /**
     * Get the position of the polygon, which is roughly its center.
     *
     * @public
     * @readonly
     * @type {MPPoint}
     */
    public get position(): MPPoint {
        return this.bounds.center;
    }

    /**
     * Get the type of the polygon. see {@link MPGeometry#polygon}
     *
     * @public
     * @readonly
     * @type {string}
     */
    public get type(): string {
        return MPGeometry.polygon;
    }


    /**
     * Creator for MPPolygon, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPPolygonParams} object
     * @returns {MPPolygon}
     */
    public static create(object: MPPolygonParams): MPPolygon {
        return new MPPolygon(object?.coordinates, object?.bbox);
    }

    /**
     * Calculates the squared distance from the point to the closest edge in the polygon.
     *
     * @public
     * @async
     * @param {MPPoint} point
     * @returns {Promise<number>}
     */
    public async distanceToClosestEdge(point: MPPoint): Promise<number> {
        return MPUtils.polygonDistanceToClosestEdge(point, this);
    }

    /**
     * Clears area and bounds cache due to geometry recalculation.
     *
     * @private
     */
    private clearCache() {
        this._area = undefined;
        this._bounds = undefined;
    }

 
    /**
     * Parses the object to a JSON object that is compatible with the MapsIndoors SDK.
     *
     * @public
     * @returns {MPPolygonParams}
     */
    public toJSON(): MPPolygonParams {
        return {
            type: this.type,
            coordinates: this._coordinates, 
            bbox: this._bbox,
        }
    }
}


/**
 * Parameter interface for {@link MPPolygon}.
 *
 * @export
 * @interface MPPolygonParams
 * @typedef {MPPolygonParams}
 */
export interface MPPolygonParams {

    /**
     * the type of the geometry, leave this blank as it is just used to parse the geometry to JSON
     * 
     * @type {string}
     */
    type?: string,
    /**
     * Geometry, as specified in the [GeoJSON format]{@link https://stevage.github.io/geojson-spec/#section-3.1.6}.
     *
     * @type {number[][][]}
     */
    coordinates: number[][][],
    /**
     * bounding box, as specified in the [GeoJson format]{@link https://stevage.github.io/geojson-spec/#section-5}.
     *
     * @type {number[]}
     */
    bbox: number[],
}