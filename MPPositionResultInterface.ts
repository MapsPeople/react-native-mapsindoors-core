import { MPPoint } from "../../index";

/**
 * Interface to deliver a position result to the MapsIndoors SDK.
 *
 * @export
 * @abstract
 * @class MPPositionResultInterface
 * @typedef {MPPositionResultInterface}
 */
export abstract class MPPositionResultInterface {
    /**
     * The position in world space.
     *
     * @type {!MPPoint}
     */
    point!: MPPoint;
    /**
     * The floor the position is on.
     *
     * @type {?number}
     */
    floorIndex?: number;
    /**
     * The bearing the position is pointing.
     *
     * @type {?number}
     */
    bearing?: number;
    /**
     * The accuracy of the position in meters.
     *
     * @type {?number}
     */
    accuracy?: number;
    /**
     * What position provider delivered the position result.
     *
     * @type {!string}
     */
    positionProvider!: string;
}