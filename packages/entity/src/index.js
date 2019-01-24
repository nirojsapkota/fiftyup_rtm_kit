import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import entityMap from './entities';

const EntityContext = createContext({});

export const EntityProvider = ({ children, entity }) => {
  const { brand, namespace } = entity;
  const instant = entityMap[brand];

  return (
    <EntityContext.Provider value={instant[namespace] || instant}>
      {children}
    </EntityContext.Provider>
  );
};

EntityProvider.propTypes = {
  children: PropTypes.node,
  entity: PropTypes.shape({
    brand: PropTypes.string,
    namespace: PropTypes.string,
  }),
};

EntityProvider.defaultProps = {
  children: PropTypes.node,
  entity: {
    brand: 'obs',
    namespace: 'obsau',
  },
};

export const EntityConsumer = EntityContext.Consumer;

export default EntityContext;
