import React from 'react';
import PropTypes from 'prop-types';
import { csrfValidate, csrfGenerate } from './actions';

const Csrf = ({
  children,
  authenticityToken,
  validateUrl,
  generateTokenUrl,
}) => {
  const [token, setToken] = React.useState(authenticityToken);

  React.useEffect(() => {
    const csrfHandler = async () => {
      const validationResult = await csrfValidate(validateUrl, token);
      if (!validationResult) {
        const newToken = await csrfGenerate(generateTokenUrl);
        setToken(newToken);
      }
    };

    csrfHandler();
  }, []);

  return (
    <React.Fragment>{children({ authenticityToken: token })}</React.Fragment>
  );
};

Csrf.propTypes = {
  children: PropTypes.func.isRequired,
  authenticityToken: PropTypes.string,
  validateUrl: PropTypes.string.isRequired,
  generateTokenUrl: PropTypes.string.isRequired,
};

export { Csrf };
