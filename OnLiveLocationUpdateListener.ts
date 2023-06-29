import MPLocation from "./MPLocation";

/**
 * Listener that is invoked when a location receives a livedata update.
 *
 * @export
 * @interface OnLiveLocationUpdateListener
 * @typedef {OnLiveLocationUpdateListener}
 */
export interface OnLiveLocationUpdateListener {
    /**
     * When a location recieves an update for the subscribed livdata domain.
     *
     * @param {MPLocation} location The location that has received a livedata update.
     */
    (location: MPLocation): void;
}