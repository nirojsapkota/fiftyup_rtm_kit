import styled, { css } from 'styled-components';
import { Header, Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';
import { getColor } from '@rtm-ui/theme';

const colorStyles = css`
  color: ${props => getColor(props.color || 'text', props.theme)};
`;

const PrimaryArrow = css`
  position: absolute;
  right: -15px;
  top: 45%;
  width: 0;
  height: 0;
  content: '';
  border-top: 6px solid transparent;
  border-left: 12px solid
    ${props => getColor(props.color || 'black', props.theme)};
  border-bottom: 6px solid transparent;
  z-index: 2;
`;

const SecondArrow = css`
  position: absolute;
  right: auto;
  top: auto;
  bottom: -15px;
  left: calc(50% - 12px);
  content: '';
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 22px solid
    ${props => getColor(props.color || 'black', props.theme)};
  z-index: 2;
`;

export const HeaderTitleStyled = styled(Header)`
  font-family: ${props =>
    props.font === 'serif'
      ? props.theme.fonts.serif
      : props.theme.fonts.sansSerif};
  font-size: 15px;
  text-align: left;
  line-height: 1.6;
  ${colorStyles};
  @media (min-width: ${props => props.theme.grid.md}em) {
    font-size: 18px;
  }
`;

export const WrapperBox = styled(Box)`
  background: inherit;
  padding: 0px 10px;
  @media (min-width: ${props => props.theme.grid.md}em) {
    padding: 0px 30px;
    margin-right: 10px;
  }
  * {
    background: inherit;
  }
`;

export const StepOfferStyled = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  @media (min-width: ${props => props.theme.grid.md}em) {
    display: inline-block;
    flex-direction: unset;
    width: 100%;
  }
`;

export const ItemStyled = styled.div`
  padding: 8px;
  position: relative;
  > div:first-child {
    position: relative;
    &:after {
      ${PrimaryArrow};
    }
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
  &:last-child {
    padding-right: 0px;
    > div:after {
      display: none;
    }
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
    display: inline-flex;
    flex-direction: row-reverse;
    align-items: center;
    > div:after {
      display: none;
    }
    &:after {
      ${SecondArrow};
    }
  }
`;

export const StepImgStyled = styled(Img)`
  max-width: 150px;
  max-height: 150px;
  padding: 10px 0px;
`;

export const StepDescStyled = styled(Paragraph)`
  text-align: center;
  word-break: break-word;
  font-size: 0.9em;
  @media (min-width: ${props => props.theme.grid.md}em) {
    text-align: right;
    padding: 0px 10px;
    font-size: 1em;
  }
`;
