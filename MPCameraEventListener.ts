import { MPCameraEvent } from "../../index";

/**
 * Listens for camera events, eg. when the Camera starts or stops moving.
 *
 * @export
 * @interface MPCameraEventListener
 * @typedef {MPCameraEventListener}
 */
export default interface MPCameraEventListener {
    /**
     * When a {@link MPCameraEvent} happens.
     *
     * @param {MPCameraEvent} event
     */
    (event: MPCameraEvent): void;
}