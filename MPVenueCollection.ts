import MPCollection from "./MPCollection";
import MPVenue from "./MPVenue";

/**
 * Description placeholder.
 *
 * @export
 * @class MPVenueCollection
 * @typedef {MPVenueCollection}
 * @extends {MPCollection<MPVenue>}
 */
export default class MPVenueCollection extends MPCollection<MPVenue> {
    /**
     * Internal.
     * 
     * Map between administrative ID and venues.
     *
     * @private
     * @type {!Map<String, MPVenue>}
     */
    private adminIdMap!: Map<String, MPVenue>;

    /**
     * Creates an instance of MPVenueCollection.
     *
     * @constructor
     * @private
     * @param {MPVenue[]} venues A collection of venues used in MapsIndoors.
     */
    private constructor(venues: MPVenue[]) {
        super();
        this.map = new Map(venues.map((venue) => [venue.id, venue]));
        this.adminIdMap = new Map(venues.map((venue) => [venue.administrativeId.toLowerCase(), venue]));
    }

    /**
     * Fetch a venue by its administrative id.
     *
     * @public
     * @param {string} id
     * @returns {(MPVenue | undefined)}
     */
    public getVenueByAdminId(id: string) : MPVenue | undefined {
        return this.adminIdMap.get(id.toLowerCase());
    }

    /**
     * Creator for MPVenueCollection, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {?*} [object]
     * @returns {MPVenueCollection}
     */
    static create(object?: any) : MPVenueCollection {
        let venues: MPVenue[] = object?.map((venue: any) => MPVenue.create(venue));
        return new MPVenueCollection(venues);
    }
}