import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderTitleStyled,
  StepOfferStyled,
  ItemStyled,
  StepImgStyled,
  StepDescStyled,
  WrapperBox,
} from './style';

const HowItWork = props => (
  <WrapperBox>
    <HeaderTitleStyled>{props.header}</HeaderTitleStyled>
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

HowItWork.defaultProps = {
  header:
    'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
  stepOffers: [
    {
      imgUrl:
        'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/tick-81a6885ed08fa480d0a3edd9eb3daed0386aeff48e4fd6696bf9d3fd546474e2.png',
      title: 'You join the movement for free',
    },
    {
      imgUrl:
        'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/quote-e31e7443a59255068905462c61ea2fc8c0baf111b4cbd09e7dc0697fa73b605b.png',
      title: 'We negotiate Group Discounts',
    },
    {
      imgUrl:
        'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/dollar-c46a72a93eb371e6000fe5a034cdcd04bddb7c2746bc71ca8220d4e733baecba.png',
      title: 'You decide what’s right for you',
    },
  ],
};

HowItWork.propTypes = {
  header: PropTypes.string,
  stepOffers: PropTypes.arrayOf(PropTypes.object),
};

export default HowItWork;
