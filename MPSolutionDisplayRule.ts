import { MPDisplayRule } from "../../index";

/**
 * Special {@link MPDisplayRule}s that govern specific scenarios
 *
 * @export
 * @enum {number}
 */
export enum MPSolutionDisplayRule {
    buildingOutline = "buildingOutline",
    selectionHighlight = "selectionHighlight",
    positionIndicator = "positionIndicator",
    selection = "selection",
    highlight = "highlight"
}
