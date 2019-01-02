import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Header, Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';

const StyledBox = styled(Box)`
  background: inherit;
  padding: 0px 10px;
  @media (min-width: ${props => props.theme.grid.md}em) {
    padding: 0px 30px;
  }
  * {
    background: inherit;
  }
`;

const colorStyles = css`
  color: #1d79bc;
`;

const PrimaryArrow = css`
  position: absolute;
  right: -15px;
  top: 45%;
  width: 0;
  height: 0;
  content: '';
  border-top: 6px solid transparent;
  border-left: 12px solid #083d87;
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
  border-top: 25px solid #083d87;
  z-index: 2;
`;

const HeaderTitleStyled = styled(Header)`
  font-size: 16px;
  line-height: 1.6;
  text-align: left;
  ${colorStyles};
  @media (min-width: ${props => props.theme.grid.md}em) {
    font-size: 18px;
  }
`;

const StepOfferStlyed = styled(Box)`
  display: inline-flex;
  flex-direction: row;
  @media (min-width: ${props => props.theme.grid.md}em) {
    display: inline-block;
    flex-direction: unset;
    width: 100%;
  }
`;

const ItemStyled = styled.div`
  padding: 8px;
  position: relative;
  > div:first-child {
    position: relative;
    &:after {
      ${PrimaryArrow};
    }
  }
  &:first-child {
    margin-left: 0px;
    @media (min-width: ${props => props.theme.grid.md}em) {
      flex-direction: row;
      > p {
        text-align: right;
      }
    }
  }
  &:last-child {
    margin-right: 0px;
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
        text-align: right;
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

const StepImgStyled = styled(Img)`
  max-width: 150px;
  max-height: 150px;
  padding: 10px 0px;
`;

const StepDescStyled = styled(Paragraph)`
  text-align: center;
  word-break: break-word;
  width: 100%;
  font-size: small;
  @media (min-width: ${props => props.theme.grid.md}em) {
    text-align: left;
    padding: 0px 10px;
    font-size: 16px;
  }
`;
const HowItWork = props => (
  <StyledBox>
    <Box>
      <HeaderTitleStyled>{props.header}</HeaderTitleStyled>
    </Box>
    <StepOfferStlyed>
      {props.stepOffers.map(s => (
        <ItemStyled>
          <StepImgStyled src={s.imgSrc} />
          <StepDescStyled>{s.title}</StepDescStyled>
        </ItemStyled>
      ))}
    </StepOfferStlyed>
  </StyledBox>
);

HowItWork.defaultProps = {
  header:
    'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
  stepOffers: [
    {
      imgSrc: 'https://placehold.it/300x200',
      title: 'You join the movement for free',
    },
    {
      imgSrc: 'https://placehold.it/300x200',
      title: 'We negotiate Group Discounts',
    },
    {
      imgSrc: 'https://placehold.it/300x200',
      title: 'You decide what’s right for you',
    },
  ],
};

HowItWork.propTypes = {
  header: PropTypes.string,
  stepOffers: PropTypes.arrayOf,
};

export default HowItWork;
