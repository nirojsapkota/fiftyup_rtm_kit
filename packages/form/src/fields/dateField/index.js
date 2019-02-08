import React from 'react';
import PropTypes from 'prop-types';
// import Dates from '../../../../dates/src/datePicker';

// Stub out missing package for now as it's not needed
const Dates = props => props.children;

class DateField extends React.Component {
  state = {};

  render() {
    return <div>Hi</div>;
    return <Dates {...this.props} />;
  }
}

export default DateField;

DateField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};
