import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import BasePanelRadioCheckboxField from '../basePanelRadioCheckboxField';
import { getColor } from '@rtm-ui/theme';
import { Card } from '@rtm-ui/layout';

const Wrapper = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 120px;
  max-width: 120px;

  @media (min-width: ${props => props.theme.grid.sm}em) {
    min-width: 120px;
    max-width: 120px;
  }

  @media (max-width: ${props => props.theme.grid.sm}em) {
    max-width: 100px;
    min-width: 100px;
  }
`;

const StyledBox = styled(Card)`
  display: flex;
  align-items: center;
  box-shadow: 0px 1px 5px rgba(35, 34, 33, 0.47);
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  &.active {
    box-shadow: inset 0 0 0 1px ${props => getColor('accent', props.theme)};
  }
`;

const IconContainer = styled(Box)`
  position: relative;
  margin-top: 5px;
  margin-right: 5px;
  align-self: flex-end;
`;

const StyledLabel = styled(Label)`
  cursor: pointer;
  background: ${props => getColor(props.fillColor, props.theme)};
  color: ${props => getColor(props.color || 'inverseText', props.theme)};
  font-size: 1.1em;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 1px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanelCheckField = ({
  config,
  fieldUtils: { setFieldValue },
  ...props
}) => {
  const isSingle = props.options.length === 1;
  return (
    <BasePanelRadioCheckboxField
      {...config}
      {...props}
      onClick={(name, value, fieldValues) => {
        isSingle
          ? setFieldValue(name, fieldValues === '' ? value : '')
          : setFieldValue(
            name,
            fieldValues.includes(value)
              ? fieldValues.filter(fieldValue => fieldValue !== value)
              : [...fieldValues, value]
          );
      }}
    >
      {({ option, name, fieldValue }) => {
        return (
          <Wrapper>
            <StyledBox
              className={fieldValue.includes(option.value) ? 'active' : ''}
            >
              <IconContainer>
                <Icon
                  size={18}
                  glyph={fieldValue.includes(option.value) ? 'check' : 'void'}
                />
              </IconContainer>
              {option.icon && (
                <Icon
                  glyph={option.icon}
                  size={46}
                  fill={
                    fieldValue.includes(option.value) ? 'accent' : 'primary'
                  }
                />
              )}
              <StyledLabel
                htmlFor={`${name}_${option.value}`}
                px={10}
                py={10}
                fillColor={
                  fieldValue.includes(option.value) ? 'accent' : 'primary'
                }
              >
                {option.label}
              </StyledLabel>
            </StyledBox>
          </Wrapper>
        );
      }}
    </BasePanelRadioCheckboxField>
  );
};

PanelCheckField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default PanelCheckField;
