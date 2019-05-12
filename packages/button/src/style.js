import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { labelTextStyles } from '@rtm-ui/typography';
import { getColor } from '@rtm-ui/theme';

export const base = css`
  &:disabled {
    cursor: not-allowed;
  }
`;

export const primary = css`
  color: ${props => getColor('inverseText', props.theme)};
  background: ${props => getColor('accent', props.theme)};
  border-bottom-color: ${props => getColor('accentAccent', props.theme)};

  &:hover {
    color: ${props => getColor('inverseText', props.theme)};
    background: ${props => getColor('accentAccent', props.theme)};
    border-bottom-color: ${props => getColor('accent', props.theme)};
  }
`;

export const secondary = css`
  color: ${props => props.theme.colors.grayscale.white};
  background: ${props => props.theme.colors.grayscale.slightlyDarker};
  border-bottom-color: ${props => props.theme.colors.grayscale.darker};

  &:hover {
    color: ${props => props.theme.colors.grayscale.white};
    background: ${props => props.theme.colors.grayscale.darker};
    border-bottom-color: ${props =>
      props.theme.colors.grayscale.slightlyDarker};
  }
`;

export const resetStyling = css`
  background: none;
  cursor: pointer;
  border: none;
  padding: 0;
  text-decoration: none;
`;

export const buttonStyling = css`
  ${resetStyling};
  ${base};
  ${labelTextStyles};
  width: ${props => props.width || 'inherit'};
  padding: 18px 30px;

  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  ${props =>
    props.block &&
    css`
      flex: 1;
    `} align-self: center;
  align-items: center;
  white-space: nowrap;
  word-break: keep-all;
  text-align: center;

  align-items: center;
  justify-content: center;

  border: none;
  border-radius: ${props => props.theme.button.borderRadius};
  border-bottom-width: ${props => props.theme.button.bottomBorderWidth};
  border-bottom-style: solid;

  ${props => (props.secondary ? secondary : primary)};
`;

export const ButtonLink = styled.a`
  ${buttonStyling};
`;

export const StyledButton = styled.button`
  ${buttonStyling};
`;

export const WrapperButton = styled.button`
  ${resetStyling};
`;

export const WrapperLink = styled.a`
  ${resetStyling};
`;

ButtonLink.propTypes = {
  block: PropTypes.bool,
};
