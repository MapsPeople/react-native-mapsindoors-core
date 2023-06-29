
/**
 * Listener that is invoked when floor selection changes.
 *
 * @export
 * @interface OnFloorUpdateListener
 * @typedef {OnFloorUpdateListener}
 */
export interface OnFloorUpdateListener {
    /**
     * When the current floor changes.
     *
     * @param {number} floor The new floor.
     */
    (floor: number): void;
}