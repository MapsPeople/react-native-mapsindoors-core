import MPUtils from "./MPUtils";

export default class MPLocationSettings {  
    /**
     * @constructor
     * @private
     * @param selectable 
     */
    private constructor(
        readonly id: string,
        private _selectable?: boolean,
    ) {}

    /**
     * Creator for MPLocationSettings, used to decode JSON from the MapsIndoors SDK.
     *
     * @static
     * @param {MPLocationSettingsParams} object
     * @returns {MPLocationSettings}
     */
    public static create(id: string, object: MPLocationSettingsParams): MPLocationSettings {
        return new MPLocationSettings(
            id,
            object?.selectable,
        );
    }

    set selectable(selectable: boolean | undefined) {
        this._selectable = selectable;
        MPUtils.setSelectable(this.id, selectable);
    }

    get selectable(): boolean | undefined {
        return this._selectable;
    }
}

export interface MPLocationSettingsParams {
    selectable?: boolean;
}