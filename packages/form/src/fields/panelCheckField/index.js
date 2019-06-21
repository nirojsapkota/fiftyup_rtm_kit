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
  padding: 5px;
  max-width: 100%;
`;

const StyledBox = styled(Card)`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;

const IconContainer = styled(Box)`
  position: relative;
  margin-top: 5px;
  margin-right: 5px;
  align-self: flex-end;
`;

const StyledLabel = styled(Label)`
  background: ${props => getColor(props.fillColor, props.theme)};
  color: ${props => getColor(props.color || 'inverseText', props.theme)};
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-top: 3px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanelCheckField = ({
  config: _config,
  fieldUtils: { setFieldValue },
  ...props
}) => {
  const isSingle = props.options.length === 1;
  return (
    <BasePanelRadioCheckboxField
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
            <StyledBox>
              <IconContainer>
                <Icon
                  size={30}
                  glyph={fieldValue.includes(option.value) ? 'check' : 'void'}
                />
              </IconContainer>
              {option.icon && (
                <Icon
                  glyph={option.icon}
                  size={80}
                  fill={
                    fieldValue.includes(option.value) ? 'link' : 'linkHover'
                  }
                />
              )}
              <StyledLabel
                htmlFor={`${name}_${option.value}`}
                px={10}
                py={10}
                fillColor={
                  fieldValue.includes(option.value) ? 'link' : 'linkHover'
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
