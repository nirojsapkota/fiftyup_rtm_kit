/*
WorkFlow component is the second version of "How it Works" component mainly designed to use it inside the HomePage before user logs in"
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@rtm-ui/icon';
import { Paragraph, Markdown } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import { MultiContentWorkFlow } from './MultiContentWorkFlow';

const ItemBody = styled(Paragraph)`
  max-width: '150px';
  text-align: center;
  display: flex;
  padding: 0;
`;

const BoxContainer = styled(Box)`
  display: flex;
`;

const List = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
`;

const SimpleWorkFlow = ({ header, subHeader, items }) => {
  return (
    <Box>
      <Markdown raw={header} />
      <Markdown py={2} raw={subHeader} />
      <BoxContainer>
        {items &&
          items.map((s, index) => (
            <React.Fragment key={index}>
              <List>
                <Icon glyph={s.icon} size={70} />
                <Markdown align="center" py={3} raw={s.title} />
                <ItemBody px={4}>{s.body}</ItemBody>
              </List>
              {index < items.length - 1 && (
                <Box
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Icon rotate={0} fill="primary" glyph="triangle" size={14} />
                </Box>
              )}
            </React.Fragment>
          ))}
      </BoxContainer>
    </Box>
  );
};

export const WorkFlow = (props) => {
  const {multiContent, ...rest} = props;

  if (multiContent) {
    return(<MultiContentWorkFlow {...rest} />)
  } else {
    return(<SimpleWorkFlow {...rest} />)
  }
}

WorkFlow.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  multiContent: PropTypes.bool,
  scrollTo: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ),
};
