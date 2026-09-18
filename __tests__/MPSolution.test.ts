import MPSolution from '../MPSolution';

/**
 * Unit tests for MPSolution's language handling.
 *
 * hasLanguage used to be an exact, case-sensitive Array.includes, which put it out of step with
 * both native SDKs: they canonicalize a tag before matching it, so hasLanguage('zh-CN') answered
 * false for a solution where setLanguage('zh-CN') then succeeded. Two APIs on the same object
 * disagreeing about the same solution is worse than either answer alone, and it disagreed in
 * exactly the Chinese case the language work exists for.
 *
 * The tables use the language sets of the solutions this repo actually tests against, so they
 * double as a record of what those solutions publish.
 */
const solution = (availableLanguages: string[], defaultLanguage = 'en') =>
  MPSolution.create({
    id: 'solution',
    name: 'Solution',
    solutionConfig: { id: 'config' },
    defaultLanguage,
    availableLanguages,
    modules: [],
  } as unknown as Parameters<typeof MPSolution.create>[0]);

/** 2fb83f9461634b29b6c0fcb6, "MapsIndoors - Office (Chinese)" - the Chinese test solution. */
const CHINESE = ['da', 'en', 'zh-Hans', 'zh-Hant'];
/** The `mapspeople` solution the on-device suites use. */
const MAPSPEOPLE = ['de', 'en', 'da'];
/** The `lapalmeraie` solution both example apps load. */
const LAPALMERAIE = ['pt', 'fr', 'en'];

describe('MPSolution.create', () => {
  it('round-trips the language fields', () => {
    const mapspeople = solution(MAPSPEOPLE, 'da');

    expect(mapspeople.availableLanguages).toEqual(MAPSPEOPLE);
    expect(mapspeople.defaultLanguage).toBe('da');
  });
});

describe('MPSolution.hasLanguage', () => {
  it.each([
    ['en', MAPSPEOPLE],
    ['de', MAPSPEOPLE],
    ['fr', LAPALMERAIE],
    ['zh-Hans', CHINESE],
    ['zh-Hant', CHINESE],
  ])('accepts %s, which the solution advertises verbatim', (language, available) => {
    expect(solution(available).hasLanguage(language)).toBe(true);
  });

  it.each([
    ['zh-CN', CHINESE],
    ['zh-SG', CHINESE],
    ['zh-TW', CHINESE],
    ['zh-HK', CHINESE],
    ['zh_Hans', CHINESE],
    ['ZH-HANT', CHINESE],
    ['zh-Hant-TW', CHINESE],
  ])('accepts %s, which resolves onto an advertised Chinese tag', (language, available) => {
    // Every one of these was false before the tags were canonicalized, while
    // MapsIndoors.setLanguage accepted them natively.
    expect(solution(available).hasLanguage(language)).toBe(true);
  });

  it('accepts a regional tag whose base language the solution has', () => {
    expect(solution(MAPSPEOPLE).hasLanguage('en-US')).toBe(true);
    expect(solution(LAPALMERAIE).hasLanguage('pt-BR')).toBe(true);
  });

  it('refuses bare zh against a solution that only publishes script variants', () => {
    // Ambiguous: there is no way to tell whether the caller wants Simplified or Traditional, and
    // Android's setLanguage refuses it too.
    expect(solution(CHINESE).hasLanguage('zh')).toBe(false);
  });

  it.each([
    ['zh-Hans', MAPSPEOPLE],
    ['fr', MAPSPEOPLE],
    ['de', LAPALMERAIE],
  ])('refuses %s, which the solution does not have in any form', (language, available) => {
    expect(solution(available).hasLanguage(language)).toBe(false);
  });

  it.each([undefined, '', '   '])('refuses the empty input %p', (language) => {
    expect(solution(CHINESE).hasLanguage(language)).toBe(false);
  });
});

describe('MPSolution.resolveLanguage', () => {
  it.each([
    ['zh-CN', 'zh-Hans'],
    ['zh-TW', 'zh-Hant'],
    ['zh-Hant-TW', 'zh-Hant'],
    ['ZH-HANS', 'zh-Hans'],
    ['en-US', 'en'],
  ])('resolves %s to %s, spelled the way the solution publishes it', (language, expected) => {
    // This is the answer hasLanguage cannot give: what to actually pass to setLanguage.
    expect(solution(CHINESE).resolveLanguage(language)).toBe(expected);
  });

  it('returns undefined when nothing matches', () => {
    expect(solution(CHINESE).resolveLanguage('fr')).toBeUndefined();
    expect(solution(CHINESE).resolveLanguage('zh')).toBeUndefined();
    expect(solution(CHINESE).resolveLanguage()).toBeUndefined();
  });
});
