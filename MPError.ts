/**
 * A class of errors that can occur when using the MapsIndoors SDK.
 *
 * @export
 * @class MPError
 * @typedef {MPError}
 */
export default class MPError {



  /**
   * Occurs when an internet connection is required, or if the content server is unresponsive.
   *
   * @static
   * @readonly
   * @type {number}
   */
  static readonly networkError: number = 10;

  /**
   * Occurs if an unknown exception is caught.
   *
   * @static
   * @readonly
   * @type {number}
   */
  static readonly unknownError: number = 20;

  /**
   * Occurs if some functions are called before the SDK has been initialized.
   *
   * @static
   * @readonly
   * @type {number}
   */
  static readonly sdkNotInitialized: number = 22;

  /**
   * Occurs if the supplied API key is not a valid MapsIndoors key.
   *
   * @static
   * @readonly
   * @type {number}
   */
  static readonly invalidApiKey: number = 100;

  /**
   * Occurs if base-map tile caching is attempted on a map provider that cannot cache base-map
   * tiles. The Mapbox provider supports it; the Google Maps provider does not.
   *
   * Canonical copy. The same value is spelled out in Android's `MIError.BASEMAP_CACHE_NOT_SUPPORTED`
   * and as a literal in iOS's `doRejectBaseMapCache`; drift silently reports "not supported" as a
   * generic failure.
   *
   * @static
   * @readonly
   * @type {number}
   */
  static readonly baseMapCachingNotSupported: number = 9000;

  /**
   * Occurs if base-map tile caching is attempted before a map provider's base-map cache has been
   * registered with the SDK.
   *
   * @static
   * @readonly
   * @type {number}
   */
  static readonly baseMapCacheNotRegistered: number = 9001;

    /**
     * Creates an instance of MPError.
     *
     * @constructor
     * @param {number} code The errors code, this will be a MapsIndoors error code.
     *
     * If unsure of the code, check the native SDK.
     *
     * @param {string} message A descriptive message of what caused the error.
     * @param {?number} [status] An optional status code, this will in case of network issues be the response code.
     * @param {?*} [tag] Optional object tag.
     */
    constructor(
        public readonly code: number,
        public readonly message: string,
        public readonly status?: number,
        public readonly tag?: any,
    ) { }

    /**
     * Creator for MPError, used to decode JSON from the MapsIndoors SDK.
     *
     * @public
     * @static
     * @param {MPErrorParams} object
     * @returns {MPError}
     */
    public static create(object: MPErrorParams): MPError {
        return new MPError(
            object.code,
            object.message,
            object?.status,
            object?.tag
        );
    }

    /**
     * Turn a rejection from a native module into an {@link MPError}.
     *
     * The native modules reject with a JSON-encoded MPError, but a rejection reaching here can
     * also come from the bridge itself or from JavaScript, and then the message is plain text.
     * Parsing that blindly threw a SyntaxError and threw away the real message, so a caller saw
     * "JSON Parse error: Unexpected character: E" instead of what actually went wrong. Fall back
     * to wrapping the message as an unknown error, which keeps it readable and keeps this method's
     * contract - it returns an MPError, it does not throw a different one.
     *
     * @public
     * @static
     * @param {Error} error
     * @returns {MPError}
     */
    public static parse(error: Error): MPError {
        try {
            const parsed = JSON.parse(error?.message);
            if (parsed !== null && typeof parsed === "object" && typeof parsed.code === "number") {
                return MPError.create(parsed);
            }
        } catch {
            // Not a native MPError payload; fall through to wrapping the raw message.
        }
        return new MPError(MPError.unknownError, error?.message ?? "Unknown error");
    }
}

/**
 * Parameter interface for {@link MPError}.
 *
 * @interface MPErrorParams
 * @typedef {MPErrorParams}
 */
interface MPErrorParams {
    /**
     * The errors code, this will be a MapsIndoors error code.
     *
     * If unsure of the code, check the native SDK.
     *
     * @type {number}
     */
    code: number,
    /**
     * A descriptive message of what caused the error.
     *
     * @type {string}
     */
    message: string,
    /**
     * An optional status code, this will in case of network issues be the response code.
     *
     * @type {?number}
     */
    status?: number,
    /**
     * Optional object tag.
     *
     * @type {?*}
     */
    tag?: any,
}
