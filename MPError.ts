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

    public static parse(error: Error): MPError {
        return MPError.create(JSON.parse(error.message))
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
