import { normalizeLanguageTag, resolveLanguageTag } from '../MPLanguageTag';

/**
 * Unit tests for the BCP-47 tag handling that backs MPSolution.hasLanguage.
 *
 * This module is a TypeScript port of logic that already exists twice in native - iOS's
 * LanguageCodeNormalizer and Android's MPLanguageManager - so the thing worth testing is not that
 * the code runs, but that it still agrees with those two. Every table below is lifted from the
 * native suites (MISDKIOS LanguageCodeNormalizerTests.swift, MISDKAND MPLanguageManagerTest.kt) so
 * a drift on either platform shows up here as a failure rather than as a customer reporting that
 * Chinese works on one platform and not the other.
 *
 * The three cases where the natives disagree with each other get their own `it`, naming which
 * platform's behaviour we chose and why - those are decisions, not incidental behaviour.
 *
 * This file imports nothing but the module under test, so it needs no react-native mock.
 */
describe('normalizeLanguageTag', () => {
  // From LanguageCodeNormalizerTests.chineseSimplifiedVariants.
  it.each(['zh-Hans', 'zh_Hans', 'ZH-HANS', 'zh-CN', 'zh_cn', 'zh-SG'])(
    'canonicalizes %s to zh-Hans',
    (tag) => {
      expect(normalizeLanguageTag(tag)).toBe('zh-Hans');
    },
  );

  // From LanguageCodeNormalizerTests.chineseTraditionalVariants.
  it.each(['zh-Hant', 'zh_Hant', 'zh-TW', 'zh-HK', 'zh-MO'])('canonicalizes %s to zh-Hant', (tag) => {
    expect(normalizeLanguageTag(tag)).toBe('zh-Hant');
  });

  it('leaves bare zh unresolved rather than guessing a script', () => {
    // Guessing here would silently serve Traditional content to a Simplified audience, or the
    // reverse. The caller has to say which one it wants.
    expect(normalizeLanguageTag('zh')).toBe('zh');
    expect(normalizeLanguageTag('ZH')).toBe('zh');
  });

  it.each([
    ['EN', 'en'],
    ['en_us', 'en-US'],
    ['pt-br', 'pt-BR'],
    ['sr_latn_rs', 'sr-Latn-RS'],
  ])('rewrites %s to canonical casing, %s', (tag, expected) => {
    expect(normalizeLanguageTag(tag)).toBe(expected);
  });

  it.each([
    ['zh-Foo', 'zh-FOO'],
    ['zh-yue', 'zh-YUE'],
  ])('keeps the unknown Chinese subtag in %s rather than collapsing to bare zh', (tag, expected) => {
    // The iOS SDK used to return bare "zh" for any subtag it did not recognize, discarding what
    // the caller supplied. Unknown subtags now fall through to the generic rebuild.
    expect(normalizeLanguageTag(tag)).toBe(expected);
  });

  it.each([
    ['', ''],
    ['   ', ''],
    ['  zh-Hans  ', 'zh-Hans'],
  ])('handles the edge input %p', (tag, expected) => {
    expect(normalizeLanguageTag(tag)).toBe(expected);
  });

  it('treats a missing tag as empty, so callers can apply their own fallback', () => {
    // TypeScript-only path: the native signatures are non-optional, but every RN caller of this
    // reaches it through an optional field.
    expect(normalizeLanguageTag(undefined)).toBe('');
    expect(normalizeLanguageTag(null)).toBe('');
  });

  it('maps zh-MY to zh-Hans, following Android rather than iOS', () => {
    // A deliberate divergence. CLDR's likely-subtags maps zh-MY to zh-Hans and Malaysian Chinese
    // is written in Simplified; Android pins this in buildPriorityListEnrichesZhMYWithHans, while
    // iOS's normalizer omits MY and has no test covering it.
    expect(normalizeLanguageTag('zh-MY')).toBe('zh-Hans');
  });
});

