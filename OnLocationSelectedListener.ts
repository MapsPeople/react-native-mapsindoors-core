import { MPLocation } from '../../index';

/**
 * Listener that is invoked when a {@link MPLocation} is selected.
 *
 * @export
 * @interface OnLocationSelectedListener
 * @typedef {OnLocationSelectedListener}
 */
export interface OnLocationSelectedListener {
    /**
     * When a [location] is selected, will be undefined if no location is selected.
     *
     * @param {?MPLocation} [location] The selected location.
     */
    (location?: MPLocation): void;
}