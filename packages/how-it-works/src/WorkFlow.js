import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@rtm-ui/icon';
import { Paragraph, Markdown } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';

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

export const WorkFlow = ({ header, subHeader, items }) => {
  return (
    <Box>
      <Markdown raw={header} />
      <Paragraph py={2}>{subHeader}</Paragraph>
      <BoxContainer>
        {items &&
          items.map((s, index) => (
            <React.Fragment key={index}>
              <List>
                <Icon fill="iconPrimary" glyph={s.icon} size={70} />
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

WorkFlow.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ),
};
