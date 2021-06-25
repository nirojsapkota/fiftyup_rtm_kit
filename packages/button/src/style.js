import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { labelTextStyles } from '@rtm-ui/typography';
import { getColor, tintColor } from '@rtm-ui/theme';
import { Box } from '@rtm-ui/layout';

export const base = css`
  &:disabled {
    cursor: not-allowed;
  }
`;

export const primary = css`
  color: ${props => getColor('inverseText', props.theme)};
  background: ${props => getColor('accent', props.theme)};
  border-bottom-color: ${props =>
    tintColor(getColor('accent', props.theme), -10)};

  &:hover {
    color: ${props => getColor('inverseText', props.theme)};
    background: ${props => tintColor(getColor('accent', props.theme), -5)};
    border-bottom-color: ${props =>
      tintColor(getColor('accent', props.theme), -10)};
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

export const contentStyling = css`
  display: ${props => (props.block ? 'flex' : 'inline-flex')};
  ${props => props.block && 'flex: 1'};
  align-self: center;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const ContentWrapper = styled(Box)`
  ${contentStyling}
`;

export const tertiary = css`
  color: ${props => getColor('inverseText', props.theme)};
  background: ${props => getColor('tertiary', props.theme)};
  border-bottom-color: ${props =>
    tintColor(getColor('tertiary', props.theme), -5)};

  &:hover {
    color: ${props => getColor('inverseText', props.theme)};
    background: ${props => tintColor(getColor('tertiary', props.theme), -5)};
    border-bottom-color: ${props =>
      tintColor(getColor('tertiary', props.theme), -10)};
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
  display: ${props => (props.block ? 'block' : 'inline-block')};
  width: ${props => props.width || 'inherit'};
  ${props => props.block && 'flex: 1'};
  padding: 18px 30px;
  white-space: nowrap;
  word-break: keep-all;
  border: none;
  border-radius: ${props => props.theme.button.borderRadius};
  border-bottom-width: ${props => props.theme.button.bottomBorderWidth};
  border-bottom-style: solid;

  ${props =>
    props.tertiary ? tertiary : props.secondary ? secondary : primary};
`;

export const ButtonLink = styled.a`
  ${buttonStyling};
  ${contentStyling};
`;

export const StyledButton = styled.button`
  ${buttonStyling};
  opacity: ${props => (props.appearDisabled === true ? '0.5' : '1')};
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
