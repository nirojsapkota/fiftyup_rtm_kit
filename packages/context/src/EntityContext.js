import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const EntityContext = createContext({});

const withProvider = entity => {
  const getBrand = () => {
    return entity.brand || null;
  };

  const getBrandName = () => {
    if (entity.namespace) {
      return entity.name;
    }
    return '';
  };

  const getBusinessTelephoneNumber = () => {
    switch (entity.namespace) {
      case 'obsau':
        return 'TEL: 1300 858 737';
      case 'fiftyup':
        return 'TEL: 1300 969 382';
      default:
        return '';
    }
  };

  const getBusinessInfo = () => {
    switch (entity.namespace) {
      case 'obsau':
        return `One Big Switch AFSL 455982
        One Big Switch ACL 405918
        One Big Switch ABN 75 150 963 474`;
      case 'fiftyup':
        return `FiftyUp Club Pty Ltd CAR 465649
        FiftyUp Club Pty Ltd CR 481478
        FiftyUp Club Pty Ltd ACN 166 905 175`;
      default:
        return '';
    }
  };

  const getBusinessHours = () => {
    if (entity.business_opening_hours_html) {
      return entity.business_opening_hours_html;
    }
    return '';
  };

  const getFinancialServicesGuide = () => {
    switch (entity.namespace) {
      case 'obsau':
        return 'https://s3-ap-southeast-1.amazonaws.com/onebigswitch/OBSFSG.pdf';
      case 'fiftyup':
        return 'https://s3-ap-southeast-1.amazonaws.com/onebigswitch/50UPFSG.pdf';
      default:
        return '';
    }
  };

  const getTwitterLink = () => {
    switch (entity.namespace) {
      case 'obsau':
        return 'https://twitter.com/OneBigSwitchAU';
      case 'obsus':
        return 'https://twitter.com/OneBigSwitchUSA';
      case 'obsie':
        return 'https://twitter.com/OneBigSwitchIRE';
      case 'fiftyup':
        return 'https://twitter.com/FiftyUpClub';
      case 'ninesaver':
        return 'https://twitter.com/9Saver';
      default:
        return '';
    }
  };

  const getFacebookLink = () => {
    switch (entity.namespace) {
      case 'obsau':
      case 'obsus':
        return 'https://facebook.com/onebigswitch';
      case 'obsie':
        return 'https://facebook.com/pages/One-Big-Switch-Ireland/228731240631941';
      case 'fiftyup':
        return 'https://facebook.com/pages/FiftyUp-Club/381717248640397';
      case 'ninesaver':
        return 'https://www.facebook.com/9Saver-268187043689965';
      default:
        return '';
    }
  };

  const updatedEntity = {
    ...entity,
    getBrand,
    getBrandName,
    getBusinessTelephoneNumber,
    getBusinessInfo,
    getBusinessHours,
    getFinancialServicesGuide,
    getTwitterLink,
    getFacebookLink,
  };

  return updatedEntity;
};

export const EntityProvider = ({ children, entity }) => (
  <EntityContext.Provider value={{ ...withProvider(entity) }}>
    {children}
  </EntityContext.Provider>
);

EntityProvider.propTypes = {
  children: PropTypes.node,
  entity: PropTypes.shape({ brand: PropTypes.string }),
};

EntityProvider.defaultProps = {
  children: PropTypes.node,
  entity: { brand: 'obs' },
};

export const withEntity = BaseComponent => {
  const WrappedComponent = props => (
    <EntityContext.Consumer>
      {entity => <BaseComponent {...props} entity={entity} />}
    </EntityContext.Consumer>
  );

  return WrappedComponent;
};

export default EntityContext;
