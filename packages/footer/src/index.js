import { Icon, Logo } from '@rtm-ui/icon';
import { Box } from '@rtm-ui/layout';
import { getColor } from '@rtm-ui/theme';
import { Paragraph, Small } from '@rtm-ui/typography';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Flex = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  margin: 0 auto;
  line-height: 1.6;
  max-width: 1400px;
`;

const LegalContainer = styled(Container)`
  max-width: none;
`;

const DisclaimersBox = styled(Box)`
  text-align: justify;
  * {
    margin: 15px 0;
   }
  a {
    color: ${props => getColor('text', props.theme)};
    :hover {
      color: ${props => getColor('linkHover', props.theme)};
    }
  }

`

const A = styled.a`
  text-decoration: none;
  color: ${props => getColor('text', props.theme)};
  :hover {
    color: ${props => getColor('linkHover', props.theme)};
  }
`;

const SocialWapper = styled(Box)`
  svg {
    :hover {
      fill: ${props => getColor('linkHover', props.theme)};
    }
  }
`;

const HoursInfo = styled(Paragraph)`
  white-space: pre-wrap;
  line-height: 1.2em;
  a {
    font-weight: bold;
    text-decoration: none;
    color: ${props => getColor('text', props.theme)};
    :hover {
      color: ${props => getColor('linkHover', props.theme)};
    }
  }
`;

const FlexBox = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const InnerFlexBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const chunkArray = (myArray, chunkSize) => {
  const results = [];
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize));
  }
  return results;
};

export const Footer = ({ entity, disclaimers, landing }) => {
  const { links, businessHourInfo } = entity.footer_items;
  const socials = links.filter(l => l.kind === 'social');
  const main = chunkArray(links.filter(l => l.kind === 'info'), 4);
  const others = links.filter(l => l.kind === 'financial');
  const legals = links.filter(l => l.kind === 'legal');

  return (
    <React.Fragment>
      <Box variant="b">
        <Container>
          <FlexBox py={landing ? [4, 5, "92px", "92px"] : "92px"} px={[3, 3, 3, 4]}>
            <Box
              mb={[3, 0, 5, 0]}
              width={landing ? [1, 1, 1 / 3, 3 / 4] : [1, 1 / 2, 1 / 3, 1 / 5]}
            >
              <A href="/">
                <Logo width={135} entityBrand={entity.brand} />
              </A>
            </Box>
            {!landing && (
              <SocialWapper mb={[3, 0, 5, 0]} width={[1, 1 / 2, 1 / 3, 1 / 5]}>
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
              </SocialWapper>
            )}

            {!landing && main.map((subItems, index) => (
              <Box
                mt={[3, 3, 0, 0]}
                width={[1, 1 / 2, 1 / 3, 1 / 5]}
                key={index}
              >
                {
                  // eslint-disable-next-line react/no-array-index-key
                  subItems.map(item => (
                    <A
                      style={{ display: 'block', fontWeight: 'bold' }}
                      key={item.url}
                      py={5}
                      href={item.url}
                      onClick={e => {
                        if (item.is_js_driven) {
                          e.preventDefault();
                          window.zE.activate({ hideOnClose: true });
                        }
                      }}
                    >
                      {item.name}
                    </A>
                  ))
                }
              </Box>
            ))}
            <InnerFlexBox
              width={landing ? [1, 1, 2 / 3, 1 / 4] : [1, 1, 2 / 3, 1 / 5]}
              mt={landing ? [3, 3, 0, 0] : [3, 3, 0, 0]}
            >
              <Box
                mb={[0, 0, 0, 3]}
                width={[1, 1 / 2, 1 / 2, 1]}
              >
                {businessHourInfo.telephone && (
                  <Paragraph weight="bold">
                    {`TEL: ${businessHourInfo.telephone}`}
                  </Paragraph>
                )}
                {businessHourInfo.hours && (
                  <HoursInfo dangerousHTML={businessHourInfo.hours} />
                )}
              </Box>
              <Box
                mt={[3, 0, 0, 0]}
                width={[1, 1 / 2, 1 / 2, 1]}
              >
                {others.map(item =>
                  item.url ? (
                    <A
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      style={{ fontWeight: 'bold', display: 'block' }}
                    >
                      {item.name}
                    </A>
                  ) : (
                      <Paragraph key={item.name} weight="bold">
                        {item.name}
                      </Paragraph>
                    )
                )}
              </Box>
            </InnerFlexBox>
          </FlexBox>
        </Container>
      </Box>
      <Box variant="d">
        <LegalContainer px={[3, 3, 3, 4]}>
          <Flex p={[2, 2, 4]} pt={[4, 4, 4]} style={{ justifyContent: 'flex-end' }}>
            {legals.map((item, index) => (
              <Box key={item.name} pb={[5, 5, 2]} mr={index === 0 ? 40 : 0}>
                <A href={item.url} target={landing ? 'blank' : ''}>{item.name}</A>
              </Box>
            ))}
          </Flex>
          <DisclaimersBox pb={landing ? [150, 150, 70] : [70]}>
            {disclaimers.map((disclaimer, index) => (
              <Small key={index} color="text" dangerousHTML={disclaimer} />
            ))}
          </DisclaimersBox>
        </LegalContainer>
      </Box>
    </React.Fragment>
  );
};

Footer.propTypes = {
  children: PropTypes.node,
  landing: PropTypes.bool,
};
