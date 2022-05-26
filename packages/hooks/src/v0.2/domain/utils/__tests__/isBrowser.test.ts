import { isBrowser } from '../isBrowser.util';

describe('isBrowser', () => {
  it('should be true', () => {
    expect(isBrowser).toBe(true);
  });
});
