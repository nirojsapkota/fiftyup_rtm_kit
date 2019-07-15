import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '@rtm-ui/icon';
import { Header, Paragraph, Markdown } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';

const Title = styled(Paragraph)`
  max-width: '150px';
  padding-top: 16px;
  display: flex;
`;

const Container = styled(Box)`
  display: flex;
  padding-top: 16px;
`;

const Item = styled(Box)`
  display: flex;
  padding-top: 8px;
  margin-right: 16px;
  flex-direction: column;
`;

const MultiList = ({ header, subHeader, items }) => {
  return (
    <Box my={3}>
      <Header>{header}</Header>
      <Paragraph py={3}>{subHeader}</Paragraph>
      <Container>
        {items &&
          items.map((s, index) => (
            <Item key={index}>
              <Icon fill="iconPrimary" glyph={s.icon} size={60} />
              <Markdown py={3} raw={s.title} />
              <Title>{s.body}</Title>
            </Item>
          ))}
      </Container>
    </Box>
  );
};

export { MultiList };

MultiList.propTypes = {
  header: PropTypes.string.isRequired,
  subHeader: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
};
