import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Paragraph, Small } from '@rtm-ui/typography';
import { getColor } from '@rtm-ui/theme';
import { Box } from '@rtm-ui/layout';
import { Icon, Logo } from '@rtm-ui/icon';

const Flex = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  margin: 0 auto;
  line-height: 1.6;
  max-width: 1400px;
`;

const A = styled.a`
  text-decoration: none;
  color: ${props => getColor('text', props.theme)};
`;

const GridBox = styled(Box)`
  display: grid;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  grid-template-rows: auto 1fr;
  padding: 92px 32px 32px 32px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'logo logo' 'social social' 'list-0 list-1' 'right right';
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'logo social' 'list-0 list-1' 'right right';
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas: 'logo social list-0 list-1 right';
  }
`;

const chunkArray = (myArray, chunkSize) => {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }
  return results;
};

export const Footer = ({ entity, disclaimers }) => {
  const { links, businessHourInfo } = entity.footer_items;
  const socials = links.filter(l => l.kind === 'social');
  const main = chunkArray(links.filter(l => l.kind === 'info'), 4);
  const others = links.filter(l => l.kind === 'financial');
  const legals = links.filter(l => l.kind === 'legal');

  return (
    <React.Fragment>
      <Box variant="b">
        <Container>
          <GridBox>
            <A style={{ gridArea: 'logo' }} href="/" align="center">
              <Logo width={150} entityBrand={entity.brand} />
            </A>
            <Box style={{ gridArea: 'social' }}>
              <Paragraph weight="bold" my={1}>
                FOLLOW US ON SOCIAL
              </Paragraph>
              {socials.map(item => {
                const iconName = item.name.toLowerCase();
                return (
                  <A key={iconName} href={item.url}>
                    <Icon glyph={iconName} />
                  </A>
                );
              })}
            </Box>
            {main.map((subItems, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Box style={{ gridArea: `list-${index}` }} key={index}>
                {subItems.map(item => (
                  <A
                    style={{ display: 'block', 'font-weight': 'bold' }}
                    key={item.url}
                    py={5}
                    href={item.url}
                  >
                    {item.name}
                  </A>
                ))}
              </Box>
            ))}
            <Box style={{ gridArea: 'right' }}>
              {businessHourInfo.telephone && (
                <Paragraph pb={1} weight="bold">
                  {`TEL: ${businessHourInfo.telephone}`}
                </Paragraph>
              )}
              {businessHourInfo.hours && (
                <Paragraph
                  style={{ whiteSpace: 'pre', lineHeight: '1.2em' }}
                  dangerousHTML={businessHourInfo.hours}
                />
              )}
              <Box style={{ height: '30px' }} />
              {others.map(item =>
                item.url ? (
                  <A key={item.name} href={item.url} target="_blank">
                    {item.name}
                  </A>
                ) : (
                  <Paragraph key={item.name} weight="bold">
                    {item.name}
                  </Paragraph>
                )
              )}
            </Box>
          </GridBox>
        </Container>
      </Box>
      <Box variant="d">
        <Container>
          <Flex p={10} style={{ justifyContent: 'flex-end' }}>
            {legals.map((item, index) => (
              <Box key={item.name} pb={2} mr={index === 0 ? 40 : 0}>
                <A href={item.url}>{item.name}</A>
              </Box>
            ))}
          </Flex>
          <Box p={10}>
            {disclaimers.map((disclaimer, index) => (
              <Small key={index} color="text" dangerousHTML={disclaimer} />
            ))}
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
};
