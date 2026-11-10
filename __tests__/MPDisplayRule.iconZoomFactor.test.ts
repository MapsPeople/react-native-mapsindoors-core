import { NativeModules, resetNativeModules } from 'react-native';
import MPDisplayRule from '../MPDisplayRule';

/**
 * Unit tests for the range check on setIconZoomFactor.
 *
 * Both native SDKs ignore a factor outside 0 < factor <= 4 and log it. The check runs here too so
 * native only ever receives a valid number: null and undefined have no meaning to send, and the
 * warning shows up in the JavaScript console where the app developer is looking.
 */
const nativeModule = NativeModules.DisplayRule;
const rule = () => MPDisplayRule.create({ id: 'rule' });

let warn: jest.SpyInstance;

beforeEach(() => {
  resetNativeModules();
  warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
});

afterEach(() => warn.mockRestore());

describe('MPDisplayRule.setIconZoomFactor', () => {
  it.each([0.5, 1, 2, 4])('sends %p to native', async (factor) => {
    await rule().setIconZoomFactor(factor);

    expect(nativeModule.setIconZoomFactor).toHaveBeenCalledWith('rule', factor);
    expect(warn).not.toHaveBeenCalled();
  });

  it.each([0, -1, 4.01, NaN, Infinity, null, undefined])('ignores %p with a warning', async (factor) => {
    await rule().setIconZoomFactor(factor as number);

    expect(nativeModule.setIconZoomFactor).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ignoring iconZoomFactor'));
  });
});

describe('MPDisplayRule.getIconZoomFactor', () => {
  it('resolves what native reports', async () => {
    nativeModule.getIconZoomFactor.mockResolvedValue(2);

    await expect(rule().getIconZoomFactor()).resolves.toBe(2);
    expect(nativeModule.getIconZoomFactor).toHaveBeenCalledWith('rule');
  });
});
