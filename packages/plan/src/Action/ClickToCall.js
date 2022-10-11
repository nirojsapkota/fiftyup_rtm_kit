import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import { A } from '@rtm-ui/a';
import { Header, Paragraph, Markdown } from '@rtm-ui/typography';
import { Icon } from '@rtm-ui/icon';
import { Theme as Variant } from '@rtm-ui/theme';
import PlanReferenceContext from '../PlanReferenceContext';

const ClickToCall = ({ header, link, footer, track, enableMarkdown, ...rest }) => {
  const referenceObject = React.useContext(PlanReferenceContext);

  return (
    <Variant variant="regular">
      <React.Fragment>
        {header && !enableMarkdown && (
          <Paragraph
            color="secondary"
            align="center"
            px={[2, 3]}
            pt={2}
            dangerousHTML={header}
          />
        )}

        {header && enableMarkdown && (
          <Box
            px={[2, 3]}
            pt={2}>
            <Markdown raw={header} referencObject={referenceObject} />
          </Box>
        )}

        {link && link.length > 0 && (<A track={track} href={`tel:${link}`}>
          <Header py={[1]} align="center" tag="h3">
            <Icon glyph="phone" fill="primary" inline /> {link}
          </Header>
        </A>)}

        {footer && !enableMarkdown && (
          <Paragraph
            dangerousHTML={footer}
            color="secondary"
            align="center"
            pb={[2, 2]}
            px={[2, 3]}
          />
        )}

        {footer && enableMarkdown && (
          <Box
            px={[2, 3]}
            pt={2}>
            <Markdown raw={footer} referencObject={referenceObject} />
          </Box>
        )}
      </React.Fragment>
    </Variant>
  );
};

export default ClickToCall;

ClickToCall.propTypes = {
  header: PropTypes.string,
  footer: PropTypes.string,
  enableMarkdown: PropTypes.bool,
  link: PropTypes.string.isRequired,
  track: PropTypes.string.isRequired,
};

ClickToCall.defaultProps = {};
