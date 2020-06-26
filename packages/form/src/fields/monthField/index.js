import React from 'react';
import PropTypes from 'prop-types';
import MonthSelector from './monthSelector.js';
import TextField from '../textField';
import { useOnClickOutside } from '../autocompleteField/useOnClickOutside';
import styled from 'styled-components';


const monthArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
const shortMonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const getCurrentMonth = (showYear) => {
   const d = new Date();

   if (showYear) {
     return  shortMonthArray[d.getMonth()];
   } else {
    return monthArray[d.getMonth()];
   }
}


const Wrapper = styled.div`
  position: relative;
`;

const MonthField = ({
  onFocus,
  onBlur,
  onKeyDown,
  fieldUtils,
  defaultValue,
  ...inputProps
}) => {
  const config = inputProps.config || {};
  const resultsRef = React.useRef();
  const anchorRef = React.useRef();
  const [month, setMonth] = React.useState( getCurrentMonth(config.showYear));
  const currentYear = new Date().getFullYear();
  const [year, setYear] = React.useState(currentYear);


  const [monthPickerVisible, setMonthPickerVisible] = React.useState(false);
  const inputRef = React.useRef();
  useOnClickOutside(resultsRef, () => setMonthPickerVisible(false));
  const [hasSelected, setHasSelected] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    if (anchorRef.current) {
      const position = anchorRef.current.getBoundingClientRect();
      setHeight(position.height);
    }
  }, [anchorRef.current]);

  React.useEffect(() => {
    if (defaultValue) {
      fieldUtils.setFieldValue(inputProps.name, defaultValue);
      const defaultMonth = defaultValue.split(', ')[0];
      setMonth(defaultMonth)
      const defaultYear = defaultValue.split(', ')[1] || currentYear;
      setYear(parseInt(defaultYear))
    }
  }, [defaultValue]);

  React.useEffect(() => {
    if (inputProps.value && !hasSelected & !defaultValue) {
      setMonthPickerVisible(true);
    } else {
      setMonthPickerVisible(false);
    }
  }, [inputProps.value, 500]);

  React.useEffect(() => {
    if (inputRef.current) {
      return inputRef.current.value;
    }
  }, [inputRef]);

  return (
    <Wrapper ref={inputRef}>
      <div ref={anchorRef}>
        <TextField
          {...inputProps}
          onFocus={() => {
            setMonthPickerVisible(true);
            setHasSelected(true);
            onFocus();
          }}
          onKeyDown={e => {
            if ((inputProps.value += e.key)) {
              setMonthPickerVisible(false);
              setHasSelected(true);
            }
            if (e.which === 8) {
              // Shows month picker if Backspace is pressed.
              setMonthPickerVisible(true);
              setHasSelected(false);
            }
          }}
          value={inputProps.value}
          onBlur={onBlur}
          autoComplete="off"
          onChange={e => {
            inputProps.onChange(e);
          }}
        />
      </div>
      {monthPickerVisible && (
        <div ref={resultsRef}>
          <MonthSelector
            offsetHeight={height}
            selectedMonth={month}
            selectedYear={year}
            minYear={2000}
            maxYear={2030}
            showYear={config.showYear}
            onChangeYear={setYear}
            onChangeMonth={setMonth}
            onChange={val => {
              if (config.showYear) {
                fieldUtils.setFieldValue(inputProps.name, val);
              } else {
                const onlyMonth = val.split(', ')[0];
                const monthIndex = shortMonthArray.indexOf(onlyMonth);
                const fullMonth = monthArray[monthIndex];
                fieldUtils.setFieldValue(inputProps.name, fullMonth);
                
              }
            }}
          />
        </div>
      )}
    </Wrapper>
  );
};

MonthField.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default MonthField;

