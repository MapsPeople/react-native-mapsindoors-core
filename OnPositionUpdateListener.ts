import { MPPositionResultInterface } from '../../index';

/**
 * Listener that is invoked when user positioning is updated.
 *
 * @export
 * @interface OnPositionUpdateListener
 * @typedef {OnPositionUpdateListener}
 */
export interface OnPositionUpdateListener {
    /**
     * When a new position is provided.
     *
     * @param {MPPositionResultInterface} position A user position update.
     */
    (position: MPPositionResultInterface): void;
}