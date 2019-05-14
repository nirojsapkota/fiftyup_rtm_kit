import React from 'react';
import PropTypes from 'prop-types';
import { Blurb } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';

const EnergyPlan = props => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      <Blurb right variant="b" serif header="Did you know?" />
      <Blurb
        right
        variant="c"
        header="97 Members"
        body="have shopped around in your postcode this week!"
      />
      <Blurb
        right
        header="264,245 Members"
        body="From Sydney have switch so far this year!"
      />
    </Box>
  );
};

EnergyPlan.propTypes = {};

export { EnergyPlan };
