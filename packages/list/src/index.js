import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import ListItem from './ListItem';
import { Markdown } from '@rtm-ui/typography';

const List = ({ header, subHeader, children }) => {
  return (
    <Box my={[3]}>
      {children &&
        children.map((item, index) => {
          return (
            <ListItem
              key={index}
              {...item}
              header={<Markdown raw={header} />}
              subHeader={<Markdown raw={subHeader} />}
            >
              {<div>{item.body}</div>}
            </ListItem>
          );
        })}
    </Box>
  );
};

export { List, ListItem };

List.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  children: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      body: PropTypes.any,
      fill: PropTypes.string,
    })
  ),
};
