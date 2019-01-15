import React from 'react';
import { Card } from '@rtm-ui/layout';
import t from 'prop-types';

import LoginForm from './LoginForm';

const LoginPanel = props => (
  <Card px={[20, 20, 30, 40]} py={10}>
    <LoginForm {...props} />
  </Card>
);

LoginPanel.propTypes = {
  authenticityToken: t.string.isRequired,
  loginUrl: t.string.isRequired,
  handleSuccess: t.func,
  handleSubmit: t.func,
  // eslint-disable-next-line react/forbid-prop-types
  hiddenFields: t.object,
  title: t.string,
  buttonText: t.string,
  buttonIcon: t.string,
  autocompletePostcodeUrl: t.string,
};

export default LoginPanel;
