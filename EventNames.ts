/**
 * A list of event aliases used internally by the MapsIndoors React Native Bindings to keep track of SDK events.
 *
 * @export
 * @enum {number}
 */
export enum EventNames {
    cameraEvent = "cameraEvent",
    onFloorSelectionChanged = "onFloorSelectionChanged",
    onFloorUpdate = "onFloorUpdate",
    onLocationSelected = "onLocationSelected",
    onMapClick = "onMapClick",
    onPositionUpdate = "onPositionUpdate",
    onVenueFoundAtCameraTarget = "onVenueFoundAtCameraTarget",
    onBuildingFoundAtCameraTarget = "onBuildingFoundAtCameraTarget",
    onMarkerClick = "onMarkerClick",
    onInfoWindowClick = "onInfoWindowClick",
    onLiveLocationUpdate = "onLiveLocationUpdate",
    floorSelector = "floorSelector",
    onLegSelected = "onLegSelected",
}