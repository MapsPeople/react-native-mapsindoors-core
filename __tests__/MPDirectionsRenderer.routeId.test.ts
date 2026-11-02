import { NativeEventEmitter, NativeModules, resetNativeModules } from 'react-native';
import MapsIndoors from '../MapsIndoors';
import MPDirectionsRenderer from '../MPDirectionsRenderer';
import MPDirectionsService from '../MPDirectionsService';
import MPPoint from '../MPPoint';
import MPRoute from '../MPRoute';
import { forgetNativeRoutes } from '../RouteHandles';

/**
 * Unit tests for which native route setRoute asks native to render (SPEX-2782).
 *
 * Only the route instance the native directions service returned knows the route's endpoints, which
 * the directions Insights events report. setRoute names that instance by id while the route it is
 * given has that route's content, and must stop naming it once the content differs: native would
 * otherwise render the route as it was.
 */
const serviceModule = NativeModules.DirectionsService;
const rendererModule = NativeModules.DirectionsRenderer;
const mapsIndoorsModule = NativeModules.MapsIndoorsModule;

/** A route as native encodes it, told apart by its summary. */
const routeJson = (summary = 'Route') => JSON.stringify({
  legs: [
    {
      distance: { text: '12 m', value: 12 },
      duration: { text: '30 s', value: 30 },
      start_address: 'Origin',
      end_address: 'Destination',
      start_location: { lat: 57.05, lng: 9.95, zLevel: 0 },
      end_location: { lat: 57.06, lng: 9.96, zLevel: 1 },
      steps: [],
    },
  ],
  summary,
  warnings: [],
});

/** A route as getRoute returns it, from a native module that kept it as `routeId`. */
const routeFromService = async (routeId?: string, summary?: string): Promise<MPRoute> => {
  serviceModule.createService.mockResolvedValue('service-1');
  serviceModule.getRoute.mockResolvedValue({ route: routeJson(summary), routeId });
  const service = await MPDirectionsService.create();
  return service.getRoute(new MPPoint(57.05, 9.95, 0), new MPPoint(57.06, 9.96, 1));
};

/** The native route id setRoute sent for `route`. */
const sentRouteId = async (route: MPRoute): Promise<string | null> => {
  rendererModule.setRoute.mockClear();
  await new MPDirectionsRenderer(NativeEventEmitter).setRoute(route);
  return rendererModule.setRoute.mock.calls[0][3];
};

/** `route` the way an app gets it back from a state store or navigation params. */
const throughJson = (route: MPRoute): MPRoute => MPRoute.create(JSON.parse(JSON.stringify(route)));

beforeEach(() => {
  resetNativeModules();
  forgetNativeRoutes();
});

describe('MPDirectionsRenderer.setRoute', () => {
  it('names the native route behind an untouched service route', async () => {
    expect(await sentRouteId(await routeFromService('native-route-1'))).toBe('native-route-1');
  });

  it('still sends the route itself, for when native no longer has it', async () => {
    const route = await routeFromService('native-route-1');
    await new MPDirectionsRenderer(NativeEventEmitter).setRoute(route);

    expect(rendererModule.setRoute.mock.calls[0][0]).toBe(JSON.stringify(route));
  });

  it('names the native route behind a copy made through JSON', async () => {
    const route = await routeFromService('native-route-1');

    expect(await sentRouteId(throughJson(route))).toBe('native-route-1');
  });

  it('names nothing for a route the app built', async () => {
    await routeFromService('native-route-1');

    expect(await sentRouteId(MPRoute.create(JSON.parse(routeJson('Built in the app'))))).toBeNull();
  });

  it('names nothing once a service route has been edited', async () => {
    const route = await routeFromService('native-route-1');
    route.legs!.pop();

    expect(await sentRouteId(route)).toBeNull();
  });

  it('names nothing when native kept no route', async () => {
    expect(await sentRouteId(await routeFromService())).toBeNull();
  });

  it('forgets the least recently used route past ten, as native does', async () => {
    const first = await routeFromService('route-0', 'Route 0');
    const second = await routeFromService('route-1', 'Route 1');
    for (let i = 2; i < 10; i++) {
      await routeFromService(`route-${i}`, `Route ${i}`);
    }
    // Setting the first route again makes the second the least recently used.
    expect(await sentRouteId(first)).toBe('route-0');
    await routeFromService('route-10', 'Route 10');

    expect(await sentRouteId(first)).toBe('route-0');
    expect(await sentRouteId(second)).toBeNull();
  });

  it('forgets every route when MapsIndoors loads, as native does', async () => {
    const route = await routeFromService('native-route-1');
    await MapsIndoors.load('another-solution');

    expect(await sentRouteId(route)).toBeNull();
  });

  it('forgets every route when MapsIndoors is destroyed, as native does', async () => {
    const route = await routeFromService('native-route-1');
    mapsIndoorsModule.destroy.mockResolvedValue(undefined);
    await MapsIndoors.destroy();

    expect(await sentRouteId(route)).toBeNull();
  });
});

describe('MPDirectionsRenderer.setRoute fallback warning', () => {
  const global = globalThis as { __DEV__?: boolean };
  let warn: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    delete global.__DEV__;
    warn.mockRestore();
  });

  /** A fresh RouteHandles, since the warning is once per JavaScript runtime. */
  const freshHandles = (): typeof import('../RouteHandles') => require('../RouteHandles');

  it('warns once in development when a route has no native route', () => {
    global.__DEV__ = true;
    const handles = freshHandles();

    handles.nativeRouteId(routeJson('Built in the app'));
    handles.nativeRouteId(routeJson('Built in the app'));

    expect(warn).toHaveBeenCalledTimes(1);
  });

  it('stays quiet in release builds', () => {
    global.__DEV__ = false;

    freshHandles().nativeRouteId(routeJson('Built in the app'));

    expect(warn).not.toHaveBeenCalled();
  });

  it('stays quiet for a route that has its native route', () => {
    global.__DEV__ = true;
    const handles = freshHandles();
    const route = MPRoute.create(JSON.parse(routeJson()));
    handles.attachNativeRoute(route, 'native-route-1');

    expect(handles.nativeRouteId(JSON.stringify(route))).toBe('native-route-1');
    expect(warn).not.toHaveBeenCalled();
  });
});
