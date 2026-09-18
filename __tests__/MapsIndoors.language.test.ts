import { NativeModules, resetNativeModules } from 'react-native';
import MapsIndoors from '../MapsIndoors';
import MPError from '../MPError';

/**
 * Unit tests for the language methods' contract at the JavaScript boundary.
 *
 * These are bridge wrappers, so there is nothing here to compute - which is exactly the point.
 * The tag has to reach native byte-for-byte, because both native SDKs canonicalize it themselves
 * and any rewriting on this side would be a third, invisible set of rules. And the promise has to
 * settle the way the declared types say: setLanguage is typed Promise<boolean> but resolved null on
 * iOS for as long as it has existed, and the getters map a native rejection to MPError only if the
 * native side rejects with JSON.
 *
 * Behaviour that depends on a real solution - whether a given tag is accepted, what getLanguage
 * reads back - belongs in the on-device suites in mapsindoors-sdk-react-native.
 */
const nativeModule = NativeModules.MapsIndoorsModule;

beforeEach(resetNativeModules);

/** The shape both native modules reject with: a JSON-encoded MPError. */
const nativeRejection = (code: number, message: string) =>
  new Error(JSON.stringify({ code, message }));

describe('MapsIndoors.setLanguage', () => {
  it.each(['zh-Hans', 'zh-Hant', 'zh-CN', 'zh_Hans', 'ZH-HANT', 'en', 'pt-BR'])(
    'forwards %s to native unchanged',
    async (language) => {
      // No lower-casing, no splitting, no normalizing. The native SDKs own that, and doing any of
      // it here would silently disagree with them.
      nativeModule.setLanguage.mockResolvedValue(true);

      await MapsIndoors.setLanguage(language);

      expect(nativeModule.setLanguage).toHaveBeenCalledWith(language);
    },
  );

  it.each([true, false])('resolves the native result, %p', async (result) => {
    // iOS used to resolve null here regardless, despite the declared Promise<boolean>.
    nativeModule.setLanguage.mockResolvedValue(result);

    await expect(MapsIndoors.setLanguage('zh-Hans')).resolves.toBe(result);
  });

  it.each(['', '   '])('resolves false for %p without calling native', async (language) => {
    // Android rejects this in its own preconditions, but iOS accepts it and stores an empty
    // language, which corrupts the `lr=` parameter on every subsequent request.
    await expect(MapsIndoors.setLanguage(language)).resolves.toBe(false);

    expect(nativeModule.setLanguage).not.toHaveBeenCalled();
  });
});

describe('MapsIndoors.getAvailableLanguages', () => {
  it('passes the solution languages through', async () => {
    nativeModule.getAvailableLanguages.mockResolvedValue(['da', 'en', 'zh-Hans', 'zh-Hant']);

    await expect(MapsIndoors.getAvailableLanguages()).resolves.toEqual([
      'da',
      'en',
      'zh-Hans',
      'zh-Hant',
    ]);
  });

  it('turns a native rejection into an MPError', async () => {
    // Only works because both native modules reject with JSON - MPError.parse runs JSON.parse on
    // the message, so a raw string reject surfaces as a SyntaxError instead.
    nativeModule.getAvailableLanguages.mockRejectedValue(
      nativeRejection(20, 'No languages are available, try waiting until MapsIndoors is Ready'),
    );

    await expect(MapsIndoors.getAvailableLanguages()).rejects.toBeInstanceOf(MPError);
    await expect(MapsIndoors.getAvailableLanguages()).rejects.toMatchObject({ code: 20 });
  });
});

