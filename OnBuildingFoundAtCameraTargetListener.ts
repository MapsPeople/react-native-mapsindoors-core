import { MPBuilding } from '../../index';

/**
 * Listener that is invoked when focus changes to a new building within the camera bounds.
 *
 * @export
 * @interface OnBuildingFoundAtCameraTargetListener
 * @typedef {OnBuildingFoundAtCameraTargetListener}
 */
export interface OnBuildingFoundAtCameraTargetListener {
    /**
     * When a building is found, or no building is found at all.
     *
     * @param {?MPBuilding} [building] The new building in focus, if not present, no building is in bounds.
     */
    (building?: MPBuilding): void;
}