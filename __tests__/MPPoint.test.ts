import MPPoint from '../MPPoint';
import MPGeometry from '../MPGeometry';

/**
 * Unit tests for the pure parts of MPPoint - construction, coordinate order and JSON shape.
 *
 * The coordinate order matters and is easy to get backwards: the MapsIndoors SDK's JSON uses
 * GeoJSON order [longitude, latitude, floorIndex], while the constructor takes
 * (latitude, longitude, floorIndex). These tests pin that down.
 *
 * Anything that crosses the native bridge (distanceTo, angleBetween) is deliberately not covered
 * here - that is what the on-device suites in mapsindoors-sdk-react-native are for.
 */
describe('MPPoint', () => {
  describe('constructor', () => {
    it('keeps latitude, longitude and floor index', () => {
      const point = new MPPoint(57.0582701, 9.9508396, 3);

      expect(point.latitude).toBe(57.0582701);
      expect(point.longitude).toBe(9.9508396);
      expect(point.floorIndex).toBe(3);
    });

    it('defaults the floor index to 0', () => {
      expect(new MPPoint(57.0582701, 9.9508396).floorIndex).toBe(0);
    });
  });

  describe('create', () => {
    it('reads GeoJSON coordinate order, [longitude, latitude, floorIndex]', () => {
      const point = MPPoint.create({ type: 'Point', coordinates: [9.9508396, 57.0582701, 2] });

      expect(point.latitude).toBe(57.0582701);
      expect(point.longitude).toBe(9.9508396);
      expect(point.floorIndex).toBe(2);
    });

    it('accepts a bare coordinate array, as the SDK sometimes sends', () => {
      const point = MPPoint.create([9.9508396, 57.0582701, 1] as unknown as Parameters<typeof MPPoint.create>[0]);

      expect(point.latitude).toBe(57.0582701);
      expect(point.longitude).toBe(9.9508396);
      expect(point.floorIndex).toBe(1);
    });
  });

  describe('geometry contract', () => {
    it('reports the point geometry type', () => {
      expect(new MPPoint(1, 2).type).toBe(MPGeometry.point);
    });

    it('is its own position', () => {
      const point = new MPPoint(1, 2);
      expect(point.position).toBe(point);
    });
  });

  describe('toJSON', () => {
    it('emits GeoJSON coordinate order and the geometry type', () => {
      expect(new MPPoint(57.0582701, 9.9508396, 4).toJSON()).toEqual({
        type: MPGeometry.point,
        coordinates: [9.9508396, 57.0582701, 4],
      });
    });

    it('round-trips through create without drift', () => {
      const original = new MPPoint(57.0582701, 9.9508396, 2);
      const restored = MPPoint.create(original.toJSON());

      expect(restored.latitude).toBe(original.latitude);
      expect(restored.longitude).toBe(original.longitude);
      expect(restored.floorIndex).toBe(original.floorIndex);
    });

    it('substitutes floor 0 when the floor index is missing', () => {
      const point = new MPPoint(1, 2);
      (point as { floorIndex?: number }).floorIndex = undefined;

      expect(point.toJSON().coordinates[2]).toBe(0);
    });
  });
});
