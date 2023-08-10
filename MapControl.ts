import { EmitterSubscription, NativeEventEmitter, NativeModules } from 'react-native';
import {
    MPError, MPFilter, MPFilterBehavior, MPLocation, MPMapConfig,
    MPFloorSelectorInterface, MPSelectionBehavior, MPFloor,
    MPVenue, MPBuilding, OnMapClickListener, MPPoint, MPCameraEventListener,
    OnFloorUpdateListener, OnLocationSelectedListener,
    OnVenueFoundAtCameraTargetListener, OnBuildingFoundAtCameraTargetListener,
    OnMarkerClickListener, OnMarkerInfoWindowClickListener,
    OnLiveLocationUpdateListener, MPCameraEvent, MPMapStyle, MPCameraUpdate, MPCameraPosition, MPEntity,
} from "../../index"
import { EventNames } from './EventNames';


const { MapControlModule } = NativeModules;

/**
 * Internal - Documentation will follow.
 *
 * @export
 * @class MapControl
 * @typedef {MapControl}
 */
export default class MapControl {
    /**
     * Creates an instance of MapControl
     *
     * @constructor
     * @private
     */
    private constructor() { }

    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private floorSelector?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?NativeEventEmitter}
     */
    private eventEmitter?: NativeEventEmitter;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onMapClickSub?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onLocationSelectedSub?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onCurrentVenueChangedSub?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onCurrentBuildingChangedSub?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onMarkerClickSub?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {?EmitterSubscription}
     */
    private onMarkerInfoWindowClickSub?: EmitterSubscription;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {Map<MPCameraEventListener, EmitterSubscription | undefined>}
     */
    private onCameraEventSubs: Map<MPCameraEventListener, EmitterSubscription | undefined> = new Map;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {Map<OnFloorUpdateListener, EmitterSubscription | undefined>}
     */
    private onFloorUpdateSubs: Map<OnFloorUpdateListener, EmitterSubscription | undefined> = new Map;
    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @type {Map<string, EmitterSubscription | undefined>}
     */
    private onLiveUpdateSubs: Map<string, EmitterSubscription | undefined> = new Map;

    /**
     * Create a new MapControl instance.
     *
     * Note that new MapControl instances will only be created when/if the MapsIndoors SDK has initialized successfully.
     *
     * This method will wait until this condition has been met.
     *
     * @public
     * @static
     * @async
     * @param {MPMapConfig} config A configuration object that handles setting multiple options for MapControl.
     * @param {typeof NativeEventEmitter} nativeEventEmitter An event emitter needed to communicate with the native SDKs.
     * @returns {Promise<MapControl>} A ready to use MapControl instace.
     */
    public static async create(config: MPMapConfig, nativeEventEmitter: typeof NativeEventEmitter): Promise<MapControl> {
        return MapControlModule.initMapControl(config).then(() => {
            const mapControl = new MapControl();
            mapControl.eventEmitter = new nativeEventEmitter(MapControlModule);
            if (config.floorSelector !== undefined) {
                mapControl.setFloorSelector(config.floorSelector);
            }
            return Promise.resolve(mapControl);
        }).catch((err: Error) => Promise.reject(MPError.parse(err)));
    }

    /**
     * Internal - Documentation will follow.
     *
     * @private
     * @param {MPFloor} newFloor
     */
    private onFloorSelectionChanged(newFloor: MPFloor): void {
        MapControlModule.onFloorSelectionChanged(JSON.stringify(newFloor));
    }

    /**
     * Select a venue, optionally move the camera to the given venue.
     *
     * @public
     * @async
     * @param {MPVenue} venue
     * @param {boolean} moveCamera Whether to move the camera such that it shows the selected venue
     * @returns {Promise<void>} When the selection (and possible camera animation) has completed
     */
    public async selectVenue(venue: MPVenue, moveCamera: boolean): Promise<void> {
        return MapControlModule.selectVenue(JSON.stringify(venue), moveCamera).then(() => {});
    }

    /**
     * Get the currently selected venue, if there is any.
     *
     * @public
     * @async
     * @returns {Promise<MPVenue | undefined>} The current venue, if any is selected.
     */
    public async getCurrentVenue(): Promise<MPVenue | undefined> {
        return MapControlModule.getCurrentVenue().then((venue: string) =>
            venue ? Promise.resolve(MPVenue.create(JSON.parse(venue as string))) : undefined);
    }

    /**
     * Get the currently selected building, if there is any.
     *
     * @public
     * @async
     * @returns {Promise<MPBuilding | undefined>}  The current building, if any is selected.
     */
    public async getCurrentBuilding(): Promise<MPBuilding | undefined> {
        return MapControlModule.getCurrentBuilding().then((building: string) =>
            building ? Promise.resolve(MPBuilding.create(JSON.parse(building as string))) : undefined);
    }

    /**
     * Select a building, optionally move the camera to the given building.
     *
     * @public
     * @async
     * @param {MPBuilding} building
     * @param {boolean} moveCamera Whether to move the camera such that it shows the selected building
     * @returns {Promise<void>} When the selection (and possible camera animation) has completed
     */
    public async selectBuilding(building: MPBuilding, moveCamera: boolean): Promise<void> {
        return MapControlModule.selectBuilding(JSON.stringify(building), moveCamera);
    }

    /**
     * Selects a location based on a {@link MPLocation} object.
     *
     * @public
     * @async
     * @param {MPLocation} location
     * @param {MPSelectionBehavior} behavior Optionally apply a {@link MPSelectionBehavior}.
     * @returns {Promise<void>}
     */
    public async selectLocation(location: MPLocation, behavior: MPSelectionBehavior): Promise<void>;
    /**
     * Selects a location based on a id string object.
     *
     * @public
     * @async
     * @param {string} id
     * @param {MPSelectionBehavior} behavior Optionally apply a {@link MPSelectionBehavior}.
     * @returns {Promise<void>}
     */
    public async selectLocation(id: string, behavior: MPSelectionBehavior): Promise<void>;
    /**
     * Selects a location based on a id string or location object.
     *
     * @public Internal, combination of other overrides.
     * @async
     * @param {(MPLocation | string)} locationOrId
     * @param {MPSelectionBehavior} behavior Optionally apply a {@link MPSelectionBehavior}.
     * @returns {Promise<void>}
     */
    public async selectLocation(locationOrId: MPLocation | string, behavior: MPSelectionBehavior): Promise<void> {
        if (locationOrId instanceof MPLocation) {
            return Promise.resolve(MapControlModule.selectLocation(JSON.stringify(locationOrId), JSON.stringify(behavior)));
        } else {
            return Promise.resolve(MapControlModule.selectLocationWithId(locationOrId, JSON.stringify(behavior)));
        }
    }

    /**
     * Invoke this method to restore the map to its default state (POIs shown based on their display rules, etc.).
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async clearFilter(): Promise<void> {
        return Promise.resolve(MapControlModule.clearFilter());
    }

    /**
     * Use this method to display temporary locations, not points of interests location. Use [clearFilter()] to exit this state.
     *
     * @public
     * @async
     * @param {MPLocation[]} locations A list of locations to display.
     * @param {MPFilterBehavior} filterBehavior How the map should show the applied filter.
     * @returns {Promise<boolean>} True if any locations are available.
     */
    public async setFilter(locations: MPLocation[], filterBehavior: MPFilterBehavior): Promise<boolean>;
    /**
     * Use this method to display temporary locations, not points of interests location. Use [clearFilter()] to exit this state.
     *
     * @public
     * @async
     * @param {MPFilter} filter The applied filter.
     * @param {MPFilterBehavior} filterBehavior How the map should show the applied filter.
     * @returns {Promise<boolean>} True if any locations are available.
     */
    public async setFilter(filter: MPFilter, filterBehavior: MPFilterBehavior): Promise<boolean>;
    /**
     * Use this method to display temporary locations, not points of interests location. Use [clearFilter()] to exit this state.
     *
     * @public
     * @async
     * @param {(MPLocation[] | MPFilter)} locationOrFilter The applied filter.
     * @param {MPFilterBehavior} filterBehavior How the map should show the applied filter.
     * @returns {Promise<boolean>} True if any locations are available.
     */
    public async setFilter(locationOrFilter: MPLocation[] | MPFilter, filterBehavior: MPFilterBehavior): Promise<boolean> {
        if (Array.isArray(locationOrFilter)) {
            const locationIds: string[] = new Array();
            locationOrFilter.forEach((location => {
                locationIds.push(location.id);
            }));
            return Promise.resolve(MapControlModule.setFilterWithLocations(JSON.stringify(locationIds), JSON.stringify(filterBehavior)));
        } else {
            return Promise.resolve(MapControlModule.setFilter(JSON.stringify(locationOrFilter), JSON.stringify(filterBehavior)));
        }
    }

    /**
     * Focus the map on the given {@link MPEntity}.
     *
     * Examples of classes of type {@link MPEntity} are: {@link MPVenue}, {@link MPBuilding},
     * {@link MPBuilding}, {@link MPLocation}.
     *
     * @public
     * @async
     * @param {MPEntity} entity The entity to move to.
     * @returns {Promise<void>}
     */
    public async goTo(entity: MPEntity): Promise<void> {
        return MapControlModule.goTo(JSON.stringify(entity), entity.type).then(() => {});
    }

    /**
     * Sets padding on the map.
     *
     * @public
     * @async
     * @param {number} start
     * @param {number} top
     * @param {number} end
     * @param {number} bottom
     * @returns {Promise<void>}
     */
    public async setMapPadding(start: number, top: number, end: number, bottom: number): Promise<void> {
        await MapControlModule.setMapPadding(start, top, end, bottom);
    }

    /**
     * Gets the Map View bottom padding.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getMapViewPaddingStart(): Promise<number> {
        return MapControlModule.getMapViewPaddingStart();
    }

    /**
     * Gets the Map View bottom padding.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getMapViewPaddingTop(): Promise<number> {
        return MapControlModule.getMapViewPaddingTop();
    }

    /**
     * Gets the Map View bottom padding.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getMapViewPaddingEnd(): Promise<number> {
        return MapControlModule.getMapViewPaddingEnd();
    }

    /**
     * Gets the Map View bottom padding.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getMapViewPaddingBottom(): Promise<number> {
        return MapControlModule.getMapViewPaddingBottom();
    }

    /**
     * Sets the map style for MapsIndoors tiles.
     *
     * @public
     * @async
     * @param {MPMapStyle} style Is a {@link MPMapStyle} object, a list of available {@link MPMapStyle}s can be fetched via {@link MapsIndoors.getMapStyles}.
     * @returns {Promise<void>}
     */
    public async setMapStyle(style: MPMapStyle): Promise<void> {
        await MapControlModule.setMapStyle(JSON.stringify(style));
    }

    /**
     * Gets the current map style of MapsIndoors tiles.
     *
     * @public
     * @async
     * @returns {Promise<MPMapStyle>}
     */
    public async getMapStyle(): Promise<MPMapStyle|undefined> {
        let mapStyleString = await MapControlModule.getMapStyle();
        return Promise.resolve(mapStyleString ? MPMapStyle.create(JSON.parse(mapStyleString)) : undefined);
    }

    /**
     * Enables/disables the info window on user-selected locations.
     *
     * The info window is shown by default when the user selects a location (by tapping on it)
     *
     * @public
     * @async
     * @param {boolean} show
     * @returns {Promise<void>}
     */
    public async showInfoWindowOnClickedLocation(show: boolean): Promise<void> {
        await MapControlModule.showInfoWindowOnClickedLocation(show);
    }

    /**
     * Call this to deselect a location previously selected with {@link selectLocation(MPLocation, MPSelectionBehavior)}.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async deSelectLocation(): Promise<void> {
        await MapControlModule.deSelectLocation();
    }

    /**
     * Returns the current {@link MPFloor} of the current {@link MPBuilding} in focus.
     *
     * @public
     * @async
     * @returns {Promise<MPFloor>}
     */
    public async getCurrentBuildingFloor(): Promise<MPFloor|undefined> {
        let floorString = await MapControlModule.getCurrentBuildingFloor();
        return Promise.resolve(floorString ? MPFloor.create(JSON.parse(floorString)) : undefined);
    }

    /**
     * Returns the current floor index or {@link MPFloor.defaultGroundFloorIndex} if no {@link MPBuilding} is in focus.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getCurrentFloorIndex(): Promise<number> {
        return MapControlModule.getCurrentFloorIndex();
    }

    /**
     * Get the zoom level that MapsIndoors is currently using for displaying icons on the map.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getCurrentMapsIndoorsZoom(): Promise<number> {
        return MapControlModule.getCurrentMapsIndoorsZoom();
    }

    /**
     * Sets the current visible floor to the given floorIndex one.
     *
     * For floor names/z-index pairs check the value returned by {@link MPBuilding.floors}
     *
     * @public
     * @async
     * @param {number} floorIndex
     * @returns {Promise<void>}
     */
    public async selectFloor(floorIndex: number): Promise<void> {
        await MapControlModule.selectFloor(floorIndex);
    }

    /**
     * Returns the visibility state of the currently used {@link MPFloorSelectorInterface}.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isFloorSelectorHidden(): Promise<boolean> {
        return MapControlModule.isFloorSelectorHidden();
    }

    /**
     * Shows or hides the {@link MPFloorSelectorInterface}, i.e. hiding the View from {@link MapControl}.
     *
     * {@link MapControl} will still receive relevant events on floor updates, building change etc.
     *
     * The Interface will also receive the events, making it possible to show/hide in real time, without refreshing the map.
     *
     * @public
     * @async
     * @param {boolean} hide
     * @returns {Promise<void>}
     */
    public async hideFloorSelector(hide: boolean): Promise<void> {
        await MapControlModule.hideFloorSelector(hide);
    }

    /**
     * Replaces the default FloorSelector with a custom one.
     *
     * @public
     * @async
     * @param {?MPFloorSelectorInterface} [floorSelector]
     * @returns {Promise<void>}
     */
    public async setFloorSelector(floorSelector?: MPFloorSelectorInterface): Promise<void> {
        if (floorSelector) {
            floorSelector.setOnFloorSelectionChangedListener(this.onFloorSelectionChanged);
            await this.setupFloorSelector(floorSelector);
        } else {
            await this.teardownFloorSelector();
        }
    }

    /**
     * Sets up the floor selector to be able to receive events from the native SDK.
     *
     * @private
     * @async
     * @param {MPFloorSelectorInterface} floorSelector
     * @returns {Promise<void>}
     */
    private async setupFloorSelector(floorSelector: MPFloorSelectorInterface): Promise<void> {
        return MapControlModule.setFloorSelector(true, floorSelector.isAutoFloorChangeEnabled()).then(() => {
            const sub = this.eventEmitter?.addListener(EventNames.floorSelector, event => {
                const fs = floorSelector;
                const method: String = event.method;
                switch (method) {
                    case "setList": {
                        fs.setFloors(event.list ?
                            JSON.parse(event.list).map((venue: any) => MPFloor.create(venue)) :
                            undefined);
                    }
                        break;
                    case "show": {
                        fs.show(event.show, event.animated);
                    }
                        break;
                    case "setSelectedFloor": {
                        fs.setSelectedFloor(MPFloor.create(JSON.parse(event.floor)));
                    }
                        break;
                    case "setSelectedFloorByFloorIndex": {
                        fs.setSelectedFloorByFloorIndex(event.floorIndex);
                    }
                        break;
                    case "zoomLevelChanged": {
                        fs.zoomLevelChanged(event.zoom);
                    }
                        break;
                    case "setUserPositionFloor": {
                        fs.setUserPositionFloor(event.floor);
                    }
                        break;
                }
            });
            this.floorSelector = sub;
            return Promise.resolve();
        });
    }

    /**
     * Removes a custom floor selector.
     *
     * @private
     * @async
     * @returns {Promise<void>}
     */
    private async teardownFloorSelector(): Promise<void> {
        return MapControlModule.setFloorSelector(false).then(() => {
            this.floorSelector?.remove();
            this.floorSelector = undefined;
            return Promise.resolve();
        });
    }


    /**
     * Renders the positioning blue dot at the last known user position on the map.
     *
     * @public
     * @async
     * @param {boolean} show
     * @returns {Promise<void>}
     */
    public async showUserPosition(show: boolean): Promise<void> {
        return MapControlModule.showUserPosition(show).then(() => Promise.resolve());
    }

    /**
     * Returns the current visibility state of the user location icon (blue dot).
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isUserPositionShown(): Promise<boolean> {
        return MapControlModule.isUserPositionShown();
    }

    /**
     * Enables live data on a specific domain and uses MapsIndoors standard graphic implementation.
     *
     * Uses a domainType string, use {@link LiveDataDomainTypes} to get supported strings.
     *
     * @public
     * @async
     * @param {string} domainType
     * @param {?OnLiveLocationUpdateListener} [listener]
     * @returns {Promise<void>}
     */
    public async enableLiveData(domainType: string, listener?: OnLiveLocationUpdateListener): Promise<void> {
        await MapControlModule.enableLiveData(domainType, listener !== undefined);
        if (listener) {
            this.addLiveDataListener(domainType, listener);
        }
    }

    /**
     * Set up livedata listener to receive events from the native SDK.
     *
     * @private
     * @param {string} domainType
     * @param {OnLiveLocationUpdateListener} listener
     */
    private addLiveDataListener(domainType: string, listener: OnLiveLocationUpdateListener) {
        this.onLiveUpdateSubs.get(domainType)?.remove();
        const sub = this.eventEmitter?.addListener(EventNames.onLiveLocationUpdate, event => {
            const location = MPLocation.create(JSON.parse(event.location));
            listener(location);
        });
        this.onLiveUpdateSubs.set(domainType, sub);
    }

    /**
     * Disables live data for a specific domainType.
     *
     * @public
     * @async
     * @param {string} domainType
     * @returns {Promise<void>}
     */
    public async disableLiveData(domainType: string): Promise<void> {
        await MapControlModule.disableLiveData(domainType);
        this.removeLiveDataListener(domainType);
    }

    /**
     * Destroy up livedata listener to receive events from the native SDK.
     *
     * @private
     * @param {string} domainType
     */
    private removeLiveDataListener(domainType: string) {
        this.onLiveUpdateSubs.get(domainType)?.remove();
        this.onLiveUpdateSubs.delete(domainType);
    }

    /**
     * Uses a camera update to animate the camera.
     *
     * @public
     * @async
     * @param {MPCameraUpdate} update How to update the camera.
     * @param {?number} [duration] how long the animation should take in ms.
     * @returns {Promise<void>}
     */
    public async animateCamera(update: MPCameraUpdate, duration?: number): Promise<void> {
        if (duration === undefined) {
            duration = -1;
        }
        await MapControlModule.animateCamera(JSON.stringify(update), duration);
    }

    /**
     * Uses a camera update to move the camera instantly.
     *
     * @public
     * @async
     * @param {MPCameraUpdate} update How to update the camera.
     * @returns {Promise<void>}
     */
    public async moveCamera(update: MPCameraUpdate): Promise<void> {
        await MapControlModule.moveCamera(JSON.stringify(update));
    }

    /**
     * Saves the current position of the camera into a {@link MPCameraPosition}.
     *
     * @public
     * @async
     * @returns {Promise<MPCameraPosition>}
     */
    public async getCurrentCameraPosition(): Promise<MPCameraPosition> {
        let positionString = await MapControlModule.getCurrentCameraPosition();
        return Promise.resolve(MPCameraPosition.create(JSON.parse(positionString)));
    }

    /**
     * Set a listener for when the map has been tapped.
     *
     * @public
     * @param {?OnMapClickListener} [listener] Call with undefined to remove the listener.
     * @param {?boolean} [consumeEvent] Whether the SDK should also react to this event.
     */
    public setOnMapClickListener(listener?: OnMapClickListener, consumeEvent?: boolean): void {
        MapControlModule.setOnMapClickListener(listener !== undefined, consumeEvent ? true : false);
        this.onMapClickSub?.remove();
        if (listener !== undefined) {
            this.onMapClickSub = this.eventEmitter?.addListener(EventNames.onMapClick, event => {
                const point: MPPoint = MPPoint.create(JSON.parse(event.point));
                if (event.locations != null) {
                    const locs: MPLocation[] = JSON.parse(event.locations).map((loc: any) => MPLocation.create(loc));
                    listener(point, locs);
                }else {
                    listener(point, undefined)
                }
            });
        }
    }

    /**
     * Set a location selection listener, invoked when a location is selected,
     * either by tapping on it, or programmatically with {@link selectLocation}.
     *
     * @public
     * @param {?OnLocationSelectedListener} [listener]
     * @param {?boolean} [consumeEvent] Whether the SDK should also react to this event.
     */
    public setOnLocationSelectedListener(listener?: OnLocationSelectedListener, consumeEvent?: boolean): void {
        MapControlModule.setOnLocationSelectedListener(listener !== undefined, consumeEvent !== undefined && consumeEvent);
        this.onLocationSelectedSub?.remove();
        if (listener !== undefined) {
            this.onLocationSelectedSub = this.eventEmitter?.addListener(EventNames.onLocationSelected, event => {
                const loc: MPLocation = MPLocation.create(JSON.parse(event.location));
                listener(loc);
            });
        }
    }

    /**
     * Set a current venue changed event listener, which is invoked when the currently selected venue changes.
     *
     * @public
     * @param {?OnVenueFoundAtCameraTargetListener} [listener]
     */
    public setOnCurrentVenueChangedListener(listener?: OnVenueFoundAtCameraTargetListener): void {
        MapControlModule.setOnCurrentVenueChangedListener(listener !== undefined);
        this.onCurrentVenueChangedSub?.remove();
        if (listener !== undefined) {
            this.onCurrentVenueChangedSub = this.eventEmitter?.addListener(EventNames.onVenueFoundAtCameraTarget, event => {
                const venueString = JSON.parse(event.venue);
                if (venueString != undefined) {
                    listener(MPVenue.create(venueString))
                } else {
                    listener();
                }
            });
        }
    }

    /**
     * Set a current building changed event listener, which is invoked when the currently selected building changes.
     *
     * @public
     * @param {?OnBuildingFoundAtCameraTargetListener} [listener]
     */
    public setOnCurrentBuildingChangedListener(listener?: OnBuildingFoundAtCameraTargetListener): void {
        MapControlModule.setOnCurrentBuildingChangedListener(listener !== undefined);
        this.onCurrentBuildingChangedSub?.remove();
        if (listener !== undefined) {
            this.onCurrentBuildingChangedSub = this.eventEmitter?.addListener(EventNames.onBuildingFoundAtCameraTarget, event => {
                const buildingString = JSON.parse(event.building);
                if (buildingString != undefined) {
                    listener(MPBuilding.create(buildingString));
                } else {
                    listener();
                }

            });
        }
    }

    /**
     * Set a marker click event listener, invoked when a marker is clicked.
     *
     * @public
     * @param {?OnMarkerClickListener} [listener]
     * @param {?boolean} [consumeEvent] Whether the SDK should also react to this event.
     */
    public setOnMarkerClickListener(listener?: OnMarkerClickListener, consumeEvent?: boolean): void {
        MapControlModule.setOnMarkerClickListener(listener !== undefined, consumeEvent !== undefined && consumeEvent);
        this.onMarkerClickSub?.remove();
        if (listener !== undefined) {
            this.onMarkerClickSub = this.eventEmitter?.addListener(EventNames.onMarkerClick, event => {
                const locId = event.locationId;
                listener(locId);
            });
        }
    }

    /**
     * Set a info window click listener, invoked when an info window is clicked.
     *
     * @public
     * @param {?OnMarkerInfoWindowClickListener} [listener]
     */
    public setOnMarkerInfoWindowClickListener(listener?: OnMarkerInfoWindowClickListener): void {
        MapControlModule.setOnMarkerInfoWindowClickListener(listener !== undefined);
        this.onMarkerInfoWindowClickSub?.remove();
        if (listener !== undefined) {
            this.onMarkerInfoWindowClickSub = this.eventEmitter?.addListener(EventNames.onInfoWindowClick, event => {
                const locId = event.locationId;
                listener(locId);
            });
        }
    }

    /**
     * Add a camera event listener, invoked when a camera event occurs (e.g. moved, idle) (see {@link MPCameraEvent}).
     *
     * @public
     * @param {MPCameraEventListener} listener
     */
    public addOnCameraEventListener(listener: MPCameraEventListener): void {
        if (this.onCameraEventSubs.size == 0) {
            MapControlModule.setMPCameraEventListener(true);
        }
        const sub = this.eventEmitter?.addListener(EventNames.cameraEvent, event => {
            const cameraEvent: MPCameraEvent = event.event;
            listener(cameraEvent);
        });
        this.onCameraEventSubs.set(listener, sub);
    }

    /**
     * Remove a camera event listener.
     *
     * @public
     * @param {MPCameraEventListener} listener
     */
    public removeOnCameraEventListener(listener: MPCameraEventListener): void {
        this.onCameraEventSubs.get(listener)?.remove();
        this.onCameraEventSubs.delete(listener);
        if (this.onCameraEventSubs.size == 0) {
            MapControlModule.setMPCameraEventListener(false);
        }
    }

    /**
     * Add a listener object to catch floor changes made by either the user or the positioning service.
     *
     * @public
     * @param {OnFloorUpdateListener} listener
     */
    public addOnFloorUpdateListener(listener: OnFloorUpdateListener): void {
        if (this.onCameraEventSubs.size == 0) {
            MapControlModule.setOnFloorUpdateListener(true);
        }
        const sub = this.eventEmitter?.addListener(EventNames.onFloorUpdate, event => {
            const floor = event.floorIndex;
            listener(floor);
        });
        this.onFloorUpdateSubs.set(listener, sub);
    }

    /**
     * Remove a floor update listener.
     *
     * @public
     * @param {OnFloorUpdateListener} listener
     */
    public removeOnFloorUpdateListener(listener: OnFloorUpdateListener): void {
        this.onFloorUpdateSubs.get(listener)?.remove();
        this.onFloorUpdateSubs.delete(listener);
        if (this.onCameraEventSubs.size == 0) {
            MapControlModule.setOnFloorUpdateListener(false);
        }
    }
}
