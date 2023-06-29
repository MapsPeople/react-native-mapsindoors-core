import { MPPoint, MPLocation } from '../../index';

/**
 * Listener that is invoked when the map is clicked.
 *
 * @export
 * @interface OnMapClickListener
 * @typedef {OnMapClickListener}
 */
export interface OnMapClickListener {
    /**
     * When the map is clicked.
     * 
     * Contains the point of the click and any nearby locations.
     *
     * @param {MPPoint} point The coordinates of the click.
     * @param {?MPLocation[]} [locations] nearby locations.
     */
    (point: MPPoint, locations?: MPLocation[]): void;
}