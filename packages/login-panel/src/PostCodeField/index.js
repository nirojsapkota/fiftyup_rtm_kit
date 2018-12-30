// FIXME: This component should move to form
import React from 'react';
import t from 'prop-types';
import DropdownSelect from '../SelectField/DropdownSelect';
import { getAutoCompletePostcode } from './actions';
import { AUTOCOMPLETE_POSTCODE_URL } from './constants';

class PostCodeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
    };

    this.handleInput = this.handleInput.bind(this);
  }

  async handleInput(isFromSelect, fieldName, value) {
    let options = [];
    if (typeof this.props.getAutoCompletePostcode === 'function') {
      options = this.props.getAutoCompletePostcode(value);
    } else {
      options = await getAutoCompletePostcode(
        AUTOCOMPLETE_POSTCODE_URL,
        value,
        this.props.authenticityToken
      );
    }

    options = options.map(value => ({ value, label: value }));

    this.props.form.setFieldValue(fieldName, value);
    if (!isFromSelect) {
      this.setState({
        options,
      });
    }
  }

  render() {
    const inputEvents = {
      onChange: e =>
        this.handleInput(false, this.props.field.name, e.target.value),
    };

    return (
      <DropdownSelect
        {...this.props}
        setFieldValue={(fieldName, value) =>
          this.handleInput(true, fieldName, value)
        }
        inputEvents={inputEvents}
        options={this.state.options}
      />
    );
  }
}

export default PostCodeField;

PostCodeField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  inputComponent: t.any.isRequired,
  /** Formik form object */
  form: t.shape({
    setFieldValue: t.func,
  }),
  /** Formik field object */
  field: t.shape({
    name: t.string,
    type: t.string,
  }),
  authenticityToken: t.string,
  getAutoCompletePostcode: t.func,
};
