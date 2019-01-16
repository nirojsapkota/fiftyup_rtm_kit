import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@rtm-ui/icon';
import { Header, Paragraph } from '@rtm-ui/typography';
import { StepOfferStyled, ItemStyled, WrapperBox } from './style';

const HowItWork = props => (
  <WrapperBox>
    <Header py="0" tag="h6">
      {props.header}
    </Header>
    <StepOfferStyled>
      {props.icons.map(s => (
        <ItemStyled>
          <div>
            <Icon glyph={s.glyph} size="60" />
          </div>
          <Paragraph px="2">{s.title}</Paragraph>
        </ItemStyled>
      ))}
    </StepOfferStyled>
  </WrapperBox>
);

HowItWork.defaultProps = {
  header:
    'One Big Switch takes the stress out of getting value on your household bills by doing the neogtiating for you!',
  icons: [
    {
      glyph: 'user-help',
      title: 'You join the movement for free',
    },
    {
      glyph: 'balance',
      title: 'We negotiate Group Discounts',
    },
    {
      glyph: 'hands-shake-2',
      title: 'You decide what’s right for you',
    },
  ],
};

HowItWork.propTypes = {
  header: PropTypes.string,
  icons: PropTypes.arrayOf(
    PropTypes.shape({ glyph: PropTypes.string, title: PropTypes.string })
  ),
};

export default HowItWork;
