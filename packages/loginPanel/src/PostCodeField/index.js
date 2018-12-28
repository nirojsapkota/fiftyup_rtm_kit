import React from 'react';
import t from 'prop-types';
// import styled from 'styled-components';
import DropdownSelect from './DropdownSelect';

class PostCodeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: ['test'],
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput() {
    this.setState({
      options: ['selected'],
    });
  }

  render() {
    const { inputComponent } = this.props;
    const { options } = this.state;

    const inputEvents = {
      onChange: this.handleInput,
    };

    return (
      <DropdownSelect
        inputComponent={inputComponent}
        inputEvents={inputEvents}
        options={options}
      />
    );
  }
}

export default PostCodeField;

PostCodeField.propTypes = {
  inputComponent: t.element.isRequired,
};
