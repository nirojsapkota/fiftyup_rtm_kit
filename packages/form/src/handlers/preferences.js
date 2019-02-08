import { API } from '../__tests__/lib/api';
import { HandlerError } from './handlerError';

export const handlePreferences = async (values, userId) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      user_id: userId,
      ...values,
    },
  };
  const response = await API.post('preferences', 'preferences', options);
  if (response === 'SUCCESS') {
    return values;
  }

  throw new HandlerError();
};