describe('resolveLanguageTag', () => {
  // The solution this repo's Chinese testing runs against - 2fb83f9461634b29b6c0fcb6,
  // "MapsIndoors - Office (Chinese)".
  const chinese = ['da', 'en', 'zh-Hans', 'zh-Hant'];

  it.each([
    ['zh-hant', ['en', 'zh-Hant'], 'zh-Hant'],
    ['zh-Hant', ['en', 'zh-Hant'], 'zh-Hant'],
    ['en-DK', ['en-DK', 'en-NO'], 'en-DK'],
  ])('resolves %s to the casing the solution publishes, %s', (tag, available, expected) => {
    // The resolved tag goes into the backend's `lr=` parameter, so it has to be spelled the way
    // the CMS spells it, not the way the caller typed it.
    expect(resolveLanguageTag(tag, available)).toBe(expected);
  });

  it.each([
    ['zh-CN', ['en', 'zh-Hans'], 'zh-Hans'],
    ['zh-TW', ['en', 'zh-Hant'], 'zh-Hant'],
    ['zh-HK', ['en', 'zh-Hant'], 'zh-Hant'],
    ['zh-CN', chinese, 'zh-Hans'],
    ['zh-TW', chinese, 'zh-Hant'],
  ])('resolves the region-only tag %s to its script, %s', (tag, available, expected) => {
    expect(resolveLanguageTag(tag, available)).toBe(expected);
  });

  it('prefers the script variant over bare zh for a region-only tag', () => {
    // Android's setLanguagePrefersScriptVariantOverBareZhForChineseRegions: the implied script is
    // prepended to the priority list so it outranks the bare-language fallback.
    expect(resolveLanguageTag('zh-CN', ['en', 'zh', 'zh-Hans'])).toBe('zh-Hans');
  });

  it('falls through to bare zh when the solution has no script variant', () => {
    expect(resolveLanguageTag('zh-CN', ['en', 'zh'])).toBe('zh');
  });

  it.each([
    ['en-US', ['en'], 'en'],
    ['en-DK', ['ar', 'en'], 'en'],
    ['zh-Hant-TW', ['zh-Hant'], 'zh-Hant'],
    ['zh-Hant-TW', ['zh'], 'zh'],
  ])('walks %s right-to-left down to %s', (tag, available, expected) => {
    expect(resolveLanguageTag(tag, available)).toBe(expected);
  });

  it('refuses a Chinese region whose script the solution does not have', () => {
    // Android's setLanguageRejectsCrossScriptChineseRegion. Refusing prevents silently mapping a
    // Traditional reader onto Simplified content, which is the worst available outcome.
    expect(resolveLanguageTag('zh-TW', ['en', 'zh-Hans'])).toBeUndefined();
    expect(resolveLanguageTag('zh-Hant', ['en', 'zh-Hans'])).toBeUndefined();
  });

  it('refuses bare zh when the solution only publishes script variants', () => {
    // Android's setLanguageRejectsBareZhAgainstScriptOnlySolution. iOS's isLanguageAvailable is
    // looser and would accept this, but Android's setLanguage rejects it, so answering `true`
    // would be a lie on the platform that actually enforces it. Being conservative is what makes
    // a resolved tag safe to pass to setLanguage on both platforms.
    expect(resolveLanguageTag('zh', chinese)).toBeUndefined();
  });

  it('accepts the ICU underscore form, following iOS rather than Android', () => {
    // A deliberate divergence, and the permissive direction: Android's Locale.forLanguageTag turns
    // "zh_Hans" into the undetermined locale and rejects it, but `_` is what
    // java.util.Locale.toString(), ICU and several JS i18n libraries emit, so a developer copying
    // a locale string will hit it. Accepting it here cannot break a tag that works today.
    expect(resolveLanguageTag('zh_Hans', chinese)).toBe('zh-Hans');
    expect(resolveLanguageTag('zh_cn', chinese)).toBe('zh-Hans');
  });

  it.each([
    ['fr-FR', ['ar', 'en']],
    ['fr', ['en', 'zh']],
    ['zh-Hans', []],
  ])('returns undefined for %s against %p', (tag, available) => {
    expect(resolveLanguageTag(tag, available)).toBeUndefined();
  });

  it('rejects a tag shorter than two characters, as Android does', () => {
    expect(resolveLanguageTag('e', ['en'])).toBeUndefined();
    expect(resolveLanguageTag('', ['en'])).toBeUndefined();
  });

  it('returns undefined when the solution has not loaded its languages yet', () => {
    // availableLanguages is populated from the solution, so every caller can reach this before
    // MapsIndoors.load has resolved.
    expect(resolveLanguageTag('en', undefined)).toBeUndefined();
    expect(resolveLanguageTag('en', null)).toBeUndefined();
    expect(resolveLanguageTag(undefined, ['en'])).toBeUndefined();
  });
});
