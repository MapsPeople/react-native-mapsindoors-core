import { NativeModules, Platform, resetNativeModules } from 'react-native';
import MapsIndoors from '../MapsIndoors';
import MPPoint from '../MPPoint';
import { MPPositionProviderInterface } from '../MPPositionProviderInterface';
import { MPPositionResultInterface } from '../MPPositionResultInterface';
import { OnPositionUpdateListener } from '../OnPositionUpdateListener';

/**
 * Unit tests for the JSON a JavaScript position provider sends across the bridge.
 *
 * MS-3929: on iOS the coordinate used to carry the floor as a third element. floorIndex is optional
 * on a position result, so a provider that left it out sent `[lng, lat, null]`, which the native
 * decoder rejects - every update, silently, with no blue dot. Android's decoder accepts the same
 * result, which is why it only failed on iOS.
 */
const nativeModule = NativeModules.MapsIndoorsModule;

/** A provider that hands its listener to the test, so the test decides when positions arrive. */
class TestProvider implements MPPositionProviderInterface {
  listener?: OnPositionUpdateListener;
  addOnPositionUpdateListener(listener: OnPositionUpdateListener): void {
    this.listener = listener;
  }
  removeOnPositionUpdateListener(): void {
    this.listener = undefined;
  }
  getLatestPosition(): MPPositionResultInterface | undefined {
    return undefined;
  }
  get name(): string {
    return 'test';
  }
}

const result = (overrides: Partial<MPPositionResultInterface> = {}): MPPositionResultInterface => ({
  point: new MPPoint(48.8897, 2.2494, 3),
  positionProvider: 'test',
  ...overrides,
});

/** Deliver one position and return the JSON the native module received, parsed. */
const sendThroughBridge = async (position: MPPositionResultInterface) => {
  const provider = new TestProvider();
  await MapsIndoors.setPositionProvider(provider);
  provider.listener!(position);
  return JSON.parse(nativeModule.onPositionUpdate.mock.calls[0][0]);
};

beforeEach(() => {
  resetNativeModules();
  Platform.OS = 'ios';
});

describe('MapsIndoors.setPositionProvider on iOS', () => {
  it('sends the coordinate as [lng, lat] with no floor in it', async () => {
    const json = await sendThroughBridge(result({ floorIndex: 3 }));

    expect(json.coordinate).toEqual([2.2494, 48.8897]);
    expect(json.floorIndex).toBe(3);
  });

  it('sends no null when the result has no floorIndex', async () => {
    // The MS-3929 case: the native decoder rejects a null anywhere in the coordinate array.
    const json = await sendThroughBridge(result());

    expect(json.coordinate).toEqual([2.2494, 48.8897]);
    expect(json).not.toHaveProperty('floorIndex');
  });

  it('passes bearing, accuracy and the provider name through', async () => {
    const json = await sendThroughBridge(result({ floorIndex: 0, bearing: 90, accuracy: 4 }));

    expect(json).toMatchObject({ bearing: 90, accuracy: 4, providerName: 'test' });
  });

  it('warns instead of dropping a rejected update', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    nativeModule.onPositionUpdate.mockRejectedValue(new Error('decode failed'));

    await sendThroughBridge(result());
    await new Promise(process.nextTick);

    expect(warn).toHaveBeenCalledWith('MapsIndoors: position update rejected', 'decode failed');
    warn.mockRestore();
  });
});

describe('MapsIndoors.setPositionProvider on Android', () => {
  it('sends the position result as it is', async () => {
    // Android's native onPositionUpdate is a void method, so it returns nothing to catch.
    Platform.OS = 'android';
    nativeModule.onPositionUpdate.mockReturnValue(undefined);

    const json = await sendThroughBridge(result({ floorIndex: 3 }));

    // MPPoint serializes as GeoJSON, which is what the Android side reads.
    expect(json).toMatchObject({
      point: { type: 'Point', coordinates: [2.2494, 48.8897, 3] },
      floorIndex: 3,
    });
  });
});
