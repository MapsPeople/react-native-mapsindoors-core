/**
 * A data field contains a single field value with descriptive 
 * text and a type that defines the type of the value (eg. text or number).
 *
 * @export
 * @class MPDataField
 * @typedef {MPDataField}
 */
export default class MPDataField {
    /**
     * Creates an instance of MPDataField.
     *
     * @constructor
     * @private
     * @param {?string} [value] The value of the field.
     * @param {?string} [text] Text that describes the value.
     * @param {?string} [type] The type of the value (text, number, etc.)
     */
    private constructor(
        public readonly value?: string, 
        public readonly text?: string, 
        public readonly type?: string
    ) { };

    /**
    /**
     * Creator for MPDataField, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPDataFieldParams} object
     * @returns {MPDataField}
     */
    public static create(object: MPDataFieldParams): MPDataField {
        return new MPDataField(
            object?.value,
            object?.text,
            object?.type,
        );
    }
}

/**
 * Parameter interface for {@link MPDataField}.
 *
 * @export
 * @interface MPDataFieldParams
 * @typedef {MPDataFieldParams}
 */
export interface MPDataFieldParams {
    /**
     * The value of the field.
     *
     * @type {?string}
     */
    value?: string,
    /**
     * Text that describes the value.
     *
     * @type {?string}
     */
    text?: string,
    /**
     * The type of the value (text, number, etc.)
     *
     * @type {?string}
     */
    type?: string,
}