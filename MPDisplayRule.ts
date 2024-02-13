import { NativeModules } from 'react-native';
import { MPError, MPIconSize } from "../../index";
import { MPIconPlacement } from './MPIconPlacement';
import { MPLabelType } from './MPLabelType';
import { MPBadgePosition } from './MPBadgePosition';
const { DisplayRule } = NativeModules;


/**
 * A collection of settings that dictate how MapsIndoors entities are displayed on the map.
 *
 * @export
 * @class MPDisplayRule
 * @typedef {MPDisplayRule}
 */
export default class MPDisplayRule {

    /**
     * Creates an instance of MPDisplayRule.
     *
     * @constructor
     * @private
     * @param {string} id
     */
    private constructor(readonly id: string) { }

    /**
     * Creator for MPDisplayRule, used to decode JSON from the MapsIndoors SDK.
     *
     * This is primarily for internal use, and should not be used outside the SDK.
     *
     * @public
     * @static
     * @param {?*} [object]
     * @returns {MPDisplayRule}
     */
    public static create(object?: any): MPDisplayRule {
        const mpDisplayRule: MPDisplayRule = new MPDisplayRule(object?.id);
        return mpDisplayRule;
    }

    /**
     * Get the general visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isVisible(): Promise<boolean> {
        return DisplayRule.isVisible(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the general visibility value.
     *
     * @public
     * @async
     * @param {boolean} visible
     * @returns {Promise<void>}
     */
    public async setVisible(visible: boolean): Promise<void> {
        return DisplayRule.setVisible(this.id, JSON.stringify(visible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the icon's visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isIconVisible(): Promise<boolean> {
        return DisplayRule.isIconVisible(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the icon's visibility value.
     *
     * @public
     * @async
     * @param {boolean} iconVisible
     * @returns {Promise<void>}
     */
    public async setIconVisible(iconVisible: boolean): Promise<void> {
        return DisplayRule.setIconVisible(this.id, JSON.stringify(iconVisible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isPolygonVisible(): Promise<boolean> {
        return DisplayRule.isPolygonVisible(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's visibility value.
     *
     * @public
     * @async
     * @param {boolean} polygonVisible
     * @returns {Promise<void>}
     */
    public async setPolygonVisible(polygonVisible: boolean): Promise<void> {
        return DisplayRule.setPolygonVisible(this.id, JSON.stringify(polygonVisible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the label's visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isLabelVisible(): Promise<boolean> {
        return DisplayRule.isLabelVisible(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the label's visibility value.
     *
     * @public
     * @async
     * @param {boolean} labelVisible
     * @returns {Promise<void>}
     */
    public async setLabelVisible(labelVisible: boolean): Promise<void> {
        return DisplayRule.setLabelVisible(this.id, JSON.stringify(labelVisible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isModel2DVisible(): Promise<boolean> {
        return DisplayRule.isModel2DVisible(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the 2D model's visibility value.
     *
     * @public
     * @async
     * @param {boolean} model2DVisible
     * @returns {Promise<void>}
     */
    public async setModel2DVisible(model2DVisible: boolean): Promise<void> {
        return DisplayRule.setModel2DVisible(this.id, JSON.stringify(model2DVisible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the wall's visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isWallVisible(): Promise<boolean> {
        return DisplayRule.isWallVisible(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the wall's visibility value.
     *
     * @public
     * @async
     * @param {boolean} wallVisible
     * @returns {Promise<void>}
     */
    public async setWallVisible(wallVisible: boolean): Promise<void> {
        return DisplayRule.setWallVisible(this.id, JSON.stringify(wallVisible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the extrusion's visibility value.
     *
     * @public
     * @async
     * @returns {Promise<boolean>}
     */
    public async isExtrusionVisible(): Promise<boolean> {
        return DisplayRule.isExtrusionVisible(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the extrusion's visibility value.
     *
     * @public
     * @async
     * @param {boolean} extrusionVisible
     * @returns {Promise<void>}
     */
    public async setExtrusionVisible(extrusionVisible: boolean): Promise<void> {
        return DisplayRule.setExtrusionVisible(this.id, JSON.stringify(extrusionVisible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the general zoom from value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getZoomFrom(): Promise<number> {
        return DisplayRule.getZoomFrom(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the general zoom from value.
     *
     * @public
     * @async
     * @param {number} zoomFrom
     * @returns {Promise<void>}
     */
    public async setZoomFrom(zoomFrom: number): Promise<void> {
        if (zoomFrom == null) {
            zoomFrom = -1;
        }
        return DisplayRule.setZoomFrom(this.id, zoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the general zoom to value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getZoomTo(): Promise<number> {
        return DisplayRule.getZoomTo(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the general zoom to value.
     *
     * @public
     * @async
     * @param {number} zoomTo
     * @returns {Promise<void>}
     */
    public async setZoomTo(zoomTo: number): Promise<void> {
        if (zoomTo == null) {
            zoomTo = -1;
        }
        return DisplayRule.setZoomTo(this.id, zoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the icon's URL.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getIconUrl(): Promise<string> {
        return DisplayRule.getIconUrl(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the icon's URL.
     *
     * @public
     * @async
     * @param {string} iconUrl
     * @returns {Promise<void>}
     */
    public async setIcon(iconUrl: string): Promise<void> {
        return DisplayRule.setIcon(this.id, iconUrl).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the icon's size.
     *
     * @public
     * @async
     * @returns {Promise<MPIconSize>}
     */
    public async getIconSize(): Promise<MPIconSize> {
        //TODO: handle rejection propagation
        let iconSize = await DisplayRule.getIconSize(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
        return Promise.resolve(MPIconSize.create(JSON.parse(iconSize))).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the icon's size.
     *
     * @public
     * @async
     * @param {MPIconSize} iconSize
     * @returns {Promise<void>}
     */
    public async setIconSize(iconSize: MPIconSize): Promise<void> {
        return DisplayRule.setIconSize(this.id, JSON.stringify(iconSize)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the label string.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getLabel(): Promise<string> {
        return DisplayRule.getLabel(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the label string.
     *
     * @public
     * @async
     * @param {string} label
     * @returns {Promise<void>}
     */
    public async setLabel(label: string): Promise<void> {
        return DisplayRule.setLabel(this.id, label).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the label's zoom from value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getLabelZoomFrom(): Promise<number> {
        return DisplayRule.getLabelZoomFrom(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the label's zoom from value.
     *
     * @public
     * @async
     * @param {number} zoomFrom
     * @returns {Promise<void>}
     */
    public async setLabelZoomFrom(zoomFrom: number): Promise<void> {
        if (zoomFrom == null) {
            zoomFrom = -1;
        }
        return DisplayRule.setLabelZoomFrom(this.id, zoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the label's zoom to value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getLabelZoomTo(): Promise<number> {
        return DisplayRule.getLabelZoomTo(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the label's zoom to value.
     *
     * @public
     * @async
     * @param {number} zoomTo
     * @returns {Promise<void>}
     */
    public async setLabelZoomTo(zoomTo: number): Promise<void> {
        if (zoomTo == null) {
            zoomTo = -1;
        }
        return DisplayRule.setLabelZoomTo(this.id, zoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the label's max width value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getLabelMaxWidth(): Promise<number> {
        return DisplayRule.getLabelMaxWidth(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the label's max width value.
     *
     * @public
     * @async
     * @param {number} labelMaxWidth
     * @returns {Promise<void>}
     */
    public async setLabelMaxWidth(labelMaxWidth: number): Promise<void> {
        if (labelMaxWidth == null) {
            labelMaxWidth = -1;
        }
        return DisplayRule.setLabelMaxWidth(this.id, labelMaxWidth).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the plygon's zoom from value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getPolygonZoomFrom(): Promise<number> {
        return DisplayRule.getPolygonZoomFrom(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the plygon's zoom from value.
     *
     * @public
     * @async
     * @param {number} polygonZoomFrom
     * @returns {Promise<void>}
     */
    public async setPolygonZoomFrom(polygonZoomFrom: number): Promise<void> {
        if (polygonZoomFrom == null) {
            polygonZoomFrom = -1;
        }
        return DisplayRule.setPolygonZoomFrom(this.id, polygonZoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's zoom to value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getPolygonZoomTo(): Promise<number> {
        return DisplayRule.getPolygonZoomTo(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's zoom to value.
     *
     * @public
     * @async
     * @param {number} polygonZoomTo
     * @returns {Promise<void>}
     */
    public async setPolygonZoomTo(polygonZoomTo: number): Promise<void> {
        if (polygonZoomTo == null) {
            polygonZoomTo = -1;
        }
        return DisplayRule.setPolygonZoomFrom(this.id, polygonZoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's stroke width value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getPolygonStrokeWidth(): Promise<number> {
        return DisplayRule.getPolygonStrokeWidth(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's stroke width value.
     *
     * @public
     * @async
     * @param {number} strokeWidth
     * @returns {Promise<void>}
     */
    public async setPolygonStrokeWidth(strokeWidth: number): Promise<void> {
        if (strokeWidth == null) {
            strokeWidth = -1;
        }
        return DisplayRule.setPolygonStrokeWidth(this.id, strokeWidth).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's stroke color value.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getPolygonStrokeColor(): Promise<string> {
        return DisplayRule.getPolygonStrokeColor(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's stroke color value.
     *
     * @public
     * @async
     * @param {string} strokeColor
     * @returns {Promise<void>}
     */
    public async setPolygonStrokeColor(strokeColor: string): Promise<void> {
        return DisplayRule.setPolygonStrokeColor(this.id, strokeColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's stroke opacity value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getPolygonStrokeOpacity(): Promise<number> {
        return DisplayRule.getPolygonStrokeOpacity(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's stroke opacity value.
     *
     * @public
     * @async
     * @param {number} strokeOpacity
     * @returns {Promise<void>}
     */
    public async setPolygonStrokeOpacity(strokeOpacity: number): Promise<void> {
        if (strokeOpacity == null) {
            strokeOpacity = -1;
        }
        return DisplayRule.setPolygonStrokeOpacity(this.id, strokeOpacity).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's fill opacity value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getPolygonFillOpacity(): Promise<number> {
        return DisplayRule.getPolygonFillOpacity(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's fill opacity value.
     *
     * @public
     * @async
     * @param {number} fillOpacity
     * @returns {Promise<void>}
     */
    public async setPolygonFillOpacity(fillOpacity: number): Promise<void> {
        if (fillOpacity == null) {
            fillOpacity = -1;
        }
        return DisplayRule.setPolygonFillOpacity(this.id, fillOpacity).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the polygon's fill color value.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getPolygonFillColor(): Promise<string> {
        return DisplayRule.getPolygonFillColor(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the polygon's fill color value.
     *
     * @public
     * @async
     * @param {string} fillColor
     * @returns {Promise<void>}
     */
    public async setPolygonFillColor(fillColor: string): Promise<void> {
        return DisplayRule.setPolygonFillColor(this.id, fillColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the wall's color value.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getWallColor(): Promise<string> {
        return DisplayRule.getWallColor(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the wall's color value.
     *
     * @public
     * @async
     * @param {string} wallColor
     * @returns {Promise<void>}
     */
    public async setWallColor(wallColor: string): Promise<void> {
        return DisplayRule.setWallColor(this.id, wallColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the wall's height value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getWallHeight(): Promise<number> {
        return DisplayRule.getWallHeight(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the wall's height value.
     *
     * @public
     * @async
     * @param {number} wallHeight
     * @returns {Promise<void>}
     */
    public async setWallHeight(wallHeight: number): Promise<void> {
        if (wallHeight == null) {
            wallHeight = -1;
        }
        return DisplayRule.setWallHeight(this.id, wallHeight).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the wall's zoom from value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getWallZoomFrom(): Promise<number> {
        return DisplayRule.getWallZoomFrom(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the wall's zoom from value.
     *
     * @public
     * @async
     * @param {number} wallZoomFrom
     * @returns {Promise<void>}
     */
    public async setWallZoomFrom(wallZoomFrom: number): Promise<void> {
        if (wallZoomFrom == null) {
            wallZoomFrom = -1;
        }
        return DisplayRule.setWallZoomFrom(this.id, wallZoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the wall's zoom to value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getWallZoomTo(): Promise<number> {
        return DisplayRule.getWallZoomTo(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the wall's zoom to value.
     *
     * @public
     * @async
     * @param {number} wallZoomTo
     * @returns {Promise<void>}
     */
    public async setWallZoomTo(wallZoomTo: number): Promise<void> {
        if (wallZoomTo == null) {
            wallZoomTo = -1;
        }
        return DisplayRule.setWallZoomTo(this.id, wallZoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the extrusion's color value.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getExtrusionColor(): Promise<string> {
        return DisplayRule.getExtrusionColor(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the extrusion's color value.
     *
     * @public
     * @async
     * @param {string} extrusionColor
     * @returns {Promise<void>}
     */
    public async setExtrusionColor(extrusionColor: string): Promise<void> {
        return DisplayRule.setExtrusionColor(this.id, extrusionColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the extrusion's height value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getExtrusionHeight(): Promise<number> {
        return DisplayRule.getExtrusionHeight(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the extrusion's height value.
     *
     * @public
     * @async
     * @param {number} extrusionHeight
     * @returns {Promise<void>}
     */
    public async setExtrusionHeight(extrusionHeight: number): Promise<void> {
        if (extrusionHeight == null) {
            extrusionHeight = -1;
        }
        return DisplayRule.setExtrusionHeight(this.id, extrusionHeight).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the extrusion's zoom from value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getExtrusionZoomFrom(): Promise<number> {
        return DisplayRule.getExtrusionZoomFrom(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the extrusion's zoom from value.
     *
     * @public
     * @async
     * @param {number} extrusionZoomFrom
     * @returns {Promise<void>}
     */
    public async setExtrusionZoomFrom(extrusionZoomFrom: number): Promise<void> {
        if (extrusionZoomFrom == null) {
            extrusionZoomFrom = -1;
        }
        return DisplayRule.setExtrusionZoomFrom(this.id, extrusionZoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the extrusion's zoom to value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getExtrusionZoomTo(): Promise<number> {
        return DisplayRule.getExtrusionZoomTo(this.id,).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the extrusion's zoom to value.
     *
     * @public
     * @async
     * @param {number} extrusionZoomTo
     * @returns {Promise<void>}
     */
    public async setExtrusionZoomTo(extrusionZoomTo: number): Promise<void> {
        if (extrusionZoomTo == null) {
            extrusionZoomTo = -1;
        }
        return DisplayRule.setExtrusionZoomTo(this.id, extrusionZoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's zoom from value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getModel2DZoomFrom(): Promise<number> {
        return DisplayRule.getModel2DZoomFrom(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the 2D model's zoom from value.
     *
     * @public
     * @async
     * @param {number} zoomFrom
     * @returns {Promise<void>}
     */
    public async setModel2DZoomFrom(zoomFrom: number): Promise<void> {
        if (zoomFrom == null) {
            zoomFrom = -1;
        }
        return DisplayRule.setModel2DZoomFrom(this.id, zoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's zoom to value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getModel2DZoomTo(): Promise<number> {
        return DisplayRule.getModel2DZoomTo(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the 2D model's zoom to value.
     *
     * @public
     * @async
     * @param {number} zoomTo
     * @returns {Promise<void>}
     */
    public async setModel2DZoomTo(zoomTo: number): Promise<void> {
        if (zoomTo == null) {
            zoomTo = -1;
        }
        return DisplayRule.setModel2DZoomTo(this.id, zoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's URL.
     *
     * @public
     * @async
     * @returns {Promise<string>}
     */
    public async getModel2DModel(): Promise<string> {
        return DisplayRule.getModel2DModel(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the 2D model's URL.
     *
     * @public
     * @async
     * @param {string} url
     * @returns {Promise<void>}
     */
    public async setModel2DModel(url: string): Promise<void> {
        return DisplayRule.setModel2DModel(this.id, url).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's width in meters.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getModel2DWidthMeters(): Promise<number> {
        return DisplayRule.getModel2DWidthMeters(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the 2D model's width in meters.
     *
     * @public
     * @async
     * @param {number} width
     * @returns {Promise<void>}
     */
    public async setModel2DWidthMeters(width: number): Promise<void> {
        if (width == null) {
            width = -1;
        }
        return DisplayRule.setModel2DWidthMeters(this.id, width).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's height in meters.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getModel2DHeightMeters(): Promise<number> {
        return DisplayRule.getModel2DHeightMeters(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Set the 2D model's height in meters.
     *
     * @public
     * @async
     * @param {number} height
     * @returns {Promise<void>}
     */
    public async setModel2DHeightMeters(height: number): Promise<void> {
        if (height == null) {
            height = -1;
        }
        return DisplayRule.setModel2DHeightMeters(this.id, height).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's bearing value.
     *
     * @public
     * @async
     * @returns {Promise<number>}
     */
    public async getModel2DBearing(): Promise<number> {
        return DisplayRule.getModel2DBearing(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * Get the 2D model's bearing value.
     *
     * @public
     * @async
     * @param {number} bearing
     * @returns {Promise<void>}
     */
    public async setModel2DBearing(bearing: number): Promise<void> {
        if (bearing == null) {
            bearing = -1;
        }
        return DisplayRule.setModel2DBearing(this.id, bearing).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getIconScale(): Promise<number> {
        return DisplayRule.getIconScale(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setIconScale(iconScale: number): Promise<void> {
        if (iconScale == null) {
            iconScale = -1;
        }
        return DisplayRule.setIconScale(this.id, iconScale).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getIconPlacement(): Promise<MPIconPlacement> {
        return DisplayRule.getIconPlacement(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setIconPlacement(iconPlacement: MPIconPlacement): Promise<void> {
        if (iconPlacement == null) {
            return DisplayRule.setIconPlacement(this.id, -1).catch((err: Error) => {
                return Promise.reject(MPError.create(JSON.parse(err.message)));
            });
        }else {
            return DisplayRule.setIconPlacement(this.id, iconPlacement.valueOf()).catch((err: Error) => {
                return Promise.reject(MPError.create(JSON.parse(err.message)));
            });
        }
    }

    /**
     * 
     * @returns 
     */
    public async getLabelType(): Promise<MPLabelType> {
        return DisplayRule.getLabelType(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }
    
    /**
     * 
     * @returns 
     */
    public async setLabelType(labelType: MPLabelType): Promise<void> {
        if (labelType == null) {
            return DisplayRule.setLabelType(this.id, -1).catch((err: Error) => {
                return Promise.reject(MPError.create(JSON.parse(err.message)));
            });
        }else {
            return DisplayRule.setLabelType(this.id, labelType.valueOf()).catch((err: Error) => {
                return Promise.reject(MPError.create(JSON.parse(err.message)));
            });

        }
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleTextSize(): Promise<number> {
        return DisplayRule.getLabelStyleTextSize(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleTextSize(textSize: number): Promise<void> {
        if (textSize == null) {
            textSize = -1;
        }
        return DisplayRule.setLabelStyleTextSize(this.id, textSize).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleTextColor(): Promise<string> {
        return DisplayRule.getLabelStyleTextColor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleTextColor(textColor: String): Promise<void> {
        return DisplayRule.setLabelStyleTextColor(this.id, textColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleTextOpacity(): Promise<number> {
        return DisplayRule.getLabelStyleTextOpacity(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleTextOpacity(textOpacity: number): Promise<void> {
        if (textOpacity == null) {
            textOpacity = -1;
        }
        return DisplayRule.setLabelStyleTextOpacity(this.id, textOpacity).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleHaloColor(): Promise<string> {
        return DisplayRule.getLabelStyleHaloColor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleHaloColor(color: string): Promise<void> {
        return DisplayRule.setLabelStyleHaloColor(this.id, color).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleHaloWidth(): Promise<number> {
        return DisplayRule.getLabelStyleHaloWidth(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleHaloWidth(haloWidth: number): Promise<void> {
        if (haloWidth == null) {
            haloWidth = -1;
        }
        return DisplayRule.setLabelStyleHaloWidth(this.id, haloWidth).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleHaloBlur(): Promise<number> {
        return DisplayRule.getLabelStyleHaloBlur(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleHaloBlur(haloBlur: number): Promise<void> {
        if (haloBlur == null) {
            haloBlur = -1;
        }
        return DisplayRule.setLabelStyleHaloBlur(this.id, haloBlur).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getLabelStyleBearing(): Promise<number> {
        return DisplayRule.getLabelStyleBearing(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setLabelStyleBearing(bearing: number): Promise<void> {
        if (bearing == null) {
            bearing = -1;
        }
        return DisplayRule.setLabelStyleBearing(this.id, bearing).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getPolygonLightnessFactor(): Promise<number> {
        return DisplayRule.getPolygonLightnessFactor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setPolygonLightnessFactor(lightnessFactor: number): Promise<void> {
        if (lightnessFactor == null) {
            lightnessFactor = -2;
        }
        return DisplayRule.setPolygonLightnessFactor(this.id, lightnessFactor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getWallLightnessFactor(): Promise<number> {
        return DisplayRule.getWallLightnessFactor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setWallLightnessFactor(lightnessFactor: number): Promise<void> {
        if (lightnessFactor == null) {
            lightnessFactor = -2;
        }
        return DisplayRule.setWallLightnessFactor(this.id, lightnessFactor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getExtrusionLightnessFactor(): Promise<number> {
        return DisplayRule.getExtrusionLightnessFactor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setExtrusionLightnessFactor(lightnessFactor: number): Promise<void> {
        if (lightnessFactor == null) {
            lightnessFactor = -2;
        }
        return DisplayRule.setExtrusionLightnessFactor(this.id, lightnessFactor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async isBadgeVisible(): Promise<boolean> {
        return DisplayRule.isBadgeVisible(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeVisible(visible: boolean): Promise<void> {
        return DisplayRule.setBadgeVisible(this.id, JSON.stringify(visible)).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeZoomFrom(): Promise<number> {
        return DisplayRule.getBadgeZoomFrom(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeZoomFrom(zoomFrom: number): Promise<void> {
        if (zoomFrom == null) {
            zoomFrom = -1;
        }
        return DisplayRule.setBadgeZoomFrom(this.id, zoomFrom).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeZoomTo(): Promise<number> {
        return DisplayRule.getBadgeZoomTo(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeZoomTo(zoomTo: number): Promise<void> {
        if (zoomTo == null) {
            zoomTo = -1;
        }
        return DisplayRule.setBadgeZoomTo(this.id, zoomTo).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeRadius(): Promise<number> {
        return DisplayRule.getBadgeRadius(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeRadius(radius: number): Promise<void> {
        if (radius == null) {
            radius = -1;
        }
        return DisplayRule.setBadgeRadius(this.id, radius).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeStrokeWidth(): Promise<number> {
        return DisplayRule.getBadgeStrokeWidth(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeStrokeWidth(strokeWidth: number): Promise<void> {
        if (strokeWidth == null) {
            strokeWidth = -1;
        }
        return DisplayRule.setBadgeStrokeWidth(this.id, strokeWidth).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeStrokeColor(): Promise<string> {
        return DisplayRule.getBadgeStrokeColor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeStrokeColor(strokeColor: string): Promise<void> {
        return DisplayRule.setBadgeStrokeColor(this.id, strokeColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeFillColor(): Promise<string> {
        return DisplayRule.getBadgeFillColor(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeFillColor(fillColor: string): Promise<void> {
        return DisplayRule.setBadgeFillColor(this.id, fillColor).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgeScale(): Promise<number> {
        return DisplayRule.getBadgeScale(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    } 
    
    /**
     * 
     * @returns 
     */
    public async setBadgeScale(badgeScale: number): Promise<void> {
        if (badgeScale == null) {
            badgeScale = -1;
        }
        return DisplayRule.setBadgeScale(this.id, badgeScale).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }

    /**
     * 
     * @returns 
     */
    public async getBadgePosition(): Promise<MPBadgePosition> {
        return DisplayRule.getBadgePosition(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }
    
    /**
     * 
     * @returns 
     */
    public async setBadgePosition(badgePosition: MPBadgePosition): Promise<void> {
        if (badgePosition == null) {
            return DisplayRule.setBadgePosition(this.id, -1).catch((err: Error) => {
                return Promise.reject(MPError.create(JSON.parse(err.message)));
            });
        }else {
            return DisplayRule.setBadgePosition(this.id, badgePosition.valueOf()).catch((err: Error) => {
                return Promise.reject(MPError.create(JSON.parse(err.message)));
            });
        }
    }

    /**
     * Resets the display rule to its default state.
     *
     * @public
     * @async
     * @returns {Promise<void>}
     */
    public async reset(): Promise<void> {
        return DisplayRule.reset(this.id).catch((err: Error) => {
            return Promise.reject(MPError.create(JSON.parse(err.message)));
        });
    }
}
