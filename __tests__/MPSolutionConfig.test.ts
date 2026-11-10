import MPSolutionConfig from '../MPSolutionConfig';

/**
 * Unit tests for the icon zoom range read from the solution JSON.
 *
 * Both native SDKs leave iconScaleZoomFrom / iconScaleZoomTo out of the JSON when the solution has
 * not set them, so the getters report undefined rather than a default.
 */
const config = (fields: Partial<Parameters<typeof MPSolutionConfig.create>[0]> = {}) =>
  MPSolutionConfig.create({ id: 'config', ...fields } as Parameters<typeof MPSolutionConfig.create>[0]);

describe('MPSolutionConfig icon zoom range', () => {
  it('reads the range the solution stores', () => {
    const solutionConfig = config({ iconScaleZoomFrom: 18, iconScaleZoomTo: 22 });

    expect(solutionConfig.iconScaleZoomFrom).toBe(18);
    expect(solutionConfig.iconScaleZoomTo).toBe(22);
  });

  it('keeps a partial range as stored', () => {
    const solutionConfig = config({ iconScaleZoomTo: 20 });

    expect(solutionConfig.iconScaleZoomFrom).toBeUndefined();
    expect(solutionConfig.iconScaleZoomTo).toBe(20);
  });

  it('is undefined when the solution has no range', () => {
    const solutionConfig = config();

    expect(solutionConfig.iconScaleZoomFrom).toBeUndefined();
    expect(solutionConfig.iconScaleZoomTo).toBeUndefined();
  });
});
