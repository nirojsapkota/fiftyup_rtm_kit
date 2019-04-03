import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import Img from '@rtm-ui/img';
import { Header, Paragraph } from '@rtm-ui/typography';

const ItemHorizontal = styled(Box)`
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  padding: 20px;
`;

const ItemVertical = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const PlanDetails = ({ orientation, header, merchantLogo, plan }) => {
  const Container = orientation === 'vertical' ? ItemVertical : ItemHorizontal;

  return (
    <React.Fragment>
      {orientation === 'horizontal' && (
        <Header tag="h4" pl={20}>
          {header}
        </Header>
      )}
      <Container>
        <Box style={{ minWidth: '150px' }}>
          <Img alt="Merchant logo" src={merchantLogo || ''} />
        </Box>
        <Box pr={orientation === 'vertical' ? 0 : 10}>
          {orientation === 'vertical' && (
            <Header tag="h5" py={20}>
              {header}
            </Header>
          )}
          {plan && (
            <Box px={[3, 2]}>
            {plan.electricity_brief && (
              <Paragraph color="text" dangerousHTML={plan.electricity_brief} />
            )}
            {plan.gas_brief && <Paragraph color="text" dangerousHTML={plan.gas_brief} />}
          </Box>
          )}
          
        </Box>
      </Container>
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
  plan: t.shape({}),
  merchantLogo: t.string,
};

export default PlanDetails;
