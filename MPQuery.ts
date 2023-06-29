import { MPPoint, MPLocationPropertyNames } from "../../index";

/**
 * A collection of query parameters used to query entities in MapsIndoors.
 *
 * @export
 * @class MPQuery
 * @typedef {MPQuery}
 */
export default class MPQuery {

    /**
     * Creates an instance of MPQuery.
     *
     * @constructor
     * @private
     * @param {?string} [query] The queried text (search text).
     * @param {?MPPoint} [near] The query is restricted to entities near this point.
     * @param {?string[]} [queryProperties] A list of properties for this query, Uses {@link MPLocationPropertyNames}.
     */
    private constructor(
        public readonly query?: string,
        public readonly near?: MPPoint,
        public readonly queryProperties?: string[],
    ) { }

    /**
     * Creator for MPQuery, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {?MPQueryParams} [object]
     * @returns {MPQuery}
     */
    static create(object?: MPQueryParams): MPQuery {
        return new MPQuery(
            object?.query,
            object?.near,
            object?.queryProperties
        );
    }
}

/**
 * Parameter interface for {@link MPQuery}.
 *
 * @export
 * @interface MPQueryParams
 * @typedef {MPQueryParams}
 */
export interface MPQueryParams {
    /**
     * The queried text (search text).
     *
     * @type {?string}
     */
    query?: string,
    /**
     * The query is restricted to entities near this point.
     *
     * @type {?MPPoint}
     */
    near?: MPPoint,
    /**
     * A list of properties for this query, Uses {@link MPLocationPropertyNames}.
     *
     * @type {?string[]}
     */
    queryProperties?: string[],
}