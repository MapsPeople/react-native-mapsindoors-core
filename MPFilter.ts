import { MPBounds, MPLocation } from "../../index";

/**
 * A filter that can be applied during search, this will limit the returned {@link MPEntity}s to those that
 * fulfills the filter.
 *
 * @export
 * @class MPFilter
 * @typedef {MPFilter}
 */
export default class MPFilter {
    /**
     * Creates an instance of MPFilter.
     *
     * @constructor
     * @private
     * @param {?number} [take] How many of the applicable locations to include.
     * @param {?number} [skip] How many of the applicable locations to skip.
     * @param {?number} [depth] The depth property makes it possible to get the n'th descendant of a parent location.
     * 
     * Thus, the depth property only applies to filters that has set one or more parents.
     * The hierarchical tree of data is generally structured as Venue &gt; Building &gt; Floor &gt; Room &gt; POI.
     * 
     * For example, this means that a Floor is the 1st descendant of a Building.
     * So to get all locations inside a Building, set the [depth] to 3.
     * 
     * The default value is 1, giving you only the immediate descendant of the specified parents.
     * 
     * @param {?number} [floorIndex] The floorIndex property makes it possible to get the locations on a specific floor.
     * @param {?string[]} [categories] A list of categories (keys) from, for example, {@link MPLocation#categories}.
     * @param {?string[]} [locations] A list of location ids to search in.
     * @param {?string[]} [types] A list of location types to search in.
     * @param {?string[]} [parents] A list of parent ids.
     * @param {?MPBounds} [mapExtend] The outer bounds of the query.
     * @param {?MPBounds} [geometry] A geometry to search inside.
     * @param {?boolean} [ignoreLocationSearchableStatus] Allows queries to return results that are marked as non-searchable.
     * @param {?boolean} [ignoreLocationActiveStatus] Allows queries to return results that are marked as inactive using the active from/to mechanism.
     */
    private constructor(
        public take?: number,
        public skip?: number,
        public depth?: number,
        public floorIndex?: number,
        public categories?: string[],
        public locations?: string[],
        public types?: string[],
        public parents?: string[],
        public mapExtend?: MPBounds,
        public geometry?: MPBounds,
        public ignoreLocationSearchableStatus?: boolean,
        public ignoreLocationActiveStatus?: boolean,
    ) { }

    /**
     * Creator for MPError, invoke with 0 parameters to apply an empty filter.
     *
     * @public
     * @static
     * @param {?MPFilterParams} [object]
     * @returns {MPFilter}
     */
    public static create(object?: MPFilterParams): MPFilter {
        return new MPFilter(
            object?.take,
            object?.skip,
            object?.depth,
            object?.floorIndex,
            object?.categories,
            object?.locations,
            object?.types,
            object?.parents,
            object?.mapExtend,
            object?.geometry,
            object?.ignoreLocationSearchableStatus,
            object?.ignoreLocationActiveStatus,
        );
    }
}

/**
 * Parameter interface for {@link MPFilter}.
 *
 * @export
 * @interface MPFilterParams
 * @typedef {MPFilterParams}
 */
export interface MPFilterParams {
    /**
     * How many of the applicable locations to include.
     *
     * @type {?number}
     */
    take?: number;
    /**
     * How many of the applicable locations to skip.
     *
     * @type {?number}
     */
    skip?: number;
    /**
     * The depth property makes it possible to get the n'th descendant of a parent location.
     * 
     * Thus, the depth property only applies to filters that has set one or more parents.
     * The hierarchical tree of data is generally structured as Venue &gt; Building &gt; Floor &gt; Room &gt; POI.
     * 
     * For example, this means that a Floor is the 1st descendant of a Building.
     * So to get all locations inside a Building, set the [depth] to 3.
     * 
     * The default value is 1, giving you only the immediate descendant of the specified parents.
     *
     * @type {?number}
     */
    depth?: number;
    /**
     * The floorIndex property makes it possible to get the locations on a specific floor.
     *
     * @type {?number}
     */
    floorIndex?: number;
    /**
     * A list of categories (keys) from, for example, {@link MPLocation#categories}.
     *
     * @type {?string[]}
     */
    categories?: string[];
    /**
     * A list of location ids to search in.
     * 
     * @type {?string[]}
     */
    locations?: string[];
    /**
     * A list of location types to search in.
     *
     * @type {?string[]}
     */
    types?: string[];
    /**
     * A list of parent ids.
     *
     * @type {?string[]}
     */
    parents?: string[];
    /**
     * The outer bounds of the query.
     *
     * @type {?MPBounds}
     */
    mapExtend?: MPBounds;
    /**
     * A geometry to search inside.
     *
     * @type {?MPBounds}
     */
    geometry?: MPBounds;
    /**
     * Allows queries to return results that are marked as non-searchable.
     *
     * @type {?boolean}
     */
    ignoreLocationSearchableStatus?: boolean;
    /**
     * Allows queries to return results that are marked as inactive using the active from/to mechanism.
     *
     * @type {?boolean}
     */
    ignoreLocationActiveStatus?: boolean;
}