import MPPoint from "./MPPoint";
import { Platform } from "react-native";

/**
 * A simple representation of a bounding box.
 *
 * @export
 * @class MPBounds
 * @typedef {MPBounds}
 */
export default class MPBounds {
    /**
     * Creates an instance of MPBounds.
     *
     * @constructor
     * @public
     * @param {MPPoint} northeast The northeastern most point.
     * @param {MPPoint} southwest The southwestern most point.
     */
    public constructor(
        public readonly northeast: MPPoint, 
        public readonly southwest: MPPoint) {
        this.northeast = northeast;
        this.southwest = southwest;
    }

    /**
     * Creator for MPBounds, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPBoundsParams} object
     * @returns {MPBounds}
     */
    public static create(object: MPBoundsParams): MPBounds {
        var bounds;
        if ((object as any).northeast.lat != null) {
            var northeast = new MPPoint((object as any).northeast.lat, (object as any).northeast.lng, (object as any).northeast.zLevel);
            var southwest = new MPPoint((object as any).southwest.lat, (object as any).southwest.lng, (object as any).southwest.zLevel);
            bounds = new MPBounds(northeast, southwest)
        }else {
            bounds = new MPBounds(
                object.northeast,
                object.southwest,
            );
        }
        return bounds
    }

    /**
     * Create a MPBounds from a Bounding Box.
     *
     * @public
     * @static
     * @param {number[]} bbox
     * @returns {MPBounds}
     */
    public static fromBBox(bbox: number[]): MPBounds {
        return new MPBounds(
            new MPPoint(bbox[3], bbox[2]),
            new MPPoint(bbox[1], bbox[0]),
        );
    }

    /**
     * The center of the bounds.
     *
     * @public
     * @readonly
     * @type {MPPoint}
     */
    public get center(): MPPoint {
        let latCenter = (this.northeast.latitude + this.southwest.latitude) / 2;
        let lngCenter = (this.northeast.longitude + this.southwest.longitude) / 2;
        return new MPPoint(latCenter, lngCenter);
    }

    /**
     * Check whether a point is containted within the bounds.
     *
     * @public
     * @param {MPPoint} point
     * @returns {boolean}
     */
    public contains(point: MPPoint): boolean {
        return ((point.latitude <= this.northeast.latitude &&
            point.latitude >= this.southwest.latitude)) &&
            ((point.longitude <= this.northeast.longitude &&
                point.longitude >= this.southwest.longitude));
    }


    public toJSON() {
        if(Platform.OS === 'ios') {
            return {
                "northeast": [this.northeast.longitude, this.northeast.latitude],
                "southwest": [this.southwest.longitude, this.southwest.latitude],
            }
        } else {
            return {
                "northeast": this.northeast,
                "southwest": this.southwest,
            }
        }
    }

    /**
     * Construct a bounds object from a collection of points, to ensure that the bounds contains all of them.
     *
     * @class
     */
    public static Builder = class {
        public north = Number.NEGATIVE_INFINITY;
        public south = Number.POSITIVE_INFINITY;
        public east = Number.NEGATIVE_INFINITY;
        public west = Number.POSITIVE_INFINITY;

        public include(point: MPPoint) {
            this.north = Math.max(this.north, point.latitude);
            this.south = Math.min(this.south, point.latitude);
            this.east = Math.max(this.east, point.longitude);
            this.west = Math.min(this.west, point.longitude);
        }

        public build(): MPBounds {
            if (this.north == Number.POSITIVE_INFINITY) {
                throw Error("Cannot build bounds with no coordinates");
            }

            return new MPBounds(new MPPoint(this.north, this.east), new MPPoint(this.south, this.west));
        }
    }
}

/**
 * Parameter interface for {@link MPBounds}.
 *
 * @export
 * @interface MPBoundsParams
 * @typedef {MPBoundsParams}
 */
export interface MPBoundsParams {
    /**
     * A point.
     *
     * @type {MPPoint}
     */
    southwest: MPPoint;
    /**
     * A point.
     *
     * @type {MPPoint}
     */
    northeast: MPPoint;
}