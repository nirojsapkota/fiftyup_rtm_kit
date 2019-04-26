import React from 'react';
import t from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { Paragraph } from '@rtm-ui/typography';
import { A } from '@rtm-ui/a';
import { Icon } from '@rtm-ui/icon';

const Share = props => {
  return (
    <Box style={{ display: 'flex' }}>
      <Paragraph>
        {props.message}{' '}
        <A
          href={encodeURI(
            `http://www.facebook.com/sharer/sharer.php?u=${window.location}`
          )}
          track="share_facebook"
          data-testid="share_facebook"
          asWrapper
        >
          <Icon inline fill="facebook" glyph="facebook" />
        </A>
        <A
          href={encodeURI(`https://twitter.com/share?url=${window.location}`)}
          track="share_twitter"
          data-testid="share_twitter"
          asWrapper
        >
          <Icon inline fill="twitter" glyph="twitter" />
        </A>
      </Paragraph>
    </Box>
  );
};

export default Share;

Share.propTypes = {
  message: t.string,
};

Share.defaultProps = {
  message: 'Pass this special offer on to your friends',
};
