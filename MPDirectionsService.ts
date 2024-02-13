import { NativeModules } from 'react-native';
import { MPError, MPPoint, MPRoute, MPHighway } from "../../index";

const { DirectionsService } = NativeModules;

/**
 * Service used to generate a route between two {@link MPPoint}s.
 *
 * @export
 * @class MPDirectionsService
 * @typedef {MPDirectionsService}
 */
export default class MPDirectionsService {
    /**
     * Creates an instance of MPDirectionsService.
     *
     * @constructor
     * @private
     * @param {string} id
     */
    private constructor(private readonly id: string) { }

    /**
     * Creates a new service.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPDirectionsService>}
     */
    public static async create(): Promise<MPDirectionsService> {
        return DirectionsService.create().then((resolve: string) => new MPDirectionsService(resolve));
    }

    /**
     * Add an avoidWayType, these are based on [OSM highways](https://wiki.openstreetmap.org/wiki/Key:highway).
     * 
     * Supported types are defined in {@link MPHighway}.
     *
     * @public
     * @async
     * @param {string} wayType
     * @returns {Promise<void>}
     */
    public async addAvoidWayType(wayType: string): Promise<void> {
        return DirectionsService.addAvoidWayType(wayType, this.id);
    }

    /**
     * Clears all added avoidWayTypes.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async clearWayType(): Promise<void> {
        return DirectionsService.clearWayType(this.id);
    }

    /**
     * Add an excludeWayType, these are based on [OSM highways](https://wiki.openstreetmap.org/wiki/Key:highway).
     * 
     * Supported types are defined in {@link MPHighway}.
     *
     * @public
     * @async
     * @param {string} wayType
     * @returns {Promise<void>}
     */
    public async addExcludeWayType(wayType: string): Promise<void> {
        return DirectionsService.addExcludeWayType(wayType, this.id);
    }

    /**
     * Clears all added excludeWayType.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async clearExcludeWayType(): Promise<void> {
        return DirectionsService.clearExcludeWayType(this.id);
    }

    /**
     * Sets whether routes should use departure time or arrival time when using the transit travel mode.
     *
     * @public
     * @async
     * @param {boolean} isDeparture
     * @returns {Promise<void>}
     */
    public async setIsDeparture(isDeparture: boolean): Promise<void> {
        return DirectionsService.setIsDeparture(isDeparture, this.id);
    }

    /**
     * Queries the routing network to generate a route from the origin to the destination.
     *
     * @public
     * @async
     * @param {MPPoint} origin
     * @param {MPPoint} destination
     * @returns {Promise<MPRoute>}
     */
    public async getRoute(origin: MPPoint, destination: MPPoint): Promise<MPRoute> {
        let res = await DirectionsService.getRoute(JSON.stringify(origin), JSON.stringify(destination), this.id);
        if (res.route !== undefined) {
            return Promise.resolve(MPRoute.create(JSON.parse(res.route)));
        } else {
            return Promise.reject(MPError.create(JSON.parse(res.error)));
        }
    }

    /**
     * defines the travel mode for routes, can be one of the following:
     * * "walking"
     * * "bicycling"
     * * "driving"
     * * "transit"
     *
     * @public
     * @async
     * @param {string} travelMode
     * @returns {Promise<void>}
     */
    public async setTravelMode(travelMode: string): Promise<void> {
        return DirectionsService.setTravelMode(travelMode, this.id);
    }

    /**
     * sets the wanted arrival/departure time for routes generated with this [MPDirectionsService]
     * 
     * this setting is used in conjunction with {@link setIsDeparture} and {@link setTravelMode}.
     *
     * @public
     * @async
     * @param {number} time
     * @returns {Promise<void>}
     */
    public async setTime(time: number): Promise<void> {
        return DirectionsService.setTime(time, this.id);
    }
}