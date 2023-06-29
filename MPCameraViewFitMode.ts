/**
 * /// Different ways the camera can fit a route inside the screen
 *
 * @export
 * @enum {number}
 */
export enum MPCameraViewFitMode {
    /**
     * The camera will point north.
     */
    northAligned,
    /**
     * The camera will be aligned with the direction of the first step.
     */
    firstStepAligned,
    /**
     * The camera will point in the same direction as a line that 
     * goes directly from the origin to the destination.
     */
    startToEndAligned,
}