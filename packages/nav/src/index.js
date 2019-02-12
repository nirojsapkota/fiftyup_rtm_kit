import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Pane } from '@rtm-ui/layout';
import Icon from '@rtm-ui/icon';
import Sheet from './sheet';

const A = styled.a`
  cursor: pointer;
  display: block;

  &:hover {
    background: ${props => props.showHover && '#eee'};
  }
`;

const Flex = styled(Pane)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = props => {
  return (
    <Flex p={20} elevation={1}>
      {props.desktop && <div />}
      <A onClick={props.onHomeClick}>
        <Icon glyph={props.logo} />
      </A>
      <A showHover data-testid="toggle-nav" onClick={props.onNavClick}>
        <Icon size={48} glyph="menu" />
      </A>
    </Flex>
  );
};

const Nav = props => {
  return (
    <Sheet items={props.items}>
      {({ toggle }) => (
        <Navbar
          logo={props.logo}
          onHomeClick={props.onHomeClick}
          onNavClick={toggle}
        />
      )}
    </Sheet>
  );
};

Nav.propTypes = {
  logo: PropTypes.string,
  onHomeClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
    })
  ),
};

Navbar.propTypes = {
  logo: PropTypes.string,
  desktop: PropTypes.bool,
  onHomeClick: PropTypes.func,
  onNavClick: PropTypes.func,
};

export { Sheet };
export default Nav;
