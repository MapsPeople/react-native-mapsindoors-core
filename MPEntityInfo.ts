import { MPDataField } from "../../index";

/**
 * An interface describing base properties of entity info collections.
 *
 * @export
 * @abstract
 * @class MPEntityInfo
 * @typedef {MPEntityInfo}
 */
export abstract class MPEntityInfo {
    /**
     * Creates an instance of MPEntityInfo.
     *
     * @constructor
     * @protected
     * @param {string} name The name of the Entity
     * @param {?string[]} [aliases] The aliases the Entity uses
     * @param {?Map<string, MPDataField>} [fields] The Entity's data fields.
     * @param {?string} [language] The current language of the Entity.
     */
    protected constructor(
        public readonly name: string, 
        public readonly aliases?: string[], 
        public readonly fields?: Map<string, MPDataField>, 
        public readonly language?: string,
    ) { }
}