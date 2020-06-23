import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@rtm-ui/icon';
import { Box, Card } from '@rtm-ui/layout';
import { getColor } from '@rtm-ui/theme';
import styled from 'styled-components';

const BoxWrapper = styled(Box)`
  display: flex;
  position: absolute;
  left: 0;
  top: ${props => props.offsetHeight}px;
  flex-flow: column wrap;
  justify-content: space-around;
  z-index: 1000;
`;

const Wrapper = styled(Card)`
  border: 1px solid ${props => getColor('secondary', props.theme)};
  max-width: 300px;
  max-height: 300px;
  float: left;
`;

const WrapperContent = styled.div`
  span {
    font-size: 22px;
    color: ${props => getColor('primary', props.theme)};
    text-align: center;
    width: 100%;
    display: block;
  }

  .controls {
    max-height: 50px;
    margin-top: 15px;
    display: flex;

    .icon {
      cursor: pointer;

      &.disabled {
        cursor: default;
        opacity: 0.3;
      }
    }
  }
`;

const MonthDropdownBox = styled.div`
  > div {
    overflow: hidden;
    > div {
      float: left;
      width: 25%;
      box-sizing: border-box;
      background-color: ${props => getColor('primary', props.theme)};
      color: ${props => getColor('light', props.theme)};
      padding: 10px;
      cursor: pointer;
      text-align: center;
      border: 1px solid ${props => getColor('light', props.theme)};
      &.selected {
        background-color: ${props => getColor('accent', props.theme)};
        color: ${props => getColor('light', props.theme)};
      }

      span {
        margin: auto;
        font-size: 15px;
      }
    }
  }
`;

const MonthSelector = ({
  minYear,
  maxYear,
  selectedYear,
  selectedMonth,
  onChangeMonth,
  onChangeYear,
  onChange,
  showYear,
  offsetHeight,
}) => {
  function handleOnClickLeftArrow() {
    if (selectedYear <= minYear) {
      return;
    }
    return onChangeYear(selectedYear - 1);
  }

  function handleOnClickRightArrow() {
    if (selectedYear >= maxYear) {
      return;
    }
    return onChangeYear(selectedYear + 1);
  }

  function renderMonth() {
    const monthArr = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return monthArr.map((type, i) => {
      return (
        <div
          key={i}
          className={selectedMonth === type ? 'selected' : ''}
          role="button"
          tabIndex="0"
          onClick={() => {
            onChangeMonth(type);
            onChange(type + ', ' + selectedYear);
          }}
        >
          <span> {type}</span>
        </div>
      );
    });
  }

  function renderLeftArrowButton() {
    if (selectedYear === minYear) {
      return <Icon glyph="view-back" disabled></Icon>;
    }
    return (
      <div onClick={handleOnClickLeftArrow} className="icon">
        <Icon size={35} fill="primary" glyph="view-back" />
      </div>
    );
  }

  function renderRightArrowButton() {
    if (selectedYear === maxYear) {
      return <Icon glyph="view-forward" disabled></Icon>;
    }
    return (
      <div onClick={handleOnClickRightArrow} className="icon">
        <Icon size={35} fill="primary" glyph="view-forward" />
      </div>
    );
  }

  return (
    <BoxWrapper offsetHeight={offsetHeight}>
      <Wrapper>
        {showYear && <WrapperContent>
          <div className="controls">
            <span>{renderLeftArrowButton()}</span>
            <span>{selectedYear}</span>
            <span> {renderRightArrowButton()}</span>
          </div>
        </WrapperContent>}
        <MonthDropdownBox>
          <div>{renderMonth()}</div>
        </MonthDropdownBox>
      </Wrapper>
    </BoxWrapper>
  );
};

MonthSelector.propTypes = {
  selectedYear: PropTypes.number,
  selectedMonth: PropTypes.string,
  minYear: PropTypes.number,
  maxYear: PropTypes.number,
  showYear: PropTypes.bool,
  onChangeYear: PropTypes.func,
  onChangeMonth: PropTypes.func,
};

export default MonthSelector;
