import { MPPoint } from "../../index";

/**
 * An interface describing trivial properties of a MapsIndoors geographical entities.
 *
 * @export
 * @abstract
 * @class MPEntity
 * @typedef {MPEntity}
 */
export default abstract class MPEntity {
    /**
     * The position of the entity, oftenmost its anchorpoint.
     *
     * @public
     * @abstract
     * @type {?MPPoint}
     */
    public abstract position?: MPPoint;

    /**
     * Whether the entity's geometry is a point.
     *
     * @public
     * @abstract
     * @readonly
     * @type {boolean}
     */
    public abstract get isPoint(): boolean;
    /**
     * The type of the entity (eg. MPLocation).
     *
     * @public
     * @readonly
     * @type {string}
     */
    public readonly type: string;

    /**
     * Creates an instance of MPEntity.
     *
     * @constructor
     * @protected
     * @param {string} type
     * @param {?boolean} [isPoint]
     */
    protected constructor(type: string) {
        this.type = type;
    }

    /**
     * Stringifies the entity.
     *
     * @public
     * @returns {string}
     */
    public toJson(): string {
        return JSON.stringify(this);
    }
}