import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Header, Small } from '@rtm-ui/typography';
import { getColor } from '@rtm-ui/theme';

const DisclaimerBox = styled(Box)`
  max-height: 250px;
  box-shadow: inset 0 0 10px #a3a3a3;
  overflow-y: scroll;
  border: 2px solid #a3a3a3;
  padding: 10px;
  background: ${props => getColor('background', props.theme)};
`;

const Disclaimer = ({ title, items }) => {
  const disclaimers = items && items.filter(({ body }) => body !== '' || body !== null);
  return (
    <Box>
      <Header pl={20} mb={20} tag="h6">
        {title}
      </Header>
      {typeof(disclaimers) !== 'undefined' && disclaimers.length > 0 && (
        <DisclaimerBox p={2}>
          {disclaimers.map(({ body }) => body).map((d, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return d && <Small key={index} py={2} dangerousHTML={d} />;
          })}
        </DisclaimerBox>
      )}
    </Box>
  );
};
Disclaimer.defaultProps = {
  title: 'Explicit Informed Consent of Offer',
};

Disclaimer.propTypes = {
  title: t.string,
  items: t.arrayOf(t.shape({})),
};

export default Disclaimer;
