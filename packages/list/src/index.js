import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import ListItem from './ListItem';

const List = ({ header, subHeader, children }) => {
  return (
    <Box my={[3]}>
      {header}
      {subHeader}
      {children &&
        children.map((item, index) => {
          return (
            <ListItem key={index} {...item}>
              {<div>{item.body}</div>}
            </ListItem>
          );
        })}
    </Box>
  );
};

export { List, ListItem };

List.propTypes = {
  header: PropTypes.any,
  subHeader: PropTypes.any,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      body: PropTypes.any,
      fill: PropTypes.string,
    })
  ),
};
