// FIXME: This component should move to form
import React from 'react';
import t from 'prop-types';
import DropdownSelect from '../SelectField/DropdownSelect';
import { getAutoCompletePostcode } from './actions';

class PostCodeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: props.options || [],
    };

    this.handleInput = this.handleInput.bind(this);
  }

  async handleInput(isFromDropdown, fieldName, value) {
    const { authenticityToken, form, autocompletePostcodeUrl } = this.props;

    form.setFieldValue(fieldName, value);

    // If we select from Dropdown select don't need to find
    if (!isFromDropdown) {
      // Don't search if value < 2
      if (value && value.length < 2) {
        return;
      }

      let options = [];
      // Call outside func if provided
      if (typeof this.props.getAutoCompletePostcode === 'function') {
        options = this.props.getAutoCompletePostcode(value);
      } else {
        options = await getAutoCompletePostcode(
          autocompletePostcodeUrl,
          value,
          authenticityToken
        );
        options = options.map(value => ({ value, label: value }));
      }

      this.setState({
        options,
      });
    }
  }

  render() {
    const {
      getAutoCompletePostcode,
      autocompletePostcodeUrl,
      ...rest
    } = this.props;

    const inputEvents = {
      onChange: e =>
        this.handleInput(false, this.props.field.name, e.target.value),
    };

    return (
      <DropdownSelect
        {...rest}
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
  options: t.arrayOf(t.shape({ value: t.string, label: t.string })),
  autocompletePostcodeUrl: t.string.isRequired,
};
