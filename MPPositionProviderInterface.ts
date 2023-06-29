import { OnPositionUpdateListener, MPPositionResultInterface } from "../../index";

/**
 * Interface for added a position provider to the SDK.
 *
 * @export
 * @abstract
 * @class MPPositionProviderInterface
 * @typedef {MPPositionProviderInterface}
 */
export abstract class MPPositionProviderInterface {
    /**
     * Add a listener to the position provider.
     * 
     * The listener should be invoked when a new position has been received.
     *
     * @abstract
     * @param {OnPositionUpdateListener} listener
     */
    abstract addOnPositionUpdateListener(listener: OnPositionUpdateListener): void;

    /**
     * Remove a listener.
     *
     * @abstract
     * @param {OnPositionUpdateListener} listener
     */
    abstract removeOnPositionUpdateListener(listener: OnPositionUpdateListener): void;

    /**
     * Invoked when the latest valid position is needed.
     *
     * @abstract
     * @returns {(MPPositionResultInterface | undefined)}
     */
    abstract getLatestPosition(): MPPositionResultInterface | undefined;

    /**
     * The name of the position provider, used to identify it.
     *
     * @abstract
     * @returns {string}
     */
    abstract get name(): string;
}