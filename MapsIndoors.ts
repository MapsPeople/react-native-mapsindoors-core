import { EmitterSubscription, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import {
    MPMapStyle,
    MPLocation, MPSolution, MPVenue, MPQuery, MPFilter,
    MPDisplayRule, MPSolutionDisplayRule, MPPositionProviderInterface,
    MPPositionResultInterface, MPUserRole, MPError, MPCategoryCollection, MPUserRoleCollection
} from "../../index";
import MPBuildingCollection from './MPBuildingCollection';
import MPVenueCollection from './MPVenueCollection';
import { EventNames } from './EventNames';
import { OnBaseMapCacheProgressListener } from './OnBaseMapCacheProgressListener';

const { MapsIndoorsModule } = NativeModules;
/**
 * Main class for accessing data in the MapsIndoors SDK.
 *
 * @export
 * @class MapsIndoors
 * @typedef {MapsIndoors}
 */
export default class MapsIndoors {
    /**
     * Creates an instance of MapsIndoors.
     *
     * @constructor
     * @private
     */
    private constructor() { };

    /**
     * Loads content from the MapsIndoors solution matching the given API {@link apiKey}.
     *
     * @public
     * @static
     * @async
     * @param {String} apiKey The key to the MapsIndoors solution.
     * @param {String[]} [venues=null] An optional list of venueIds as strings.
     * @returns {Promise<void>} If the load fails for any reason, it will reject with a {@link MPError}.
     */
    public static async load(apiKey: String, venues: String[] = null): Promise<void> {
        return MapsIndoorsModule.loadMapsIndoors(apiKey, venues).catch((err: Error) =>
            Promise.reject(MPError.parse(err))
        );
    }

    /**
     * Gets the default venue for this solution.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPVenue | undefined>}
     */
    public static async getDefaultVenue(): Promise<MPVenue | undefined> {
        return MapsIndoorsModule.getDefaultVenue().then((venueString: string) => {
            let venue = MPVenue.create(JSON.parse(venueString));
            return Promise.resolve(venue);
        }).catch((err: Error) => Promise.reject(MPError.parse(err)));
    }

    /**
     * Gets a collection of all venues for the current solution.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPVenueCollection>}
     */
    public static async getVenues(): Promise<MPVenueCollection> {
        return MapsIndoorsModule.getVenues()
            .catch((err: Error) => {return Promise.reject(MPError.create(MPError.parse(err)))})
            .then((venueString: string) => {
                const venues: MPVenueCollection = MPVenueCollection.create(JSON.parse(venueString));
                return Promise.resolve(venues);
            });
    }

    /**
     * Gets a collection of all building for the current solution.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPBuildingCollection>}
     */
    public static async getBuildings(): Promise<MPBuildingCollection> {
        return MapsIndoorsModule.getBuildings()
            .catch((err: Error) => Promise.reject(MPError.parse(err)))
            .then((buildingString: string) => {
                const buildings: MPBuildingCollection = MPBuildingCollection.create(JSON.parse(buildingString));
                return Promise.resolve(buildings);
            });
    }

    /**
     * Gets a collection of all categories for the current solution.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPCategoryCollection>}
     */
    public static async getCategories(): Promise<MPCategoryCollection> {
        return MapsIndoorsModule.getCategories()
            .catch((err: Error) => Promise.reject(MPError.parse(err)))
            .then((categoryString: string) => {
                const categories: MPCategoryCollection = MPCategoryCollection.create(JSON.parse(categoryString));
                return Promise.resolve(categories);
            });
    }

    /**
     * Gets all locations (a list of {@link MPLocation} objects) for the current solution.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPLocation[]>}
     */
    public static async getLocations(): Promise<MPLocation[]> {
        return MapsIndoorsModule.getLocations()
            .catch((err: Error) => Promise.reject(MPError.parse(err)))
            .then((locationsString: string) => {
                const locations: MPLocation[] = JSON.parse(locationsString).map((location: any) => MPLocation.create(location));
                return Promise.resolve(locations);
        })
    }

    /**
     * {@link disable} SDK event logging through MapsIndoors. No logs will be created or send with this disabled.
     *
     * By default it is enabled. But disabled in the CMS meaning logs will be created but never uploaded.
     *
     * @public
     * @static
     * @async
     * @param {boolean} disable
     * @returns {Promise<void>}
     */
    public static async disableEventLogging(disable: boolean): Promise<void> {
        return MapsIndoorsModule.disableEventLogging(disable).then(() => Promise.resolve());
    }

    /**
     * Retrieves the API key that was set when calling {@link load}.
     *
     * Will return empty string if no key has been set.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<string>}
     */
    public static async getApiKey(): Promise<string> {
        return MapsIndoorsModule.getApiKey();
    }

    /**
     * Returns a list of the current solution's available languages.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<string[]>}
     */
    public static async getAvailableLanguages(): Promise<string[]> {
        return MapsIndoorsModule.getAvailableLanguages()
            .catch((err: Error) => Promise.reject(MPError.parse(err)));
    }

    /**
     * Returns the default language for the current solution.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<string>}
     */
    public static async getDefaultLanguage(): Promise<string> {
        return MapsIndoorsModule.getDefaultLanguage()
            .catch((err: Error) => Promise.reject(MPError.parse(err)));
    }

    /**
     * Gets the language currently used in the SDK.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<string>}
     */
    public static async getLanguage(): Promise<string> {
        // No MPError mapping on purpose: neither native has a reject path here. iOS resolves a
        // non-optional String and Android a @NonNull one, both with their own fallback chain, so a
        // catch would be dead code.
        return MapsIndoorsModule.getLanguage();
    }

    /**
     * Retrieves a {@link MPLocation} by its {@link id}.
     *
     * @public
     * @static
     * @async
     * @param {string} id
     * @returns {Promise<MPLocation | undefined>}
     */
    public static async getLocationById(id: string): Promise<MPLocation | undefined> {
        return MapsIndoorsModule.getLocationById(id).then((locationString: string | undefined | null) => {
            if (locationString) {
                const location: MPLocation = MPLocation.create(JSON.parse(locationString));
                return Promise.resolve(location);
            } else {
                return Promise.resolve(undefined);
            }
        });
    }

    /**
     * Retrieves a list of {@link MPLocation}s by {@link externalIds}.
     *
     * @public
     * @static
     * @async
     * @param {string[]} externalIds
     * @returns {Promise<MPLocation[]>}
     */
    public static async getLocationsByExternalIds(externalIds: string[]): Promise<MPLocation[]> {
        return MapsIndoorsModule.getLocationsByExternalIds(externalIds).then((locationsString: string) => {
            const locations: MPLocation[] = JSON.parse(locationsString).map((location: any) => MPLocation.create(location));
            return Promise.resolve(locations);
        });
    }

    /**
     * Gets a collection of available map styles.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPMapStyle[]>}
     */
    public static async getMapStyles(): Promise<MPMapStyle[]> {
        return MapsIndoorsModule.getMapStyles().then((mapStylesString: string) => {
            const mapStyles: MPMapStyle[] = JSON.parse(mapStylesString).map((mapStyle: any) => MPMapStyle.create(mapStyle));
            return Promise.resolve(mapStyles);
        });
    }

    /**
     * Gets the {@link MPSolution} for the current loaded api key.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPSolution>}
     */
    public static async getSolution(): Promise<MPSolution> {
        return MapsIndoorsModule.getSolution()
            .catch((err: Error) => Promise.reject(MPError.parse(err)))
            .then((solutionString: string) => {
                const solution: MPSolution = MPSolution.create(JSON.parse(solutionString));
                return Promise.resolve(solution);
            });
    }

    /**
     * Run a query on all available locations with a query and filter.
     *
     * @public
     * @static
     * @async
     * @param {MPQuery} query
     * @param {MPFilter} filter
     * @returns {Promise<MPLocation[]>}
     */
    public static async getLocationsAsync(query: MPQuery, filter: MPFilter): Promise<MPLocation[]> {
        return MapsIndoorsModule.getLocationsAsync(JSON.stringify(query), JSON.stringify(filter))
            .then((locationsString: string) => {
                const locations: MPLocation[] = JSON.parse(locationsString).map((location: any) =>
                    MPLocation.create(location));
                return Promise.resolve(locations);
            }).catch((err: Error) => Promise.reject(MPError.parse(err)));
    }

    /**
     * Retrieve the display rule for the given {@link location}.
     *
     * Requires that {@link load} has successfully executed.
     *
     * @public
     * @static
     * @async
     * @param {MPLocation} location
     * @returns {Promise<MPDisplayRule | undefined>}
     */
    public static async getDisplayRuleByLocation(location: MPLocation): Promise<MPDisplayRule | undefined> {
        return MapsIndoorsModule.locationDisplayRuleExists(location.id).then((exists: boolean) => {
            return Promise.resolve(exists ? MPDisplayRule.create({ "id": location.id }) : undefined);
        });
    }

    /**
     * Retrieve the display rule with a given {@link name}.
     *
     * Requires that {@link load} has successfully executed.
     *
     * @public
     * @static
     * @async
     * @param {string} name The ID of the DisplayRule
     * @returns {Promise<MPDisplayRule>}
     */
    public static async getDisplayRuleByName(name: string): Promise<MPDisplayRule> {
        return MapsIndoorsModule.displayRuleNameExists(name).then((exists: boolean) => {
            return Promise.resolve(exists ? MPDisplayRule.create({ "id": name }) : undefined);
        });
    }

    /**
     * Retrieve the main display rule (can be configured in the CMS).
     *
     * Requires that {@link load} has successfully executed.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPDisplayRule>}
     */
    public static async getMainDisplayRule(): Promise<MPDisplayRule> {
        return Promise.resolve(MPDisplayRule.create({"id": "main"}));
    }

    /**
     * Retrieve the corresponding display rule for the given {@link MPSolutionDisplayRule}.
     *
     * Requires that {@link load} has successfully executed.
     *
     * @public
     * @static
     * @async
     * @param {MPSolutionDisplayRule} solutionDisplayRule
     * @returns {Promise<MPDisplayRule>}
     */
    public static async getSolutionDisplayRule(solutionDisplayRule: MPSolutionDisplayRule): Promise<MPDisplayRule> {
        return Promise.resolve(MPDisplayRule.create({"id": solutionDisplayRule}));
    }

    /**
     * Retrieve the default display rule (fallback rule in case the main rule has not loaded/ has errors).
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPDisplayRule>}
     */
    public static async getDefaultDisplayRule(): Promise<MPDisplayRule> {
        return Promise.resolve(MPDisplayRule.create({"id": "default"}));
    }


    /**
     * Set a new position provider, or pass undefined to remove the current one.
     *
     * @public
     * @static
     * @async
     * @param {MPPositionProviderInterface} positonProvider
     * @returns {Promise<void>}
     */
    public static async setPositionProvider(positonProvider?: MPPositionProviderInterface): Promise<void> {
        if (positonProvider) {
            const positionUpdateListener = (position: MPPositionResultInterface) => {
                if (Platform.OS === 'ios') {
                    let obj = {
                        coordinate: [position.point.longitude, position.point.latitude, position.floorIndex],
                        floorIndex: position.floorIndex,
                        bearing: position.bearing,
                        accuracy: position.accuracy,
                        providerName: position.positionProvider
                    }
                    MapsIndoorsModule.onPositionUpdate(JSON.stringify(obj));
                }else {
                    MapsIndoorsModule.onPositionUpdate(JSON.stringify(position));
                }
            };

            positonProvider.addOnPositionUpdateListener(positionUpdateListener);
            return MapsIndoorsModule.setPositionProvider(positonProvider.name).then(() => { });
        } else {
            return MapsIndoorsModule.removePositionProvider().then(() => { });
        }
    }

    /**
     * Gets the User Roles for the current solution.
     *
     * Note that role names are localized.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPUserRoleCollection>}
     */
    public static async getUserRoles(): Promise<MPUserRoleCollection> {
        return MapsIndoorsModule.getUserRoles().then((userRolesString: string) => {
            const userRoles: MPUserRoleCollection = MPUserRoleCollection.create(JSON.parse(userRolesString));
            return Promise.resolve(userRoles);
        }).catch((err: string) => Promise.reject(MPError.create(JSON.parse(err))));
    }

    /**
     * Checks if there is on device data (embedded/locally stored) available. For this to return true,
     * data has to be available for all solution data types ({@link MPLocation}, {@link MPBuilding}...).
     *
     * Returns true if data is available, otherwise returns false.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<boolean>}
     */
    public static async checkOfflineDataAvailability(): Promise<boolean> {
        return MapsIndoorsModule.checkOfflineDataAvailability();
    }

    /**
     * Clears the internal state of MapsIndoors SDK. Any loaded content is purged from memory.
     *
     * Invoke {@link load} to start the SDK anew.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<void>}
     */
    public static async destroy(): Promise<void> {
        return MapsIndoorsModule.destroy().then(() => { });
    }

    /**
     * Check if the current API key is valid.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<boolean>}
     */
    public static async isApiKeyValid(): Promise<boolean> {
        return MapsIndoorsModule.isApiKeyValid();
    }

    /**
     * Check if {@link load} has been called.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<boolean>}
     */
    public static async isInitialized(): Promise<boolean> {
        return MapsIndoorsModule.isInitialized();
    }

    /**
     * Check if the SDK is initialized and ready for use.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<boolean>}
     */
    public static async isReady(): Promise<boolean> {
        return MapsIndoorsModule.isReady();
    }

    /**
     * Sets the SDK's internal language.
     *
     * The tag should be one the solution advertises - see {@link getAvailableLanguages} - and is
     * matched loosely: casing is ignored, and legacy region-only Chinese tags resolve to their
     * script, so `zh-CN` selects `zh-Hans` and `zh-TW` selects `zh-Hant`. Use
     * {@link MPSolution.hasLanguage} to check a tag before calling, or
     * {@link MPSolution.resolveLanguage} to turn a device locale into the exact tag the solution
     * publishes.
     *
     * Until this is called, the SDK language is:
     *
     * * the solution's default language - see {@link getDefaultLanguage}.
     * * the current device language, if the MapsIndoors data isn't available (ie: first app run
     *   without network access).
     *
     * The returned boolean does not mean the same thing on both platforms, and an app should not
     * branch on it without reading this:
     *
     * * On **Android** it is `false` when the tag does not resolve against the solution's
     *   available languages, and also when the SDK has no solution yet or is mid-
     *   {@link synchronizeContent}. In that second case the change is *queued* and applied once
     *   the SDK is ready, so `false` is not "it will never take effect".
     * * On **iOS** it reports only that the tag was accepted; there is no check against the
     *   solution's available languages, so in the default configuration it is `true` for any
     *   non-empty tag. An unsupported language is reconciled later, on the next solution fetch,
     *   which reverts the SDK to the solution's default.
     *
     * A `false` here is therefore a reliable "this did not take effect" signal on Android only. To
     * confirm the language actually changed on either platform, read it back with
     * {@link getLanguage}.
     *
     * An empty or whitespace-only tag resolves `false` without reaching the native SDK, matching
     * Android's own precondition. iOS would otherwise accept it and store an empty language.
     *
     * @public
     * @static
     * @async
     * @param {string} language A BCP-47 language tag, for example `en`, `zh-Hans` or `zh-CN`.
     * @returns {Promise<boolean>}
     */
    public static async setLanguage(language: string): Promise<boolean> {
        if (!language?.trim()) {
            return false;
        }
        return MapsIndoorsModule.setLanguage(language);
    }

    /**
     * Main data synchronization method.
     *
     * If not manually invoked, [MapControl.create(config, listener)] will invoke it.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<void>}
     */
    public static async synchronizeContent(): Promise<void> {
        return MapsIndoorsModule.synchronizeContent().catch((err: Error) => {
            return Promise.reject(MPError.parse(err));
        });
    }

    /**
     * Applies a list of {@link MPUserRole}s to the SDK which will get the UserRole specific locations..
     *
     * @public
     * @static
     * @async
     * @param {MPUserRole[]} userRoles
     * @returns {Promise<void>}
     */
    public static async applyUserRoles(userRoles: MPUserRole[]): Promise<void> {
        return MapsIndoorsModule.applyUserRoles(JSON.stringify(userRoles));
    }

    /**
     * Returns the list of {@link MPUserRole}s that is currently applied.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<MPUserRole[]>}
     */
    public static async getAppliedUserRoles(): Promise<MPUserRole[]> {
        return MapsIndoorsModule.getAppliedUserRoles().then((userRolesString: string) => {
            const userRoles: MPUserRole[] = JSON.parse(userRolesString).map((userRole: any) => MPUserRole.create(userRole));
            return Promise.resolve(userRoles);
        });
    }

    /**
     * Add venues to the sync list.
     * @param venues list of venueIds to add to sync.
     * @returns 
     */
    public static async addVenuesToSync(venues: string[]): Promise<void> {
        return MapsIndoorsModule.addVenuesToSync(venues);
    }

    /**
     * Remove venues from the sync list.
     * @param venues List of venueIds to remove from sync.
     * @returns 
     */
    public static async removeVenuesToSync(venues: string[]): Promise<void> {
        return MapsIndoorsModule.removeVenuesToSync(venues);
    }
    
    /**
     * Get a list of venueIds that are synced.
     * @returns Promise<string[]> A list of venueIds that are synced.
     */
    public static async getSyncedVenues(): Promise<string[]> {
        return MapsIndoorsModule.getSyncedVenues().then((venues: string[]|null) => {
            if (venues === null || venues === undefined) {
                return [];
            }else {
                return venues;
            }
        });
    }

    /**
     * Cache all data for the current solution. Including tiles and images if present on the solution.
     * @param apiKey The key to the MapsIndoors solution.
     * @returns Promise<boolean> True if the caching was successful, otherwise false.
     */
    public static async cacheData(apiKey: String): Promise<boolean> {
        return MapsIndoorsModule.cacheData(apiKey);
    }

    /**
     * Checks whether the map provider in use can cache base-map tiles at all.
     *
     * Base-map tiles are the outdoor map rendered underneath MapsIndoors, and they live in the map
     * provider's own storage - separate from the MapsIndoors content cached by {@link cacheData}.
     * Only the Mapbox provider can cache them; on the Google Maps provider this returns false and
     * every other base-map caching call rejects with {@link MPError.baseMapCachingNotSupported}.
     *
     * Check this before offering offline base maps in the UI, so an unsupported provider fails fast
     * instead of once per venue.
     *
     * @public
     * @static
     * @async
     * @returns {Promise<boolean>} True if base-map tiles can be cached.
     */
    public static async isBaseMapCachingSupported(): Promise<boolean> {
        return MapsIndoorsModule.isBaseMapCachingSupported();
    }

    /**
     * Enables or disables base-map tile caching for the solution matching the given {@link apiKey}.
     *
     * The flag only marks the solution, it downloads nothing - call
     * {@link synchronizeBaseMapTiles} for that. Turning it off does not remove already-cached
     * tiles either; those are reclaimed when the solution's cache is removed.
     *
     * The flag is persisted, so it survives an app restart and only has to be set once.
     *
     * It is a property of the solution, not of the map provider, so it is accepted and stored even
     * where {@link isBaseMapCachingSupported} is false - on Google Maps this resolves successfully
     * and sets a flag nothing can act on, and only {@link synchronizeBaseMapTiles} reports
     * {@link MPError.baseMapCachingNotSupported}. Check {@link isBaseMapCachingSupported} first if
     * you need to know before then. Rejecting here instead would make the same call behave
     * differently per map provider, which is worse for code meant to run against either.
     *
     * @public
     * @static
     * @async
     * @param {boolean} enabled True to cache base-map tiles for this solution.
     * @param {string} apiKey The key to the MapsIndoors solution.
     * @returns {Promise<void>} If the solution is not managed, or the call fails for any other
     * reason, it will reject with a {@link MPError}.
     */
    public static async setBaseMapTilesEnabled(enabled: boolean, apiKey: string): Promise<void> {
        return MapsIndoorsModule.setBaseMapTilesEnabled(enabled, apiKey)
            .then(() => { })
            .catch((err: Error) => Promise.reject(MPError.parse(err)));
    }

    /**
     * Downloads and caches base-map tiles so the map can render without a network connection.
     *
     * Covers every solution that base-map tile caching has been enabled for with
     * {@link setBaseMapTilesEnabled}, unless {@link apiKeys} narrows it to a subset. This is a
     * long-running network download that can take minutes - pass {@link onProgress} to follow it.
     *
     * This runs independently of {@link synchronizeContent} and {@link cacheData}, which cache the
     * MapsIndoors content itself. Both are needed for a fully offline map.
     *
     * On iOS, a {@link MapView} has to have been mounted at least once first: the iOS SDK registers
     * its base-map cache when it builds the map provider, and until then this rejects with
     * {@link MPError.baseMapCachingNotSupported} even on Mapbox. Android has no such ordering
     * requirement.
     *
     * Run one call at a time. Progress arrives on a single channel carrying only the fraction, with
     * nothing identifying the call, so two overlapping calls interleave their progress - including
     * into a caller that passed no {@link onProgress} of its own. The default already covers every
     * enabled solution in one call, so there is rarely a reason to fan out.
     *
     * @public
     * @static
     * @async
     * @param {OnBaseMapCacheProgressListener} [onProgress] Optional listener called with the
     * fraction completed, from 0.0 to 1.0. Not every map provider reports progress.
     * @param {string[]} [apiKeys] An optional list of solution API keys to narrow the operation to.
     * Defaults to every solution with base-map tile caching enabled. An empty array narrows it to
     * nothing and caches nothing, which is deliberately not the same as omitting the argument - a
     * filter that matched no solutions should not turn into a download of all of them.
     * @returns {Promise<void>} Rejects with a {@link MPError} if the map provider cannot cache
     * base-map tiles ({@link MPError.baseMapCachingNotSupported}) or a download fails.
     */
    public static async synchronizeBaseMapTiles(onProgress?: OnBaseMapCacheProgressListener, apiKeys?: string[]): Promise<void> {
        let subscription: EmitterSubscription | undefined;
        if (onProgress) {
            // Subscribed before the call rather than in the module's constructor: the native side only
            // emits while a download is running, and an always-live subscription would keep the JS
            // callback alive for the lifetime of the app.
            subscription = new NativeEventEmitter(MapsIndoorsModule)
                .addListener(EventNames.onBaseMapCacheProgress, (event: { progress: number }) => onProgress(event.progress));
        }

        // try/finally rather than .finally() on the chain: the native method is invoked before the
        // chain exists, so a synchronous throw there - a JS package newer than the native one, whose
        // module has no such method - would otherwise leave the subscription holding onProgress for
        // the lifetime of the app. Only a rejection is parsed as an MPError; a synchronous throw is
        // not ours to reinterpret, so it propagates as it is.
        try {
            return await MapsIndoorsModule.synchronizeBaseMapTiles(apiKeys ? apiKeys : null)
                .then(() => { })
                .catch((err: Error) => Promise.reject(MPError.parse(err)));
        } finally {
            subscription?.remove();
        }
    }
}
