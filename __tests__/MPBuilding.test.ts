import { Platform } from 'react-native';
import MPBuilding from '../MPBuilding';

/**
 * Unit tests for MPBuilding's JSON shape.
 *
 * selectBuilding sends JSON.stringify(building) to native. toJSON used to return the floors Map
 * as-is, which JSON.stringify writes as {}, so native received a building with no floors
 * (SPEX-2919).
 */
const square = [[[9.95, 57.05], [9.96, 57.05], [9.96, 57.06], [9.95, 57.06], [9.95, 57.05]]];

const floor = (floorIndex: number, name: string, geometry = true) => ({
  id: `floor-${floorIndex}`,
  name,
  aliases: [name],
  floorIndex,
  ...(geometry ? { geometry: { type: 'MultiPolygon', coordinates: [square] } } : {}),
  entityBounds: { southwest: [9.95, 57.05], northeast: [9.96, 57.06] },
});

/** The shape the iOS SDK sends: floors keyed by floor index, as strings. */
const buildingJson = () => ({
  id: 'building',
  administrativeId: 'Building',
  externalId: 'B',
  venueId: 'venue',
  anchor: { coordinates: [9.955, 57.055, 0] },
  geometry: square,
  boundingBox: { southwest: [9.95, 57.05], northeast: [9.96, 57.06] },
  floors: { '0': floor(0, 'Ground'), '10': floor(10, '1st') },
  defaultFloor: 0,
  address: 'Street 1',
});

describe('MPBuilding.toJSON', () => {
  afterEach(() => {
    Platform.OS = 'ios';
  });

  it('writes each floor under its floor index', () => {
    const json = JSON.parse(JSON.stringify(MPBuilding.create(buildingJson() as any)));

    expect(Object.keys(json.floors).sort()).toEqual(['0', '10']);
    expect(json.floors['10']).toMatchObject({
      id: 'floor-10',
      name: '1st',
      aliases: ['1st'],
      floorIndex: 10,
      buildingId: 'building',
      geometry: { coordinates: [square] },
    });
  });

  it('writes a floor as iOS decodes it', () => {
    const json = JSON.parse(JSON.stringify(MPBuilding.create(buildingJson() as any)));

    expect(json.floors['10']).toEqual({
      type: 'MPFloor',
      id: 'floor-10',
      name: '1st',
      aliases: ['1st'],
      floorIndex: 10,
      buildingId: 'building',
      geometry: { type: 'MultiPolygon', coordinates: [square], bbox: [9.95, 57.05, 9.96, 57.06] },
      entityBounds: { southwest: [9.95, 57.05], northeast: [9.96, 57.06] },
    });
  });

  // iOS sends no geometry for a floor whose backend geometry is a single Polygon (SPEX-1803), and
  // fails the whole building on a present geometry without coordinates.
  it('omits the geometry of a floor that has none', () => {
    const json = JSON.parse(JSON.stringify(MPBuilding.create({
      ...buildingJson(),
      floors: { '0': floor(0, 'Ground', false) },
    } as any)));

    expect(json.floors['0']).not.toHaveProperty('geometry');
    expect(json.floors['0'].entityBounds).toEqual({ southwest: [9.95, 57.05], northeast: [9.96, 57.06] });
  });

  it('keeps the floors through a round trip', () => {
    const building = MPBuilding.create(buildingJson() as any);
    const copy = MPBuilding.create(JSON.parse(JSON.stringify(building)));

    expect(copy.floorCount).toBe(2);
    expect(copy.getFloorByIndex(10)?.displayName).toBe('1st');
    expect(copy.getFloorByIndex(0)?.floorId).toBe('floor-0');
  });

  it('writes the floors on Android too', () => {
    Platform.OS = 'android';
    const json = JSON.parse(JSON.stringify(MPBuilding.create({
      ...buildingJson(),
      geometry: { type: 'Polygon', coordinates: square, bbox: [9.95, 57.05, 9.96, 57.06] },
    } as any)));

    expect(Object.keys(json.floors).sort()).toEqual(['0', '10']);
    expect(json.floors['0'].geometry.coordinates).toEqual([square]);
  });

  it('omits a missing floor geometry on Android too', () => {
    Platform.OS = 'android';
    const json = JSON.parse(JSON.stringify(MPBuilding.create({
      ...buildingJson(),
      geometry: { type: 'Polygon', coordinates: square, bbox: [9.95, 57.05, 9.96, 57.06] },
      floors: { '0': floor(0, 'Ground', false) },
    } as any)));

    expect(json.floors['0']).not.toHaveProperty('geometry');
    expect(json.floors['0']).not.toHaveProperty('entityBounds');
  });
});
