import { MPFloor, OnFloorSelectionChangedListener } from "../../index";

/**
 * Interface used by MapsIndoors to communicate with floor selector UIs.
 *
 * @export
 * @interface MPFloorSelectorInterface
 * @typedef {MPFloorSelectorInterface}
 */
export interface MPFloorSelectorInterface {
    /**
     * Update the floors shown in the selector.
     *
     * @param {(Array<MPFloor> | undefined)} floors
     */
    setFloors(floors: Array<MPFloor> | undefined): void;
    /**
     * NB: This is used internally in the SDK, overwriting the listener will result in functionality loss.
     * 
     * Set a listener that listens for when a floor is selected in the floor selector.
     *
     * @param {OnFloorSelectionChangedListener} listener
     */
    setOnFloorSelectionChangedListener(listener: OnFloorSelectionChangedListener): void;
    /**
     * Show/Hide the floor selector, this is called when a building comes into/out of view.
     *
     * @param {boolean} show
     * @param {boolean} animated
     */
    show(show: boolean, animated: boolean): void;
    /**
     * Invoked when a floor has been selected programmatically.
     *
     * @param {MPFloor} floor
     */
    setSelectedFloor(floor: MPFloor): void;
    /**
     * Invoked when a floor has been selected programmatically by index.
     *
     * @param {number} floorIndex
     */
    setSelectedFloorByFloorIndex(floorIndex: number): void;
    /**
     * Invoked when the zoom level changes.
     *
     * @param {number} newZoomLevel
     */
    zoomLevelChanged(newZoomLevel: number): void;
    /**
     * Whether to allow the floor to automatically change, 
     * eg. when panning to a new building that does not have the current floor.
     *
     * @returns {boolean}
     */
    isAutoFloorChangeEnabled(): boolean;
    /**
     * Invoked when user positioning changes floorIndex.
     *
     * @param {number} floorIndex
     */
    setUserPositionFloor(floorIndex: number): void;
}