import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '../textField';
import styled from 'styled-components';

const StyledField = styled(TextField)`
  width: 20px;
  display: inline;
  margin: 5px;
`;

const YearField = ({ fieldUtils, defaultValue, placeholder, ...props }) => {
  const [year, setYear] = useState([]);
  const yearPlaceholder = placeholder ? placeholder.split('') : [];

  useEffect(() => {
    fieldUtils.setFieldValue(props.name, defaultValue);
    if (defaultValue) {
      setYear(defaultValue.split(''));
    }
  }, []);

  const handleChange = (index, { target }) => {
    const value = target.value;
    if (value.length < 2 && (!isNaN(Number(value)) || value == '')) {
      let updatedYear = year;
      updatedYear[index] = value;
      setYear(updatedYear);
      fieldUtils.setFieldValue(
        props.name,
        `${year[0]}${year[1]}${year[2]}${year[3]}`
      );

      const element = target;
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
          data-testid="y0"
          placeholder={yearPlaceholder[0]}
          onChange={e => handleChange(0, e)}
        />
        <StyledField
          value={year[1]}
          data-testid="y1"
          placeholder={yearPlaceholder[1]}
          onChange={e => handleChange(1, e)}
        />
        <StyledField
          value={year[2]}
          data-testid="y2"
          placeholder={yearPlaceholder[2]}
          onChange={e => handleChange(2, e)}
        />
        <StyledField
          value={year[3]}
          data-testid="y3"
          placeholder={yearPlaceholder[3]}
          onChange={e => handleChange(3, e)}
        />
        <TextField
          {...props}
          type="hidden"
          name={props.name}
          value={`${year.join('')}`}
        />
      </div>
    </React.Fragment>
  );
};

YearField.PropTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default YearField;
