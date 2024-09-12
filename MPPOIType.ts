import MPLocationSettings from "./MPLocationSettings";

export default class MPPOIType {
    private constructor(
        public readonly name: string,
        public readonly translatedName: string,
        private locationSettings?: MPLocationSettings,
    ) { }

    public static create(object: MPPOITypeParams): MPPOIType {
        return new MPPOIType(
            object.name,
            object.translatedName,
            object.locationSettings ? MPLocationSettings.create(object.name, object.locationSettings) : undefined,
        );
    }

    /**
     * Set the selectable flag for the POI type.
     */
    set selectable(selectable: boolean | null) {
        if (this.locationSettings) {
            this.locationSettings.selectable = selectable;
        }else {
            this.locationSettings = MPLocationSettings.create(this.name, { selectable });
            this.locationSettings.selectable = selectable;
        }
    }

    /**
     * Get the selectable flag for the POI type.
     */
    get selectable(): boolean | null {
        return this.locationSettings?.selectable ?? null;
    }
    
}

export interface MPPOITypeParams {
    name: string;
    translatedName: string;
    locationSettings?: MPLocationSettings;
}