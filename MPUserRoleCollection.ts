import MPCollection from "./MPCollection";
import MapsIndoors, {MPUserRole} from "../../index";

/**
 * A collection of user role objects fetched from {@link MapsIndoors}. Uses {@link MPUserRole.id} as key.
 *
 * @export
 * @class MPUserRoleCollection
 * @typedef {MPUserRoleCollection}
 * @extends {MPCollection<MPUserRole>}
 */
export default class MPUserRoleCollection extends MPCollection<MPUserRole> {
    /**
     * Creates an instance of MPUserRoleCollection.
     *
     * @constructor
     * @private
     * @param {MPUserRole[]} userroles A collection of user roles
     */
    private constructor(userroles: MPUserRole[]) {
        super();
        this.map = new Map(userroles.map((role) => [role.id, role]));
    }

    /**
     * Creator for MPUserRoleCollection, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {?*} [object]
     * @returns {MPUserRoleCollection}
     */
    public static create(object?: any) : MPUserRoleCollection {
        let userroles: MPUserRole[] = object?.map((venue: any) => MPUserRole.create(venue));
        return new MPUserRoleCollection(userroles);
    }
}