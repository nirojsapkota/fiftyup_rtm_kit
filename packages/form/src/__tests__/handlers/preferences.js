import { handlePreferences } from '../../handlers/preferences';
// TODO: replace me
import { API } from '../lib/api';

jest.mock('../lib/api');

const values = {
  switch_for_current_address: '',
  switch_date: '',
  want_green_energy: '',
  when_to_switch: '',
  currently_with_provider: '',
  e_billing: '',
};

describe('Profile', async () => {
  describe('with valid configuration', async () => {
    API.post.mockImplementation(async () => {
      return 'SUCCESS';
    });

    it('does not throw an error', () => {
      expect(() => {
        handlePreferences(values);
      }).not.toThrow();
    });
    it('returns the entered values with the generated password', async () => {
      const res = await handlePreferences(values);
      expect(res).toMatchObject(values);
    });
  });
});
