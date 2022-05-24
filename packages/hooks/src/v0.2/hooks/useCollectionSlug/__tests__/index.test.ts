import { act, renderHook } from '@testing-library/react-hooks';
import { DEMO_SLUG } from '../../../components/demo/constants/demo.constants';
import { TestWrapper } from '../../../components/test/wrapper/TestWrapper';
import {
  useCollectionSlug,
  UseCollectionSlugProps,
  UseCollectionSlugReturn,
} from '../useCollectionSlug';

describe.only('useCollectionSlug()', () => {
  it('should be defined', () => {
    expect(useCollectionSlug).toBeDefined();
  });

  it('returns the right result when needed', async () => {
    const { result, rerender, waitFor } = renderHook<
      [UseCollectionSlugProps],
      UseCollectionSlugReturn
    >(
      (args) => {
        return useCollectionSlug(...args);
      },
      {
        initialProps: [{ slug: DEMO_SLUG }],
        wrapper: TestWrapper as any,
      },
    );

    // Trigger request...
    await act(async () => rerender());

    // ...and wait for response:
    await waitFor(() => result.current.queryResult.isSuccess);

    // Check data matches snapshot:
    expect(result.current).toMatchSnapshot({
      queryResult: {
        dataUpdatedAt: expect.any(Number),
      },
    });

    // Check the actual slug value:
    expect(result.current.slug).toBe(DEMO_SLUG);
  });
});
