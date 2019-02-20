import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import Icon from '@rtm-ui/icon';
import { Header, Small, Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import { howItWorksContent } from './constants';

const StyledSmall = styled(Small)`
  max-width: ${props => (props.orientation === 'vertical' ? 'auto' : '130px')};
  text-align: center;
  padding: 0;
`;

const VerticalTitle = styled(Paragraph)`
  max-width: auto;
  text-align: center;
  padding: 0;
`;

const HorizontalTitle = styled(Small)`
  max-width: '150px';
  text-align: center;
  padding: 0;
`;

const VerticalContainer = styled(Box)`
  justify-content: center;
`;

const VerticalItem = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;

  &:nth-child(4n + 3) {
    display: flex;
    flex-direction: row-reverse;
    p {
      padding-right: 20px;
      padding-left: 0px;
    }
  }
  p {
    padding-left: 20px;
  }
`;

const HorizontalContainer = styled(Box)`
  justify-content: center;
  display: flex;
`;

const HorizontalItem = styled(Box)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
`;

const HowItWorks = ({
  entity,
  header = howItWorksContent[entity].header,
  icons = howItWorksContent[entity].icons,
  orientation,
}) => {
  const Container =
    orientation === 'vertical' ? VerticalContainer : HorizontalContainer;
  const Item = orientation === 'vertical' ? VerticalItem : HorizontalItem;
  const IconTitle =
    orientation === 'vertical' ? VerticalTitle : HorizontalTitle;
  return (
    <Box
      style={{
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Header align="center" py={2} tag="h6">
        {header}
      </Header>
      <Container>
        {icons.map((s, index) => (
          <React.Fragment key={s.title}>
            <Item>
              <Box my={10}>
                <Icon
                  fill="iconPrimary"
                  glyph={s.glyph}
                  size={orientation === 'vertical' ? 70 : 50}
                />
              </Box>
              <IconTitle px={2}>{s.title}</IconTitle>
            </Item>
            {index < icons.length - 1 && (
              <Box
                p={10}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <Icon
                  rotate={orientation === 'vertical' ? 90 : 0}
                  fill="primary"
                  glyph="triangle"
                  size={14}
                />
              </Box>
            )}
          </React.Fragment>
        ))}
      </Container>
    </Box>
  );
};

HowItWorks.defaultProps = {
  entity: 'obs',
  orientation: 'horizontal',
};

HowItWorks.propTypes = {
  entity: t.string,
  header: t.string,
  icons: t.arrayOf({ title: t.string, glyph: t.string }),
  orientation: t.oneOf(['vertical', 'horizontal']),
};

export default HowItWorks;
