import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import entityMap from './entities';

const EntityContext = createContext({});

export const EntityProvider = ({ children, entity }) => {
  const { brand, namespace } = entity;
  const selectedEntity = entityMap[brand];
  const updatedEntity = {
    ...(selectedEntity[namespace] || selectedEntity),
    ...entity,
  };

  return (
    <EntityContext.Provider value={updatedEntity}>
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
