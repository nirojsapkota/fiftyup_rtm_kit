import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import ListItem from './ListItem';

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const List = ({ renderItem, children }) => {
  return (
    <Box my={[1]}>
      <Wrapper>
        {children &&
          children.map((item, index) => {
            return (
              // FIXME: when children can be of any node
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={index} icon={item.icon} fill={item.fill}>
                {renderItem ? renderItem(item.body) : <div>{item.body}</div>}
              </ListItem>
            );
          })}
      </Wrapper>
    </Box>
  );
};

export { List, ListItem };

List.propTypes = {
  renderItem: PropTypes.func,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      body: PropTypes.any,
      fill: PropTypes.string,
    })
  ),
};
