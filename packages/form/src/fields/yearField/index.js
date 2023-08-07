import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '../textField';
import styled from 'styled-components';

const StyledField = styled(TextField)`
  width: 20px;
  display: inline;
  margin: 5px;
`;

const YearField = ({ fieldUtils, defaultValue, ...props }) => {
  const [year, setYear] = useState([]);

  useEffect(() => {
    fieldUtils.setFieldValue(props.name, defaultValue);
  }, []);

  const handleChange = (index, { target: { value } }) => {
    if (value.length < 2 && (!isNaN(Number(value)) || value == '')) {
      let updatedYear = year;
      updatedYear[index] = value;
      setYear(updatedYear);
      fieldUtils.setFieldValue(
        props.name,
        `${year[0]}${year[1]}${year[2]}${year[3]}`
      );

      const element = event.target;
      const nextSibling = element.nextElementSibling;
      if (nextSibling) {
        nextSibling.focus();
        nextSibling.select();
      } else {
        element.blur();
      }
    } else {
      setYear(year);
      fieldUtils.setFieldValue(
        props.name,
        `${year[0]}${year[1]}${year[2]}${year[3]}`
      );
    }
  };

  return (
    <React.Fragment>
      <div>
        <StyledField
          value={year[0]}
          placeholder="Y"
          onChange={e => handleChange(0, e)}
        />
        <StyledField
          value={year[1]}
          placeholder="Y"
          onChange={e => handleChange(1, e)}
        />
        <StyledField
          value={year[2]}
          placeholder="Y"
          onChange={e => handleChange(2, e)}
        />
        <StyledField
          value={year[3]}
          placeholder="Y"
          onChange={e => handleChange(3, e)}
        />
        <TextField type="hidden" name={props.name} value="" />
      </div>
    </React.Fragment>
  );
};

YearField.PropTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default YearField;
