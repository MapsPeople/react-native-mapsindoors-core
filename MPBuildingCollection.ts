import MPBuilding from "./MPBuilding";
import MPCollection from "./MPCollection";

/**
 * A simple collection holder for buildings.
 *
 * @export
 * @class MPBuildingCollection
 * @typedef {MPBuildingCollection}
 * @extends {MPCollection<MPBuilding>}
 */
export default class MPBuildingCollection extends MPCollection<MPBuilding> {
    /**
     * A custom map of buildings by their names.
     *
     * @private
     * @type {!Map<String, MPBuilding>}
     */
    private nameMap!: Map<String, MPBuilding>;

    /**
     * Creates an instance of MPBuildingCollection.
     *
     * @constructor
     * @private
     * @param {MPBuilding[]} buildings A collection of buildings used in MapsIndoors.
     */
    private constructor(buildings: MPBuilding[]) {
        super();
        this.map = new Map(buildings.map((building) => [building.buildingId, building]));
        this.nameMap = new Map(buildings.map((building) => [building.administrativeId.toLowerCase(), building]));
    }

    /**
     * Get a building by its {@link MPBuilding.administrativeId}.
     *
     * @public
     * @param {string} id
     * @returns {(MPBuilding | undefined)}
     */
    public getBuildingByAdminId(id: string) : MPBuilding | undefined {
        return this.nameMap.get(id.toLowerCase());
    }

    /**
     * Creator for MPBuildingCollection, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {?*} [object]
     * @returns {MPBuildingCollection}
     */
    public static create(object?: any) : MPBuildingCollection {
        let buildings: MPBuilding[] = object?.map((building: any) => MPBuilding.create(building));
        return new MPBuildingCollection(buildings);
    }
}