import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Img } from '@rtm-ui/img';
import { Paragraph, Markdown } from '@rtm-ui/typography';

const ItemHorizontal = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  vertical-align: center;
`;

const BriefsContainer = ({ content }) => (
  <React.Fragment>
    {content.length > 0 && (
      <Box py={10}>
        {content.map((value, index) => (
          <Paragraph key={index} py={1} color="text" dangerousHTML={value} />
        ))}
      </Box>
    )}
  </React.Fragment>
);

const Logo = ({ url }) => (
  <Box py={10} style={{ minWidth: '150px', maxWidth: '200px' }}>
    <Img alt="Merchant logo" src={url || ''} />
  </Box>
);

const HeaderTitle = ({ title }) => (
  title && <Markdown raw={title} />
);
const PlanDetails = ({ orientation, header, merchantLogo, plan }) => {
  let energyBriefs = [];
  Object.values(plan).map(val => {
    val ? energyBriefs.push(val) : null;
  });

  return (
    <React.Fragment>
      {orientation === 'horizontal' ? (
        <Box>
          <HeaderTitle title={header} />
          <ItemHorizontal>
            <BriefsContainer content={energyBriefs} />
            <Logo url={merchantLogo} />
          </ItemHorizontal>
        </Box>
      ) : (
        <Box>
          <Logo url={merchantLogo} />
          <HeaderTitle title={header} />
          <BriefsContainer content={energyBriefs} />
        </Box>
      )}
    </React.Fragment>
  );
};

PlanDetails.defaultProps = {
  orientation: 'horizontal',
  header: 'You have selected this offer:',
};

PlanDetails.propTypes = {
  orientation: t.string.isRequired,
  header: t.string,
  plan: t.shape({}).isRequired,
  merchantLogo: t.string,
};

export default PlanDetails;
