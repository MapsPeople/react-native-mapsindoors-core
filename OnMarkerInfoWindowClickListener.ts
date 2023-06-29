import { MPLocation } from '../../index';

/**
 * Listener that is invoked when a markers infowindow is clicked.
 *
 * @export
 * @interface OnMarkerInfoWindowClickListener
 * @typedef {OnMarkerInfoWindowClickListener}
 */
export interface OnMarkerInfoWindowClickListener {
    /**
     * When the infowindow is clicked, the corresponding {@link MPLocation.id} is supplied.
     *
     * @param {string} locationId The id of the location associated with this info window.
     */
    (locationId: string): void;
}