import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Label, Header } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import BasePanelRadioCheckboxField from '../basePanelRadioCheckboxField';
import { getColor } from '@rtm-ui/theme';
import { Card } from '@rtm-ui/layout';

const Wrapper = styled.div`
  flex: 1;
  padding: 5px;
  min-width: 120px;
  max-width: 120px;

  @media (min-width: ${props => props.theme.grid.sm}em) {
    min-width: 120px;
    max-width: 120px;
  }

  @media (max-width: ${props => props.theme.grid.sm}em) {
    max-width: 120px;
    min-width: 120px;
  }
`;

const DynamicHeader = styled(Header)`
  font-size: 3.2em;
  padding-right: 18px;
  font-weight: 600;
  text-align: left;
  color: ${props => getColor('accent', props.theme)};
`;

const DynamicSubHeader = styled(Header)`
  color: ${props => getColor('accent', props.theme)};
  font-size: 1.3em;
  padding-left: 18px;
  text-align: right;
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

const PanelRadioField = ({
  config,
  fieldUtils: { setFieldValue },
  ...props
}) => {
  const fillColorName = (itemValue, fieldValue) => {
    return fieldValue === itemValue ? 'accent' : 'primary';
  };

  return (
    <BasePanelRadioCheckboxField
      {...config}
      {...props}
      onClick={(name, value) => setFieldValue(name, value)}
    >
      {({ option, name, fieldValue }) => {
        return (
          <Wrapper>
            <StyledBox className={fieldValue === option.value ? 'active' : ''}>
              <IconContainer>
                <Icon
                  fill={fillColorName(option.value, fieldValue)}
                  size={18}
                  glyph={fieldValue === option.value ? 'radio-active' : 'radio'}
                />
              </IconContainer>
              {!('icon' in option) || !option.icon ? ( // Returns text only If the icon is null
                <Box>
                  <DynamicHeader>{option.header}</DynamicHeader>
                  <DynamicSubHeader>{option.subHeader}</DynamicSubHeader>
                </Box>
              ) : option.icon && !(option.header && option.subHeader) ? ( // Returns icon only when headers and subheaders are not present.
                <Icon
                  glyph={option.icon}
                  size={46}
                  fill={fillColorName(option.value, fieldValue)}
                />
              ) : (
                    // Returns null if icons, headers and subheaders are present.
                    ''
                  )}
              <StyledLabel
                fillColor={fillColorName(option.value, fieldValue)}
                px={10}
                py={10}
                data-testid={`${name}-${option.value}-label`}
                htmlFor={`${name}_${option.value}`}
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

PanelRadioField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  setFieldValue: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default PanelRadioField;
