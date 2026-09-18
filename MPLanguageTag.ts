/**
 * Canonicalization and RFC 4647 lookup for BCP-47 language tags.
 *
 * Both native SDKs rewrite a language tag before it reaches the backend, but they do it in
 * different places and with slightly different rules, so the same tag could be accepted on one
 * platform and dropped on the other. This is a single TypeScript port of both, so that "is this
 * tag supported" and "which tag should I actually pass" get the same answer on iOS and Android
 * without a round trip to native.
 *
 * Ported from:
 *
 * * iOS `MapsIndoorsCore/util/LanguageCodeNormalizer.swift` - tag canonicalization.
 * * Android `com.mapsindoors.core.MPLanguageManager` - `canonicalLanguage`, `buildPriorityList`
 *   and `rfc4647Lookup`.
 *
 * iOS's normalizer has four switch cases this port omits - `"hans-cn"`, `"hant-tw"`, `"hant-hk"`
 * and `"hant-mo"`. They are unreachable there: the tag is split on `-` before the switch runs, so
 * no subtag can contain one. Omitting them is not an incomplete port.
 *
 * Where the two natives disagree, the choice and the reason are documented at the point of
 * divergence below. Deliberately dependency-free: this module imports nothing, so it can be unit
 * tested without a React Native mock and cannot participate in the `index.ts` import cycle.
 *
 * @module MPLanguageTag
 */

/**
 * The Chinese script implied by a region subtag.
 *
 * Mirrors Android's `MPLanguageManager.buildPriorityList`. iOS's normalizer omits `MY`; we follow
 * Android, because CLDR's likely-subtags maps `zh-MY` to `zh-Hans` and Malaysian Chinese is
 * written in Simplified. iOS's omission looks like an oversight rather than a decision - its
 * `LanguageCodeNormalizerTests` never covers `zh-MY`, while Android's
 * `buildPriorityListEnrichesZhMYWithHans` pins it explicitly.
 */
const CHINESE_REGION_SCRIPTS: Readonly<Record<string, "Hans" | "Hant">> = {
    CN: "Hans",
    SG: "Hans",
    MY: "Hans",
    TW: "Hant",
    HK: "Hant",
    MO: "Hant",
};

/** Script subtags recognized on a Chinese tag, keyed by their lower-case form. */
const CHINESE_SCRIPTS: Readonly<Record<string, "Hans" | "Hant">> = {
    hans: "Hans",
    hant: "Hant",
};

/**
 * Splits a tag on either separator.
 *
 * BCP-47 uses `-`, but ICU and `java.util.Locale.toString()` use `_`, and JavaScript i18n
 * libraries hand out both. iOS's normalizer accepts either; Android's does not, because
 * `Locale.forLanguageTag("zh_Hans")` returns the undetermined locale. We follow iOS: accepting `_`
 * is strictly more permissive, so it cannot turn a tag that works today into one that doesn't.
 *
 * @param {string} tag
 * @returns {string[]} The non-empty subtags, in order.
 */
function subtagsOf(tag: string): string[] {
    return tag.split(/[-_]+/).filter((part) => part.length > 0);
}

/**
 * Returns the canonical BCP-47 form of a language tag, or the trimmed input unchanged when it is
 * not a tag this function knows how to rewrite.
 *
 * * Chinese script and legacy region forms collapse onto the two tags the backend actually
 *   publishes, `zh-Hans` and `zh-Hant`. So `zh_hans`, `ZH-HANS`, `zh-CN`, `zh-SG` and `zh-MY` all
 *   become `zh-Hans`, and `zh-Hant`, `zh-TW`, `zh-HK` and `zh-MO` all become `zh-Hant`.
 * * Bare `zh` is returned as `zh`, unresolved. There is no way to tell which script the caller
 *   wants, and guessing would silently serve Traditional content to a Simplified audience, or the
 *   reverse.
 * * Everything else gets a generic rewrite - language lower-cased, four-character script subtag
 *   Title-cased, two- and three-character subtags upper-cased. So `EN` becomes `en`, `en_us`
 *   becomes `en-US`, `pt-br` becomes `pt-BR`, and `sr_latn_rs` becomes `sr-Latn-RS`.
 * * Empty or whitespace-only input comes back as the empty string, so the caller can apply its own
 *   fallback.
 *
 * @export
 * @param {?string} [tag] A language tag in any casing, with either `-` or `_` separators.
 * @returns {string} The canonical form, or the trimmed input if it is not recognizable.
 */