describe('MapsIndoors.getDefaultLanguage', () => {
  it('passes the default language through', async () => {
    nativeModule.getDefaultLanguage.mockResolvedValue('en');

    await expect(MapsIndoors.getDefaultLanguage()).resolves.toBe('en');
  });

  it('turns a native rejection into an MPError', async () => {
    // Android used to resolve null here against a declared Promise<string>; it now rejects, the
    // way iOS already did.
    nativeModule.getDefaultLanguage.mockRejectedValue(
      nativeRejection(20, 'No default language is available, try waiting until MapsIndoors is Ready'),
    );

    await expect(MapsIndoors.getDefaultLanguage()).rejects.toBeInstanceOf(MPError);
  });
});

describe('MapsIndoors.getLanguage', () => {
  it('passes the current language through unwrapped', async () => {
    // Deliberately has no MPError mapping: neither native has a reject path here - both return a
    // non-null string with their own fallback chain - so a catch would be dead code.
    nativeModule.getLanguage.mockResolvedValue('zh-Hant');

    await expect(MapsIndoors.getLanguage()).resolves.toBe('zh-Hant');
  });
});

describe('MapsIndoors.getSolution', () => {
  // Not a language method, but hasLanguage / resolveLanguage are only reachable through the
  // solution this returns, and Android used to resolve null here whenever the native solution was
  // momentarily unavailable - which is exactly what a language change causes, because it tears
  // down the data providers. JSON.parse(undefined) then threw "Unexpected character: u", and
  // JSON.parse(null) silently produced a solution whose availableLanguages was undefined, so
  // hasLanguage answered false for every tag.
  it('turns a missing solution into an MPError instead of a parse crash', async () => {
    nativeModule.getSolution.mockRejectedValue(
      nativeRejection(20, 'No solution is available, try waiting until MapsIndoors is Ready'),
    );

    await expect(MapsIndoors.getSolution()).rejects.toBeInstanceOf(MPError);
  });

  it('parses a solution and exposes its languages', async () => {
    nativeModule.getSolution.mockResolvedValue(
      JSON.stringify({
        id: 'solution',
        name: 'Solution',
        solutionConfig: { id: 'config' },
        defaultLanguage: 'en',
        availableLanguages: ['da', 'en', 'zh-Hans', 'zh-Hant'],
        modules: [],
      }),
    );

    const solution = await MapsIndoors.getSolution();

    expect(solution.availableLanguages).toEqual(['da', 'en', 'zh-Hans', 'zh-Hant']);
    expect(solution.hasLanguage('zh-CN')).toBe(true);
  });
});

describe('MapsIndoors.getLocations', () => {
  // Also not a language method, but a language change is what exposed it: Android rejects
  // getLocations while the locations reload, and the catch body here was `{Promise.reject(...)}` -
  // a statement block with no return, so the arrow resolved undefined and swallowed the rejection.
  // JSON.parse(undefined) then threw "Unexpected character: u", masking the real MPError.
  it('propagates a native rejection instead of swallowing it into a parse error', async () => {
    nativeModule.getLocations.mockRejectedValue(
      nativeRejection(20, 'Cannot fetch locations, try waiting until MapsIndoors is Ready'),
    );

    await expect(MapsIndoors.getLocations()).rejects.toBeInstanceOf(MPError);
  });
});

describe('MPError.parse', () => {
  // Every .catch(MPError.parse) in the SDK depends on this, and it used to assume the message was
  // always the native modules' JSON payload. A rejection from the bridge or from JavaScript has a
  // plain-text message, and parsing that threw a SyntaxError which replaced the real message with
  // "JSON Parse error: Unexpected character: ...".
  it('reads a native JSON payload', () => {
    const error = MPError.parse(new Error(JSON.stringify({ code: 10, message: 'No network' })));

    expect(error.code).toBe(10);
    expect(error.message).toBe('No network');
  });

  it.each([
    'Exception in HostFunction: something went wrong',
    '',
    'null',
    '42',
  ])('wraps the non-JSON message %p instead of throwing', (message) => {
    const error = MPError.parse(new Error(message));

    expect(error).toBeInstanceOf(MPError);
    expect(error.code).toBe(MPError.unknownError);
    expect(error.message).toBe(message);
  });
});
