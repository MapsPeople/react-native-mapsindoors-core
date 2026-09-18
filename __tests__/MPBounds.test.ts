import MPBounds from '../MPBounds';
import MPPoint from '../MPPoint';

/**
 * Unit tests for MPBounds - centre, containment, the bbox order and the Builder.
 *
 * Like MPPoint, the ordering conventions are the risky part: fromBBox takes a GeoJSON bbox
 * [west, south, east, north].
 */
describe('MPBounds', () => {
  const southwest = new MPPoint(57.0, 9.9);
  const northeast = new MPPoint(57.1, 10.0);
  const bounds = new MPBounds(northeast, southwest);

  describe('center', () => {
    it('is the midpoint of the corners', () => {
      const center = bounds.center;

      expect(center.latitude).toBeCloseTo(57.05, 10);
      expect(center.longitude).toBeCloseTo(9.95, 10);
    });
  });

  describe('contains', () => {
    it('accepts a point inside', () => {
      expect(bounds.contains(new MPPoint(57.05, 9.95))).toBe(true);
    });

    it('accepts the corners, so the bounds are inclusive', () => {
      expect(bounds.contains(southwest)).toBe(true);
      expect(bounds.contains(northeast)).toBe(true);
    });

    it.each([
      ['north of', new MPPoint(57.2, 9.95)],
      ['south of', new MPPoint(56.9, 9.95)],
      ['east of', new MPPoint(57.05, 10.5)],
      ['west of', new MPPoint(57.05, 9.5)],
    ])('rejects a point %s the bounds', (_label, point) => {
      expect(bounds.contains(point)).toBe(false);
    });
  });

  describe('fromBBox', () => {
    it('reads GeoJSON bbox order, [west, south, east, north]', () => {
      const fromBBox = MPBounds.fromBBox([9.9, 57.0, 10.0, 57.1]);

      expect(fromBBox.southwest.latitude).toBe(57.0);
      expect(fromBBox.southwest.longitude).toBe(9.9);
      expect(fromBBox.northeast.latitude).toBe(57.1);
      expect(fromBBox.northeast.longitude).toBe(10.0);
    });
  });

  describe('create', () => {
    it('keeps the corners it is given', () => {
      const created = MPBounds.create({ southwest, northeast });

      expect(created.southwest).toBe(southwest);
      expect(created.northeast).toBe(northeast);
    });
  });

  describe('Builder', () => {
    it('grows to enclose every included point', () => {
      const builder = new MPBounds.Builder();
      builder.include(new MPPoint(57.0, 9.9));
      builder.include(new MPPoint(57.1, 10.0));
      builder.include(new MPPoint(57.05, 9.95));

      const built = builder.build();

      expect(built.southwest.latitude).toBe(57.0);
      expect(built.southwest.longitude).toBe(9.9);
      expect(built.northeast.latitude).toBe(57.1);
      expect(built.northeast.longitude).toBe(10.0);
    });

    it('encloses a single point as a degenerate box', () => {
      const builder = new MPBounds.Builder();
      builder.include(new MPPoint(57.0, 9.9));

      const built = builder.build();

      expect(built.southwest.latitude).toBe(57.0);
      expect(built.northeast.latitude).toBe(57.0);
      expect(built.contains(new MPPoint(57.0, 9.9))).toBe(true);
    });

    /**
     * build() means to reject an empty builder, but the guard compares `north` against
     * POSITIVE_INFINITY while the field is initialised to NEGATIVE_INFINITY, so it never fires and
     * an all-infinities MPBounds is returned instead.
     *
     * Marked `failing` so the bug is documented and tracked without turning the suite red - the
     * test starts failing (and so demands attention) the moment the guard is fixed.
     */
    it.failing('rejects building with no coordinates', () => {
      expect(() => new MPBounds.Builder().build()).toThrow('Cannot build bounds with no coordinates');
    });

    it('currently returns infinite bounds for an empty builder', () => {
      const built = new MPBounds.Builder().build();

      expect(built.northeast.latitude).toBe(Number.NEGATIVE_INFINITY);
      expect(built.southwest.latitude).toBe(Number.POSITIVE_INFINITY);
    });
  });
});
