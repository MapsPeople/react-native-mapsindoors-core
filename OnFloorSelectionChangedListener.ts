import { MPFloor } from '../../index';

/**
 * Listener that is invoked when the active floor is changed.
 *
 * @export
 * @interface OnFloorSelectionChangedListener
 * @typedef {OnFloorSelectionChangedListener}
 */
export interface OnFloorSelectionChangedListener {
    /**
     * When the floor selection is changed to a new floor.
     *
     * @param {MPFloor} newFloor The new floor.
     */
    (newFloor: MPFloor): void;
}