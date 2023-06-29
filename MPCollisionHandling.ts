/**
 * Describes how the SDK should handle markers and labels overlapping with other markers and labels.
 *
 * @export
 * @enum {number}
 */
export enum MPCollisionHandling {
    allowOverlap,
    removeLabelFirst,
    removeIconFirst,
    removeIconAndLabel,
}