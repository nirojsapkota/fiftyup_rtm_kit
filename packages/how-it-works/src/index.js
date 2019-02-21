import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import Icon from '@rtm-ui/icon';
import { Header, Small, Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';

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

const HowItWorks = ({ header, icons, orientation }) => {
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
        { icons && icons.map((s, index) => (
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
  orientation: 'horizontal'
};

HowItWorks.propTypes = {
  header: t.string.isRequired,
  icons: t.arrayOf(t.shape({ title: t.string, glyph: t.string })).isRequired,
  orientation: t.oneOf(['vertical', 'horizontal']),
};

export default HowItWorks;
