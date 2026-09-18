/**
 * Listener that is invoked while base-map tiles are being cached for offline use.
 *
 * Caching base-map tiles is a long-running network download that can take minutes, so progress is
 * reported as it goes. Progress is not guaranteed to reach 1.0 before
 * {@link MapsIndoors.synchronizeBaseMapTiles} resolves, and it is not guaranteed to be reported at
 * all - a map provider that cannot determine progress only reports completion.
 *
 * @export
 * @interface OnBaseMapCacheProgressListener
 * @typedef {OnBaseMapCacheProgressListener}
 */
export interface OnBaseMapCacheProgressListener {
    /**
     * When the caching operation has progressed.
     *
     * @param {number} progress The fraction of the operation that has completed, from 0.0 to 1.0.
     */
    (progress: number): void;
}
