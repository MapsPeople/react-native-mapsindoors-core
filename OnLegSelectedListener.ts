import {MPRouteLeg} from '../../index';

/**
 * Listener that is invoked during directions when a {@link MPRouteLeg} is selected.
 *
 * @export
 * @interface OnLegSelectedListener
 * @typedef {OnLegSelectedListener}
 */
export interface OnLegSelectedListener {
    /**
     * when a new leg index is selected.
     *
     * @param {number} legIndex The selected leg index.
     */
    (legIndex: number): void;
}