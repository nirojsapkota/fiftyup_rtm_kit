import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '@rtm-ui/typography';

import {
  StepOfferStyled,
  ItemStyled,
  StepImgStyled,
  StepDescStyled,
  WrapperBox,
} from './style';

const HowItWork = props => (
  <WrapperBox>
    <Header tag="h6">{props.header}</Header>
    <StepOfferStyled>
      {props.stepOffers.map(s => (
        <ItemStyled key={s.imgUrl}>
          <StepImgStyled src={s.imgUrl} alt={s.title} />
          <StepDescStyled>{s.title}</StepDescStyled>
        </ItemStyled>
      ))}
    </StepOfferStyled>
  </WrapperBox>
);

HowItWork.propTypes = {
  header: PropTypes.string,
  stepOffers: PropTypes.arrayOf(
    PropTypes.shape({ imgUrl: PropTypes.string, title: PropTypes.string })
  ),
};

export default HowItWork;