export function normalizeLanguageTag(tag?: string | null): string {
    const trimmed = tag?.trim() ?? "";
    if (trimmed.length === 0) {
        return trimmed;
    }

    const parts = subtagsOf(trimmed);
    if (parts.length === 0) {
        return trimmed;
    }

    const language = parts[0].toLowerCase();
    const subtags = parts.slice(1);

    if (language === "zh") {
        // Script wins over region, and the first recognized subtag wins, so `zh-Hant-TW` resolves
        // on `Hant` rather than on `TW`. The two agree here, but the order is what iOS does.
        for (const subtag of subtags) {
            const script = CHINESE_SCRIPTS[subtag.toLowerCase()] ?? CHINESE_REGION_SCRIPTS[subtag.toUpperCase()];
            if (script !== undefined) {
                return `zh-${script}`;
            }
        }
        if (subtags.length === 0) {
            return "zh";
        }
        // An unrecognized subtag (`zh-Foo`) deliberately falls through to the generic rewrite
        // rather than collapsing to bare `zh`, so the caller's information is not discarded.
    }

    const rebuilt = [language];
    for (const subtag of subtags) {
        if (subtag.length === 4) {
            rebuilt.push(subtag.charAt(0).toUpperCase() + subtag.slice(1).toLowerCase());
        } else if (subtag.length === 2 || subtag.length === 3) {
            // Upper-casing a three-character subtag is wrong for extlangs and variants (`zh-yue`
            // becomes `zh-YUE`), but it is what the iOS SDK does, and matching it matters more
            // than being right about a subtag the backend never publishes.
            rebuilt.push(subtag.toUpperCase());
        } else {
            rebuilt.push(subtag);
        }
    }
    return rebuilt.join("-");
}

/**
 * Builds the RFC 4647 priority list for a tag.
 *
 * Port of Android's `MPLanguageManager.buildPriorityList`: a Chinese tag that carries a region but
 * no script gets the implied script prepended, so `zh-CN` prefers a solution's `zh-Hans` over its
 * bare `zh`. Anything else is a single-entry list and takes the plain right-to-left walk.
 *
 * @param {string} tag
 * @returns {string[]} The ranges to try, most preferred first.
 */
function buildPriorityList(tag: string): string[] {
    const parts = subtagsOf(tag);
    if (parts.length < 2 || parts[0].toLowerCase() !== "zh") {
        return [tag];
    }
    // A four-character subtag is a script. Android skips enrichment when one is already present
    // rather than second-guessing an explicit choice.
    if (parts.slice(1).some((part) => part.length === 4)) {
        return [tag];
    }
    const region = parts.slice(1).find((part) => part.length === 2);
    const script = region !== undefined ? CHINESE_REGION_SCRIPTS[region.toUpperCase()] : undefined;
    return script !== undefined ? [`zh-${script}`, tag] : [tag];
}

/**
 * Resolves a language tag to the exact tag a solution advertises, or `undefined` when nothing in
 * the fallback chain matches.
 *
 * Port of Android's `MPLanguageManager.canonicalLanguage`: an exact case-insensitive match first,
 * then an RFC 4647 "lookup" walk that strips subtags right to left, with the Chinese
 * region-to-script enrichment tried ahead of the raw tag. The canonical form from
 * {@link normalizeLanguageTag} is tried first of all, which is what lets `zh_Hans` and `ZH-CN`
 * resolve the same way they do on iOS.
 *
 * The return value is the entry as `available` spells it, not as the caller spelled it, so the
 * language reaches the backend with the casing the CMS published - `zh-Hant`, not `zh-hant`.
 *
 * Conservative about ambiguity by design: bare `zh` against a solution advertising only `zh-Hans`
 * and `zh-Hant` returns `undefined`. The iOS SDK's own `isLanguageAvailable` is looser and would
 * accept it, but Android's `setLanguage` refuses, so a permissive answer here would be a lie on
 * the platform that actually enforces it. A resolved tag is therefore safe to pass to
 * `MapsIndoors.setLanguage` on both platforms; an unresolved one is not necessarily rejected.
 *
 * @export
 * @param {?string} [tag] A language tag in any casing, with either `-` or `_` separators.
 * @param {?string[]} [available] The solution's advertised tags - `MPSolution.availableLanguages`.
 * @returns {(string | undefined)} The matching entry from `available`, or `undefined`.
 */
export function resolveLanguageTag(
    tag?: string | null,
    available?: readonly (string | undefined | null)[] | null,
): string | undefined {
    const trimmed = tag?.trim() ?? "";
    // Android's `canonicalLanguage` rejects anything shorter than two characters outright.
    if (trimmed.length < 2 || available == null) {
        return undefined;
    }

    const candidates = available.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
    if (candidates.length === 0) {
        return undefined;
    }

    const matches = (candidate: string): string | undefined =>
        candidates.find((entry) => entry.toLowerCase() === candidate.toLowerCase());

    const exact = matches(trimmed);
    if (exact !== undefined) {
        return exact;
    }

    // Putting the canonical form first only ever *adds* a candidate - the raw priority list still
    // follows - so this is never stricter than Android's own walk.
    const ranges = [normalizeLanguageTag(trimmed), ...buildPriorityList(trimmed)];
    for (const range of ranges) {
        let candidate = range;
        while (candidate.length > 0) {
            const match = matches(candidate);
            if (match !== undefined) {
                return match;
            }
            const dash = candidate.lastIndexOf("-");
            if (dash < 0) {
                break;
            }
            candidate = candidate.slice(0, dash);
        }
    }
    return undefined;
}
