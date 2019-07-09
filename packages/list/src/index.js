import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import ListItem from './ListItem';

const List = ({ header, renderItem, children }) => {
  return (
    <Box my={[1]}>
      {header}
      {children &&
        children.map((item, index) => {
          return (
            <ListItem key={index} {...item}>
              {renderItem ? renderItem(item.body) : <div>{item.body}</div>}
            </ListItem>
          );
        })}
    </Box>
  );
};

export { List, ListItem };

List.propTypes = {
  renderItem: PropTypes.func,
  header: PropTypes.any,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      body: PropTypes.any,
      fill: PropTypes.string,
    })
  ),
};
