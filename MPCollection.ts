
/**
 * A generic collection used by MapsIndoors.
 *
 * @export
 * @abstract
 * @class MPCollection
 * @typedef {MPCollection}
 * @template Type
 */
export default abstract class MPCollection<Type> {
    /**
     * The map the objects are kept in.
     *
     * @protected
     * @type {!Map<String, Type>}
     */
    protected map!: Map<String, Type>;

    /**
     * Creates an instance of MPCollection.
     *
     * @constructor
     * @protected
     */
    protected constructor() { }

    /**
     * Gets all objects contained in the collection.
     *
     * @public
     * @returns {Array<Type>}
     */
    public getAll(): Array<Type> {
        return Array.from(this.map.values());
    }

    /**
     * Get a object by its identifier.
     *
     * @public
     * @param {string} id
     * @returns {(Type | undefined)}
     */
    public getById(id: string): Type | undefined {
        return this.map.get(id);
    }

    /**
     * The number of objects in the collection.
     *
     * @public
     * @readonly
     * @type {number}
     */
    public get size(): number {
        return this.map.size;
    }
}