import React from 'react';
import PropTypes from 'prop-types';
// import AddressSearch from '@rtm-ui/address-search';

// Stub out missing package for now as it's not needed
const AddressSearch = props => props.children;

class AddressField extends React.Component {
  state = {};

  render() {
    return <div>Hello?</div>;
    return <AddressSearch {...this.props} />;
  }
}

AddressField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AddressField;
