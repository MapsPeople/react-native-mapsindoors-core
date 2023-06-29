/**
 * A User Role that allows certain parts of the data to be viewed.
 *
 * @export
 * @class MPUserRole
 * @typedef {MPUserRole}
 */
export default class MPUserRole {


    /**
     * Creates an instance of MPUserRole.
     *
     * @constructor
     * @private
     * @param {string} id The id of the user role.
     * @param {string} name The name of the user role.
     */
    private constructor(
        public readonly id: string,
        public readonly name: string,
    ) { }

    /**
     * Creator for MPUserRole, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPUserRoleParams} object
     * @returns {MPUserRole}
     */
    public static create(object: MPUserRoleParams): MPUserRole {
        return new MPUserRole(
            object?.id,
            object?.name,
        );
    }
}

/**
 * Parameter interface for {@link MPUserRole}.
 *
 * @export
 * @interface MPUserRoleParams
 * @typedef {MPUserRoleParams}
 */
export interface MPUserRoleParams {
    /**
     * The id of the user role.
     *
     * @type {string}
     */
    id: string,
    /**
     * The name of the user role.
     *
     * @type {string}
     */
    name: string,
}