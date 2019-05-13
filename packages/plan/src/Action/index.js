import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import { Button } from '@rtm-ui/button';

import ClickToCall from './ClickToCall';
import Share from './Share';

const Action = props => {
  return (
    <Box style={{ display: 'flex' }}>
      <Box flex={1} p={[2, 3]}>
        {props.message && <Paragraph py={[2, 3]} dangerousHTML={props.message} />}
        <Button as="a" track={props.track} href={props.link} block>
          {props.cta}
        </Button>
      </Box>
    </Box>
  );
};

Action.propTypes = {
  message: PropTypes.string,
  track: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
};

export default Action;

export { ClickToCall, Share };
