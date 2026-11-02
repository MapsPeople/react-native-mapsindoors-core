import MPRoute from './MPRoute';

/**
 * Links each {@link MPRoute} that {@link MPDirectionsService.getRoute} returns to the native route it
 * was encoded from, so {@link MPDirectionsRenderer.setRoute} can render that native instance instead
 * of decoding a copy (SPEX-2782).
 *
 * Only the native instance knows the route's resolved endpoints, which the SDK reports with the
 * directions Insights events. Neither SDK serialises them, so every decoded copy reports none.
 * Rendering one native instance repeatedly is safe: its endpoints are resolved once and read on every
 * event, never consumed.
 *
 * Keyed by the route's JSON rather than by object, so a route that went through JSON on the app's
 * side, such as a state store or navigation params, still finds its native route. An edited route has
 * different JSON and finds none, so it reports no endpoints rather than ones it may no longer have.
 */

/** Matches the native stores, which forget the least recently used route past this many. */
const CAPACITY = 10;

/** Native route ids by route JSON, least recently used first. */
const ids = new Map<string, string>();

let warned = false;

/** Records the native route behind a route that {@link MPDirectionsService} just created. */
export function attachNativeRoute(route: MPRoute, id: string | undefined): void {
    if (!id) {
        return;
    }
    const json = JSON.stringify(route);
    ids.delete(json);
    ids.set(json, id);
    if (ids.size > CAPACITY) {
        ids.delete(ids.keys().next().value!);
    }
}

/**
 * The id of the native route to render in place of `json`, or null to decode `json`.
 *
 * @param json The route as JSON, which the caller sends across the bridge anyway.
 */
export function nativeRouteId(json: string): string | null {
    const id = ids.get(json);
    if (id === undefined) {
        warnOnce();
        return null;
    }
    ids.delete(json);
    ids.set(json, id);
    return id;
}

/**
 * Forgets every route, as the native stores do when MapsIndoors loads or is destroyed: the routes
 * belong to the solution that was loaded when they were requested.
 */
export function forgetNativeRoutes(): void {
    ids.clear();
}

/**
 * The fallback is legitimate for a route the app built, but it is also how these endpoints went
 * missing unnoticed before, so development builds say so once.
 */
function warnOnce(): void {
    if (warned || !(globalThis as { __DEV__?: boolean }).__DEV__) {
        return;
    }
    warned = true;
    console.warn(
        'MapsIndoors: setRoute was given a route MPDirectionsService.getRoute did not return, or one changed ' +
        'since. It renders, but directions analytics will not attribute its origin and destination.'
    );
}
