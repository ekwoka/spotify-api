import { describe, expect, it } from 'vitest';
import { spotifyApi } from '../../spotifyApi';
import { getCurrentUser } from './getCurrentUser';

const token =
  'BQDGsWNp09s3nq6LVaXDcTjOJwSpquh4mCPqR_P5THq7ksTZ6z0M24gBEnTrf3MN9lgBQfDt6N9FN4jccFagXRljaDTzyuYxi2sMOndvDT-RIlCD-6JkU7libvw5jhx9YYWP-26Y7-VDxFXvJ1ySsItr65AX-uKhJ3FHU6ZiI1yvI7-g56paGKETo8v-nL0oByKPh9z9OtQWl_YabdYRS-k7fGPk5jvcK8MPGgY';

describe('Get Current User', () => {
  it('should return Current User', async () => {
    const spotify = spotifyApi(token);
    const user = await spotify(getCurrentUser());
    expect(user).toBeDefined();
  });
  it('should sache user and return it from cache', async () => {
    const spotify = spotifyApi(token);
    const user = await spotify(getCurrentUser());
    expect(await spotify(getCurrentUser())).toBe(user);
  });
});
