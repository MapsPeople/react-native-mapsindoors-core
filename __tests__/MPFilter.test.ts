import MPFilter from '../MPFilter';
import MPBounds from '../MPBounds';
import MPPoint from '../MPPoint';

/**
 * Unit tests for MPFilter.create - the search filter builder used by getLocationsAsync.
 *
 * These matter because every field is optional: a typo in the mapping would silently drop a
 * caller's filter rather than fail, and the location search would quietly return the wrong set.
 */
describe('MPFilter.create', () => {
  it('leaves every field undefined when given nothing', () => {
    const filter = MPFilter.create();

    expect(filter.take).toBeUndefined();
    expect(filter.skip).toBeUndefined();
    expect(filter.depth).toBeUndefined();
    expect(filter.floorIndex).toBeUndefined();
    expect(filter.categories).toBeUndefined();
    expect(filter.locations).toBeUndefined();
    expect(filter.types).toBeUndefined();
    expect(filter.parents).toBeUndefined();
    expect(filter.mapExtend).toBeUndefined();
    expect(filter.geometry).toBeUndefined();
  });

  it('carries every field through unchanged', () => {
    const mapExtend = new MPBounds(new MPPoint(57.1, 10.0), new MPPoint(57.0, 9.9));
    const geometry = new MPBounds(new MPPoint(58.1, 11.0), new MPPoint(58.0, 10.9));

    const filter = MPFilter.create({
      take: 10,
      skip: 5,
      depth: 2,
      floorIndex: 3,
      categories: ['Activities Wellness'],
      locations: ['loc-1', 'loc-2'],
      types: ['MeetingRoom'],
      parents: ['building-1'],
      mapExtend,
      geometry,
      ignoreLocationSearchableStatus: true,
      ignoreLocationActiveStatus: false,
    });

    expect(filter.take).toBe(10);
    expect(filter.skip).toBe(5);
    expect(filter.depth).toBe(2);
    expect(filter.floorIndex).toBe(3);
    expect(filter.categories).toEqual(['Activities Wellness']);
    expect(filter.locations).toEqual(['loc-1', 'loc-2']);
    expect(filter.types).toEqual(['MeetingRoom']);
    expect(filter.parents).toEqual(['building-1']);
    expect(filter.mapExtend).toBe(mapExtend);
    expect(filter.geometry).toBe(geometry);
    expect(filter.ignoreLocationSearchableStatus).toBe(true);
    expect(filter.ignoreLocationActiveStatus).toBe(false);
  });

  it('keeps a take of 0 rather than dropping it as falsy', () => {
    // A `||` instead of `??` in the mapping would turn this into undefined and silently return
    // every location.
    expect(MPFilter.create({ take: 0 }).take).toBe(0);
  });

  it('keeps floorIndex 0, the ground floor', () => {
    expect(MPFilter.create({ floorIndex: 0 }).floorIndex).toBe(0);
  });

  it('keeps empty arrays distinct from undefined', () => {
    const filter = MPFilter.create({ categories: [], types: [] });

    expect(filter.categories).toEqual([]);
    expect(filter.types).toEqual([]);
  });
});
