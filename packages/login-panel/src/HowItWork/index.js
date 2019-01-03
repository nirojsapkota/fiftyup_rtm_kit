import React from 'react';
import PropTypes from 'prop-types';
import * as StyledPage from './style';

const HowItWork = props => (
  <StyledPage.WrapperBox>
    <StyledPage.HeaderTitleStyled>{props.header}</StyledPage.HeaderTitleStyled>
    <StyledPage.StepOfferStyled>
      {props.stepOffers.map(s => (
        <StyledPage.ItemStyled>
          <StyledPage.StepImgStyled src={s.imgSrc} />
          <StyledPage.StepDescStyled>{s.title}</StyledPage.StepDescStyled>
        </StyledPage.ItemStyled>
      ))}
    </StyledPage.StepOfferStyled>
  </StyledPage.WrapperBox>
);

HowItWork.defaultProps = {
  header:
    'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
  stepOffers: [
    {
      imgSrc:
        'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/tick-81a6885ed08fa480d0a3edd9eb3daed0386aeff48e4fd6696bf9d3fd546474e2.png',
      title: 'You join the movement for free',
    },
    {
      imgSrc:
        'https://www.onebigswitch.com.au/assets/obs-image-assets/pages/home/quote-e31e7443a59255068905462c61ea2fc8c0baf111b4cbd09e7dc0697fa73b605b.png',
      title: 'We negotiate Group Discounts',
    },
    {
      imgSrc:
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
