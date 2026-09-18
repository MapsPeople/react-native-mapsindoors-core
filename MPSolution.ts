import { MPSolutionConfig } from "../../index";
import { resolveLanguageTag } from "./MPLanguageTag";
import MPPOIType from "./MPPOIType";
import MPUtils from "./MPUtils";

/**
 * Governs the topmost settings for a MapsIndoors solution.
 *
 * @export
 * @class MPSolution
 * @typedef {MPSolution}
 */
export default class MPSolution {

    /**
     * Creates an instance of MPSolution.
     *
     * @constructor
     * @private
     * @param {string} id
     * @param {string} name
     * @param {MPSolutionConfig} solutionConfig
     * @param {string} defaultLanguage
     * @param {string[]} availableLanguages
     * @param {string[]} modules
     * @param {?string} [locationTemplates]
     * @param {?string} [customerId]
     * @param {?string} [mapClientUrl]
     */
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly solutionConfig: MPSolutionConfig,
        public readonly defaultLanguage: string,
        public readonly availableLanguages: string[],
        private readonly modules: string[],
        public readonly locationTemplates?: string,
        public readonly customerId?: string,
        public mapClientUrl?: string,
        public readonly types?: MPPOIType[]
    ) { }


    /**
     * Creator for MPSolution, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPSolutionParams} object
     * @returns {MPSolution}
     */
    public static create(object: MPSolutionParams): MPSolution {
        return new MPSolution(
            object?.id,
            object?.name,
            MPSolutionConfig.create(object?.solutionConfig),
            object?.defaultLanguage,
            object?.availableLanguages,
            object?.modules,
            object?.locationTemplates,
            object?.customerId,
            object?.mapClientUrl,
            object?.types?.map((type: any) => MPPOIType.create(type)),
        );
    }

    /**
     * Check if the solution supports a language.
     *
     * Matching follows BCP-47 / RFC 4647 rather than string equality, so the tag does not have to
     * be spelled exactly the way the CMS spells it. Casing is ignored (`zh-hant` matches
     * `zh-Hant`), the ICU underscore form is accepted (`zh_Hans`), legacy region-only Chinese tags
     * resolve to their script (`zh-CN` matches `zh-Hans`, `zh-TW` matches `zh-Hant`), and a more
     * specific tag falls back to a less specific one (`en-US` matches `en`).
     *
     * Deliberately conservative about ambiguity: bare `zh` does **not** match a solution that
     * advertises only `zh-Hans` and `zh-Hant`, because there is no way to tell which script is
     * wanted. Pass the script explicitly in that case.
     *
     * `true` means the tag is safe to pass to {@link MapsIndoors.setLanguage}. `false` is not a
     * guarantee that `setLanguage` will reject it - see that method for what its boolean means on
     * each platform.
     *
     * @public
     * @param {?string} [language] A BCP-47 language tag, for example `en`, `zh-Hans` or `zh-CN`.
     * @returns {boolean}
     */
    public hasLanguage(language?: string): boolean {
        return this.resolveLanguage(language) !== undefined;
    }

    /**
     * Resolve a language tag to the exact tag this solution advertises.
     *
     * The companion to {@link hasLanguage}, for when a yes or no is not enough: given a device
     * locale, this returns the tag to hand to {@link MapsIndoors.setLanguage}, spelled the way the
     * CMS spells it. `resolveLanguage("zh-Hant-TW")` returns `"zh-Hant"` for a solution that
     * publishes it.
     *
     * @public
     * @param {?string} [language] A BCP-47 language tag, for example `en`, `zh-Hans` or `zh-CN`.
     * @returns {(string | undefined)} The matching advertised tag, or undefined if there is none.
     */
    public resolveLanguage(language?: string): string | undefined {
        return resolveLanguageTag(language, this.availableLanguages);
    }

    /**
     * Check whether the 22nd zoom level is available for select map providers.
     *
     * @public
     * @returns {boolean}
     */
    public isZoom22Enabled(): boolean {
        return this.modules.includes("z22");
    }

    /**
     * Check whether wall extrusions are available for select map providers.
     *
     * @public
     * @returns {boolean}
     */
    public is3DWallsEnabled(): boolean {
        return this.modules.includes("3dwalls");
    }

    /**
     * Check whether room extrusions are available for select map providers.
     *
     * @public
     * @returns {boolean}
     */
    public is3DExtrusionsEnabled(): boolean {
        return this.modules.includes("3dextrusions");
    }

    /**
     * Parses a venue ID and a location ID to create a mapClientUrl.
     *
     * @public
     * @async
     * @param {string} venueId
     * @param {string} locationId
     * @returns {Promise<string>}
     */
    public async parseMapClient(venueId: string, locationId: string): Promise<string> {
        return MPUtils.parseMapClientUrl(venueId, locationId);
    }
}

/**
 * Parameter interface for {@link MPSolution}.
 *
 * @export
 * @interface MPSolutionParams
 * @typedef {MPSolutionParams}
 */
export interface MPSolutionParams {
    /**
     * The solution's ID.
     *
     * @type {string}
     */
    id: string;
    /**
     * The solution's name.
     *
     * @type {string}
     */
    name: string;
    /**
     * The solution's configuration object.
     *
     * @type {MPSolutionConfig}
     */
    solutionConfig: MPSolutionConfig;
    /**
     * The id of the solution in customer systems.
     *
     * @type {?string}
     */
    customerId?: string;
    /**
     * The solution's default language.
     *
     * @type {string}
     */
    defaultLanguage: string;
    /**
     * An array of available languages for the solution.
     *
     * @type {string[]}
     */
    availableLanguages: string[];
    /**
     * The URL used to fetch data from the CMS.
     *
     * @type {?string}
     */
    mapClientUrl?: string;
    /**
     * The solution's location template.
     *
     * @type {?string}
     */
    locationTemplates?: string;
    /**
     * The solution's POI types.
     *
     * @type {?MPPOIType[]}
     */
    types?: MPPOIType[];
    /**
     * An array of modules that define some behaviors of the SDK set through the CMS.
     *
     * @type {string[]}
     */
    modules: string[];
}