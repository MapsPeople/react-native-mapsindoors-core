import { MPLocation } from '../../index';

/**
 * Listener that is invoked when a {@link MPLocation} marker is clicked on the map.
 *
 * @export
 * @interface OnMarkerClickListener
 * @typedef {OnMarkerClickListener}
 */
export interface OnMarkerClickListener {
    /**
     * When a marker is clicked, the associated {@link MPLocation.id} is returned.
     *
     * @param {string} locationId The id of the location associated with this marker.
     */
    (locationId: string): void;
}