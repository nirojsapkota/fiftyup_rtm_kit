import React from 'react';
import t from 'prop-types';
import Icon from '@rtm-ui/icon';
import Variant from '@rtm-ui/theme';
import { Header, Paragraph } from '@rtm-ui/typography';
import { howItWorkContent } from './constants';
import { Container, Item, WrapperBox, IconBox } from './style';

const HowItWorks = ({ entity }) => {
  const { header, icons } = howItWorkContent[entity];
  return (
    <WrapperBox>
      <Header pt={2} tag="h6">
        {header}
      </Header>
      <Container>
        {icons.map(s => (
          <Item key={s.title}>
            <Variant variant="c">
              <IconBox>
                <Icon glyph={s.glyph} size={80} />
              </IconBox>
            </Variant>
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
