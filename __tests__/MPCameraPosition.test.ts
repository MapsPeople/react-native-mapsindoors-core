import MPCameraPosition from '../MPCameraPosition';
import MPPoint from '../MPPoint';

/**
 * Unit tests for MPCameraPosition - construction and decoding of the SDK's JSON.
 *
 * The constructor takes (zoom, target, tilt, bearing) while the JSON from the native SDK is
 * keyed by name. Passing the decoded keys positionally is easy to get backwards, and did go
 * backwards once (SPEX-1464): getCurrentCameraPosition handed back tilt in bearing and bearing
 * in tilt, so feeding its result straight back into animateCamera swapped the two on every call.
 * These tests pin the mapping down.
 */
describe('MPCameraPosition', () => {
  const target = new MPPoint(57.0582701, 9.9508396, 1);

  describe('constructor', () => {
    it('keeps zoom, target, tilt and bearing', () => {
      const position = new MPCameraPosition(19, target, 45, 180);

      expect(position.zoom).toBe(19);
      expect(position.target).toBe(target);
      expect(position.tilt).toBe(45);
      expect(position.bearing).toBe(180);
    });
  });

  describe('create', () => {
    it('maps tilt and bearing to their own fields, not each other', () => {
      const position = MPCameraPosition.create({
        zoom: 19,
        target: { type: 'Point', coordinates: [9.9508396, 57.0582701, 1] },
        tilt: 45,
        bearing: 180,
      });

      expect(position.tilt).toBe(45);
      expect(position.bearing).toBe(180);
    });

    it('decodes the target into an MPPoint', () => {
      const position = MPCameraPosition.create({
        zoom: 19,
        target: { type: 'Point', coordinates: [9.9508396, 57.0582701, 1] },
        tilt: 45,
        bearing: 180,
      });

      expect(position.target).toBeInstanceOf(MPPoint);
      expect(position.target.latitude).toBe(57.0582701);
      expect(position.target.longitude).toBe(9.9508396);
      expect(position.target.floorIndex).toBe(1);
    });

    it('accepts a target that is already an MPPoint', () => {
      const position = MPCameraPosition.create({ zoom: 19, target, tilt: 45, bearing: 180 });

      expect(position.target).toBe(target);
    });

    it('defaults tilt and bearing to 0 when absent', () => {
      const position = MPCameraPosition.create({
        zoom: 19,
        target: { type: 'Point', coordinates: [9.9508396, 57.0582701, 1] },
      });

      expect(position.tilt).toBe(0);
      expect(position.bearing).toBe(0);
    });

    it('survives the round trip a caller makes between reading and animating the camera', () => {
      const read = MPCameraPosition.create({
        zoom: 19,
        target: { type: 'Point', coordinates: [9.9508396, 57.0582701, 1] },
        tilt: 45,
        bearing: 180,
      });
      const sent = new MPCameraPosition(read.zoom, read.target, read.tilt, read.bearing);

      expect(sent.tilt).toBe(45);
      expect(sent.bearing).toBe(180);
    });
  });
});
