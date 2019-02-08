import { HandlerError } from './handlerError';
// TODO: replace me
import { Auth } from '../__tests__/lib/auth';

const updateAndReturnUser = async (user, attributes) => {
  const updateUserRes = await Auth.updateUserAttributes(user, attributes);
  if (updateUserRes === 'SUCCESS') {
    return attributes;
  }

  throw new HandlerError();
};

export const handleProfile = async (
  values,
  authenticatedUser,
  generatedPassword
) => {
  const {
    given_name,
    family_name,
    address,
    email,
    phone_number,
    password,
  } = values;
  const attributes = { given_name, email, family_name, phone_number, address };
  if (authenticatedUser) {
    return updateAndReturnUser(authenticatedUser, attributes);
  }
  // Let's signin the user before we can update the profile.
  const user = await Auth.signIn(email, generatedPassword);
  if (user) {
    // now let's update the password
    const changePasswordRes = await Auth.changePassword(
      user,
      password,
      password
    );
    if (changePasswordRes === 'SUCCESS') {
      return updateAndReturnUser(user, {
        ...attributes,
        ...{ 'custom:passwordCreated': true },
      });
    }
  } else {
    throw new HandlerError();
  }
};
