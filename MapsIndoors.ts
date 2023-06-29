import { NativeModules, Platform } from 'react-native';
import {
    MPMapStyle,
    MPLocation, MPSolution, MPVenue, MPQuery, MPFilter,
    MPDisplayRule, MPSolutionDisplayRule, MPPositionProviderInterface,
    MPPositionResultInterface, MPUserRole, MPError, MPCategoryCollection, MPUserRoleCollection
} from "../../index";
import MPBuildingCollection from './MPBuildingCollection';
import MPVenueCollection from './MPVenueCollection';

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
     * @returns {Promise<void>} If the load fails for any reason, it will reject with a {@link MPError}.
     */
    public static async load(apiKey: String): Promise<void> {
        return MapsIndoorsModule.loadMapsIndoors(apiKey).catch((err: Error) =>
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
            .catch((err: Error) => {Promise.reject(MPError.parse(err))})
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
        return MapsIndoorsModule.getDefaultLanguage();
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
        return MapsIndoorsModule.getSolution().then((solutionString: string) => {
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
     * Retrieve the display rule with a given [@link name}.
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
     * By default, the SDK language can be:
     *
     * * the solution's default language ({@link MPSolutionInfo#getDefaultLanguage()}).
     * * the current device language, if the MapsIndoors data isn't available (ie: first app run without network access).
     *
     * @public
     * @static
     * @async
     * @param {string} language
     * @returns {Promise<boolean>}
     */
    public static async setLanguage(language: string): Promise<boolean> {
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

}
