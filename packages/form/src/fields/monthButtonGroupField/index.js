import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { getColor } from '@rtm-ui/theme';
import styled from 'styled-components';

const monthArray= ["January","February","March","April","May","June","July","August","September","October","November","December"];
const shortMonthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Wrapper = styled(Box)`
  max-width: 500px;
`;

const MonthBox = styled(Box)`
  margin: 15px auto;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 23%);
  grid-template-rows: repeat(3, 33%);
  grid-auto-flow: column;
`;

const MonthButton = styled(Box)`
  text-align: center;
  font-weight: bold;

  background-color: ${props => getColor('primary', props.theme)};
  color: ${props => getColor('light', props.theme)};
  :hover {
    color: ${props => getColor('accent', props.theme)};
  }
  &.selected {
    background-color: ${props => getColor('accent', props.theme)};
    color: ${props => getColor('light', props.theme)};
  }
  border-radius: 2px;
  font-size: 70%;
  letter-spacing: -1px;
  padding: 10px 5px;
  @media (min-width: ${props => props.theme.grid.sm}em) {
    font-size: 95%;
    padding: 10px;
  }
`;

const DontKnow = styled(Box)`
  display: flex;
  justify-content: space-between;
  > a {
    padding: 15px;
    font-size: 70%;
    text-decoration: underline;
    color: ${props => getColor('primary', props.theme)};
    :hover {
      cursor: pointer;
      color: ${props => getColor('accent', props.theme)};
    }
    &.selected {
      cursor: pointer;
      color: ${props => getColor('accent', props.theme)};
    }
  }
`;

const MonthButtonGroupField = ({ defaultValue, onFocus, onBlur, onKeyDown, fieldUtils, ...inputProps }) => {

  const [month, setMonth] = React.useState(null);

  React.useEffect(() => {
    if (defaultValue) {
    fieldUtils.setFieldValue(inputProps.name, defaultValue);
    setMonth(defaultValue)
    }
  }, [defaultValue]);

  function onMonthSelect(value){
    inputProps.onChange(value)
    fieldUtils.setFieldValue(inputProps.name, value);
    setMonth(value);
  }

  function renderMonth() {
    const monthArr = inputProps.useShortMonthName ? shortMonthArray: monthArray;

    return monthArr.map((type, i) => {
      return (
        <MonthButton
          key={i}
          className={month === type ? 'selected' : ''}
          role="button"
          tabIndex="0"
          onClick={() => {
            onMonthSelect(type);
          }}
        >
        {type}
        </MonthButton>
      );
    });
  }

  function renderDontKnowDontHave(additionalChoices, month) {
    if(additionalChoices && additionalChoices.length > 0) {
      return (<DontKnow>
        {additionalChoices.map((item) => {
             return <a  key={item.value} className={month === item.value ? 'selected' : ''} onClick={()=>{ onMonthSelect(item.value)}} >{item.label}</a>
        })}
      </DontKnow>
      );
    }  else {
      return;
    }
    
  }

  return (
    <Wrapper>
        <MonthBox>
          {renderMonth()}
        </MonthBox>
        {renderDontKnowDontHave(inputProps.additionalChoices, month)}
    </Wrapper>
  );
};

MonthButtonGroupField.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default MonthButtonGroupField;
