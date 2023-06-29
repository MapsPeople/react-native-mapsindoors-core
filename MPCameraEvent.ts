import MPCameraEventListener from "../../index"

/**
 * Possible events that a {@link MPCameraEventListener} can recieve.
 *
 * @enum {number}
 */
enum MPCameraEvent {
    finished = 0,
    cancelled = 1,
    moveStartedApiAnimation = 2,
    moveStartedDeveloperAnimation = 3,
    moveStartedGesture = 4,
    onMove = 5,
    moveCancelled = 6,
    idle = 7,
} export default MPCameraEvent