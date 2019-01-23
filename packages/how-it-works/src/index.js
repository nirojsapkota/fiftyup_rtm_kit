import React from 'react';
import Icon from '@rtm-ui/icon';
import t from 'prop-types';
import { Header, Paragraph } from '@rtm-ui/typography';
import { Container, Item, WrapperBox } from './style';
import { howItWorkContent } from './constants';

const HowItWorks = ({ entity }) => {
  const { header, icons } = howItWorkContent[entity];

  return (
    <WrapperBox>
      <Header py={0} tag="h6">
        {header}
      </Header>
      <Container>
        {icons.map(s => (
          <Item key={s.title}>
            <div>
              <Icon glyph={s.glyph} size={60} />
            </div>
            <Paragraph px={2}>{s.title}</Paragraph>
          </Item>
        ))}
      </Container>
    </WrapperBox>
  );
};

HowItWorks.defaultProps = {
  entity: 'obs',
};
HowItWorks.propTypes = {
  entity: t.string,
};

export default HowItWorks;
