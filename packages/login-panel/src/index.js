import React from 'react';
import t from 'prop-types';
import { Card } from '@rtm-ui/layout';

import LoginForm from './LoginForm';

const LoginPanel = props => (
  <Card px={[20, 20, 30, 40]} py={10}>
    <LoginForm {...props} />
  </Card>
);

LoginPanel.propTypes = {
  authenticityToken: t.string,
};

export default LoginPanel;
