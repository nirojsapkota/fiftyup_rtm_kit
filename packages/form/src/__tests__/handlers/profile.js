import { handleProfile } from '../../handlers/profile';
// TODO: replace me
import { Auth } from '../lib/auth';

jest.mock('../lib/auth');

const values = {
  given_name: 'User',
  family_name: 'Example',
  address: '123 Main St',
  email: 'user@example.com',
  phone_number: '+1234567890',
};

describe('Profile', async () => {
  describe('with valid configuration', async () => {
    Auth.signIn.mockImplementation(async values => {
      return { values };
    });
    Auth.changePassword.mockImplementation(async () => {
      return 'SUCCESS';
    });
    Auth.updateUserAttributes.mockImplementation(async () => {
      return 'SUCCESS';
    });

    it('does not throw an error', () => {
      expect(() => {
        handleProfile(values);
      }).not.toThrow();
    });
    it('returns the entered values with the generated password', async () => {
      const res = await handleProfile(values);
      expect(res).toMatchObject({
        ...values,
        'custom:passwordCreated': true,
      });
    });
  });
});
