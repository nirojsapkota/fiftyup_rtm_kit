import styled, { css } from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { getColor } from '@rtm-ui/theme';

const ResetArrow = css`
  position: absolute;
  width: 0;
  height: 0;
  content: '';
  z-index: 2;
`;
const RightArrow = css`
  ${ResetArrow} right: -5px;
  top: 45px;
  border-top: 6px solid transparent;
  border-left: 12px solid
    ${props => getColor(props.color || 'shape', props.theme)};
  border-bottom: 6px solid transparent;
`;

const BottomArrow = css`
  ${ResetArrow} right: auto;
  top: auto;
  bottom: -15px;
  left: calc(50% - 12px);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 16px solid
    ${props => getColor(props.color || 'shape', props.theme)};
`;

export const WrapperBox = styled(Box)`
  background: inherit;
  padding: 0px 10px;
  @media (min-width: ${props => props.theme.grid.md}em) {
    padding: 0px 15px;
    margin-right: 10px;
  }
  * {
    background: inherit;
  }
`;

export const Container = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  @media (min-width: ${props => props.theme.grid.md}em) {
    display: inline-block;
    flex-direction: unset;
    width: 100%;
  }
`;

export const Item = styled.div`
  padding: 8px;
  position: relative;
  text-align: center;
  &:after {
    ${RightArrow};
  }
  &:last-child {
    padding-right: 0px;
    &:after {
      display: none;
    }
    @media (min-width: ${props => props.theme.grid.md}em) {
      flex-direction: row;
      padding: 0px;
      > p {
        text-align: left;
      }
    }
  }
  @media (min-width: ${props => props.theme.grid.md}em) {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    &:after {
      ${BottomArrow};
    }
    &:first-child {
      padding-left: 0px;
      @media (min-width: ${props => props.theme.grid.md}em) {
        flex-direction: row;
        > p {
          text-align: left;
        }
      }
    }
  }
`;
