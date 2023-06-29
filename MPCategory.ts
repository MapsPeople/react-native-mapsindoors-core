import { MPDataField } from "../../index";

/**
 * A category which contains a number of fields
 *
 * @export
 * @class MPCategory
 * @typedef {MPCategory}
 */
export default class MPCategory {
    /**
     * Creates an instance of MPCategory.
     *
     * @constructor
     * @private
     * @param {string} key The ID of the category.
     * @param {string} value The category's readable name.
     * @param {?Map<string, MPDataField>} [fields] The category's data fields.
     */
    private constructor(
        public readonly key: string,
        public readonly value: string,
        public readonly fields?: Map<string, MPDataField>
    ) { }

    /**
     * Creator for MPCategory, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPCategoryParams} object
     * @returns {MPCategory}
     */
    public static create(object: MPCategoryParams): MPCategory {
        let fields: Map<string, MPDataField> | undefined;
        if (object?.fields !== undefined) {
            fields = new Map();
            Object.keys(object?.fields).forEach(key => {
                fields!.set(key, MPDataField.create(object?.fields!.get(key)))
            });
        }
        return new MPCategory(
            object?.key,
            object?.value,
            fields,
        );
    }
}

/**
 * Parameter interface for {@link MPCategory}.
 *
 * @export
 * @interface MPCategoryParams
 * @typedef {MPCategoryParams}
 */
export interface MPCategoryParams {
    /**
     * The ID of the category.
     *
     * @type {string}
     */
    key: string,
    /**
     * The category's readable name.
     *
     * @type {string}
     */
    value: string,
    /**
     * The category's data fields.
     *
     * @type {?Map<string, MPDataField>}
     */
    fields?: Map<string, MPDataField>,
}