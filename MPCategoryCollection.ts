import MPCategory from "./MPCategory";
import MPCollection from "./MPCollection";
import MPDataField from "./MPDataField";

/**
 * A simple collection holder for categories.
 *
 * @export
 * @class MPCategoryCollection
 * @typedef {MPCategoryCollection}
 * @extends {MPCollection<MPCategory>}
 */
export default class MPCategoryCollection extends MPCollection<MPCategory> {
    /**
     * Creates an instance of MPCategoryCollection.
     *
     * @constructor
     * @private
     * @param {MPCategory[]} category A collection of categories used in MapsIndoors.
     */
    private constructor(category: MPCategory[]) {
        super();
        this.map = new Map(category.map((category) => [category.key, category]));
    }

    /**
     * Get a category's value directly.
     *
     * @public
     * @param {string} key
     * @returns {(string | undefined)}
     */
    public getValue(key: string) : string | undefined {
        let category: MPCategory | undefined = this.getById(key);
        return category?.value;
    }

    /**
     * Get a category's fields directly.
     *
     * @public
     * @param {string} key
     * @returns {(Map<string, MPDataField> | undefined)}
     */
    public getFields(key: string) : Map<string, MPDataField> | undefined {
        let category: MPCategory | undefined = this.getById(key);
        return category?.fields;
    }

    /**
     * Creator for MPCategoryCollection, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {?*} [object]
     * @returns {MPCategoryCollection}
     */
    public static create(object?: any) : MPCategoryCollection {
        let category: MPCategory[] = object?.map((venue: any) => MPCategory.create(venue));
        return new MPCategoryCollection(category);
    }
}