import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';

const Div = styled(Box)`
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
  height: ${props => (props.hide ? 0 : 'auto')};
`;

const appendOrRemove = (array, item) => {
  return array.includes(item)
    ? array.filter(arrayItem => arrayItem !== item)
    : [...array, item];
};

const Accordion = props => {
  const [openItems, setOpenItems] = React.useState([]);

  const setIt = (openItems, id) => {
    const res = props.setOpenItems(openItems, id);
    setOpenItems(appendOrRemove(...res));
  };

  React.useEffect(
    function() {
      setIt(openItems, props.activeItem);
    },
    [props.activeItem]
  );

  const showHeader = itemId => {
    if (props.items[0].id === itemId) {
      return true;
    }

    return props.hideInactiveHeaders && openItems.includes(itemId);
  };

  return props.items.map(item => (
    <Box key={item.id} id={`form-container-${item.id}`}>
      {showHeader(item.id) &&
        props.itemHeader({
          item,
          onClick: () =>
            props.canControlExpansion &&
            setIt(appendOrRemove(openItems, item.id)),
        })}
      {openItems.includes(item.id) ? (
        <Div>{props.itemBody({ ...item, visible: true })}</Div>
      ) : (
        <Div hide>{props.itemBody({ ...item, visible: false })}</Div>
      )}
    </Box>
  ));
};

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.any,
    }).isRequired
  ),
  variant: PropTypes.string,
  renderItem: PropTypes.func,
};

Accordion.defaulProps = {
  setOpenItems: (openItemId, openingItemId) => [openItemId, openingItemId],
  canControlExpansion: true,
  initialOpenItems: [],
};
export default Accordion;
