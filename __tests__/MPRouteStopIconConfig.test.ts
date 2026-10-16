import { NativeEventEmitter, NativeModules, resetNativeModules } from 'react-native';
import MPDirectionsRenderer from '../MPDirectionsRenderer';
import MPRoute from '../MPRoute';
import MPRouteStopIconConfig from '../MPRouteStopIconConfig';
import { RouteStopIconConfig } from '../RouteStopIconConfig';

/**
 * Unit tests for how route stop icons are encoded for the native modules.
 *
 * Both native modules download an http(s) URL, and otherwise drop the last character of the string
 * and decode the rest as JSON. That character was the `/` React Native's old URL polyfill appended
 * when MPRouteStopIconConfig wrapped its JSON in `new URL(...)`. Spec-compliant URL implementations
 * (Expo 55) reject that JSON outright, so the call failed before reaching native.
 */
const nativeModule = NativeModules.DirectionsRenderer;
const config = MPRouteStopIconConfig.create({ numbered: true, label: 'S', color: '#3071D9' });
const json = '{"numbered":true,"label":"S","color":"#3071D9"}';

const renderer = () => new MPDirectionsRenderer(NativeEventEmitter as any);
const icon = (image: URL | string): RouteStopIconConfig => ({ getImage: () => image });

/** What the native modules do with a non-URL icon string. */
const nativeDecode = (sent: string) => JSON.parse(sent.slice(0, -1));

beforeEach(resetNativeModules);

describe('MPRouteStopIconConfig.getImage', () => {
  it('does not construct a URL', () => {
    const realURL = globalThis.URL;
    globalThis.URL = class {
      constructor(url: string) {
        throw new TypeError(`Invalid URL: ${url}`);
      }
    } as any;
    try {
      expect(config.getImage()).toBe(json);
    } finally {
      globalThis.URL = realURL;
    }
  });
});

describe('MPDirectionsRenderer.setDefaultRouteStopIcon', () => {
  it('sends the config as JSON plus the trailing character native strips', async () => {
    await renderer().setDefaultRouteStopIcon(config);

    const [sent] = nativeModule.setDefaultRouteStopIcon.mock.calls[0];
    expect(sent).toBe(json + '/');
    expect(nativeDecode(sent)).toEqual({ numbered: true, label: 'S', color: '#3071D9' });
  });

  it('survives labels the old URL polyfill mangled', async () => {
    // The polyfill skipped its `/` when the string held `?` or `#`, so native chopped the `}`.
    const tricky = MPRouteStopIconConfig.create({ numbered: false, label: '?#/', color: '#000000' });

    await renderer().setDefaultRouteStopIcon(tricky);

    const [sent] = nativeModule.setDefaultRouteStopIcon.mock.calls[0];
    expect(nativeDecode(sent)).toEqual({ numbered: false, label: '?#/', color: '#000000' });
  });

  it.each([
    ['URL', new URL('https://example.com/stop.png')],
    ['string', 'https://example.com/stop.png'],
  ])('passes a custom http(s) %s through unchanged', async (_kind, image) => {
    await renderer().setDefaultRouteStopIcon(icon(image));

    expect(nativeModule.setDefaultRouteStopIcon).toHaveBeenCalledWith('https://example.com/stop.png');
  });
});

describe('MPDirectionsRenderer.setRoute', () => {
  it('encodes each stop icon the same way', async () => {
    const stopIcons = new Map<number, RouteStopIconConfig>([
      [0, config],
      [2, icon('http://example.com/end.png')],
    ]);

    await renderer().setRoute({} as MPRoute, stopIcons);

    const [, sent] = nativeModule.setRoute.mock.calls[0];
    expect(JSON.parse(sent)).toEqual({ 0: json + '/', 2: 'http://example.com/end.png' });
  });
});
