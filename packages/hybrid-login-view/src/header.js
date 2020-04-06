import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from '@rtm-ui/nav';

const BasicHeader = ({entity, ...props}) => {
  return (
    <Nav
      user={false}
      sticky={true}
      isClosed={true}
      {...entity.navigation_items}
      {...props}
    />
  );
};

BasicHeader.propTypes = {
  entity: PropTypes.shape({
    navigation_items: PropTypes.shape({})})
};

export default BasicHeader;
