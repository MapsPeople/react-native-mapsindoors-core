import { MPVenue } from '../../index';

/**
 * Listener that is invoked when focus changes to a new venue within the camera bounds.
 *
 * @export
 * @interface OnVenueFoundAtCameraTargetListener
 * @typedef {OnVenueFoundAtCameraTargetListener}
 */
export interface OnVenueFoundAtCameraTargetListener {
    /**
     * When a venue is found, or no venue is found at all.
     *
     * @param {?MPVenue} [venue] The new venue in focus, if not present, no venue is in bounds.
     */
    (venue?: MPVenue): void;
}