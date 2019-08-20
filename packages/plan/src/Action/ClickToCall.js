import React from 'react';
import PropTypes from 'prop-types';
import { A } from '@rtm-ui/a';
import { Header, Paragraph } from '@rtm-ui/typography';
import { Icon } from '@rtm-ui/icon';
import { Theme as Variant } from '@rtm-ui/theme';

const ClickToCall = ({ header, link, footer, track, ...rest }) => {
  return (
    <Variant variant="regular">
      <React.Fragment>
        {header && (
          <Paragraph
            color="secondary"
            align="center"
            px={[2, 3]}
            pt={2}
            dangerousHTML={header}
          />
        )}
        <A track={track} href={`tel:${link}`}>
          <Header py={[1]} align="center" tag="h3">
            <Icon glyph="phone" fill="primary" inline /> {link}
          </Header>
        </A>
        {footer && (
          <Paragraph
            dangerousHTML={footer}
            color="secondary"
            align="center"
            pb={[2, 2]}
            px={[2, 3]}
          />
        )}
      </React.Fragment>
    </Variant>
  );
};

export default ClickToCall;

ClickToCall.propTypes = {
  header: PropTypes.string,
  footer: PropTypes.string,
  link: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
};

ClickToCall.defaultProps = {};
